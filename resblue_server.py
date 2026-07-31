"""Local launcher for RESblue.html.

Serves this folder on http://127.0.0.1:8765 and opens RESblue.html with the API
keys already in localStorage, read from ~/.resblue-keys.json (outside the repo,
so nothing secret is ever committed).

The seed page is served once per run behind a random one-time path, then 404s.
"""

import http.server
import json
import os
import secrets
import socket
import subprocess
import sys
import webbrowser

PORT = 8765
ROOT = os.path.dirname(os.path.abspath(__file__))
KEYS_FILE = os.path.join(os.path.expanduser("~"), ".resblue-keys.json")
PAGE = "/RESblue.html"

TEMPLATE = {
    "cdg_api_key": "",
    "dictation_openai_key": "",
    "dictation_gh_token": "",
    "dictation_gh_owner": "szfg2",
    "dictation_gh_repo": "patient-data",
    "dictation_gh_branch": "main",
    "resblue_gh_path": "resblue-patients.json",
}


def load_keys():
    if not os.path.exists(KEYS_FILE):
        with open(KEYS_FILE, "w", encoding="utf-8") as f:
            json.dump(TEMPLATE, f, indent=2)
        print("Created " + KEYS_FILE)
        print("Paste your keys into it, save, then run this again.")
        subprocess.Popen(["notepad.exe", KEYS_FILE])
        return None

    with open(KEYS_FILE, encoding="utf-8") as f:
        keys = json.load(f)

    if not keys.get("cdg_api_key") and not keys.get("dictation_gh_token"):
        print(KEYS_FILE + " has no keys in it yet.")
        subprocess.Popen(["notepad.exe", KEYS_FILE])
        return None

    return {k: v for k, v in keys.items() if v}


def seed_html(keys):
    sets = "\n".join(
        "  localStorage.setItem(%s, %s);" % (json.dumps(k), json.dumps(v))
        for k, v in keys.items()
    )
    return (
        "<!doctype html><meta charset=utf-8><title>Opening RESblue…</title>"
        "<body style='background:#191919;color:#ddd;font:14px system-ui;padding:2rem'>"
        "Loading keys…<script>\n" + sets + "\n"
        "  location.replace(" + json.dumps(PAGE) + ");\n"
        "</script></body>"
    )


def make_handler(keys, token):
    seed_path = "/__seed/" + token
    state = {"used": False}

    class Handler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *a, **kw):
            super().__init__(*a, directory=ROOT, **kw)

        def do_GET(self):
            if self.path.startswith("/__seed/"):
                if self.path != seed_path or state["used"]:
                    self.send_error(404)
                    return
                state["used"] = True
                body = seed_html(keys).encode("utf-8")
                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Content-Length", str(len(body)))
                self.send_header("Cache-Control", "no-store")
                self.end_headers()
                self.wfile.write(body)
                return
            super().do_GET()

        def log_message(self, fmt, *args):
            pass

    return Handler


def port_busy():
    with socket.socket() as s:
        return s.connect_ex(("127.0.0.1", PORT)) == 0


def main():
    if port_busy():
        print("Server already running — opening the page.")
        webbrowser.open("http://127.0.0.1:%d%s" % (PORT, PAGE))
        return

    keys = load_keys()
    if keys is None:
        input("\nPress Enter to close.")
        return 1

    token = secrets.token_urlsafe(16)
    httpd = http.server.ThreadingHTTPServer(
        ("127.0.0.1", PORT), make_handler(keys, token)
    )
    url = "http://127.0.0.1:%d/__seed/%s" % (PORT, token)
    print("Serving %s on http://127.0.0.1:%d" % (ROOT, PORT))
    print("Opening RESblue with %d saved settings." % len(keys))
    print("Keep this window open while you use the page. Ctrl+C or close it to stop.")
    webbrowser.open(url)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()


if __name__ == "__main__":
    sys.exit(main() or 0)
