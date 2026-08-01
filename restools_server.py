"""Local launcher for the respiratory tools.

Serves this folder on http://127.0.0.1:8765 and opens the requested page with
the API keys already in localStorage, read from ~/.resblue-keys.json (outside
the repo, so nothing secret is ever committed).

Every page is served from the same origin, so seeding once covers all of them -
including tools reached later by clicking through the RES.html hub.

The seed page is served once per run behind a random one-time path, then 404s.

    python restools_server.py [page.html]
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
DEFAULT_PAGE = "RES.html"

# Only settings worth keeping outside the browser live here. Anything a page
# already defaults sensibly (file paths, view preferences) is left to the page.
TEMPLATE = {
    "cdg_provider": "anthropic",
    "cdg_api_key": "",
    "cdg_deepseek_key": "",
    "dictation_openai_key": "",
    "dictation_gh_token": "",
    "dictation_gh_owner": "szfg2",
    "dictation_gh_repo": "patient-data",
    "dictation_gh_branch": "main",
}

SECRETS = ("cdg_api_key", "cdg_deepseek_key", "dictation_openai_key", "dictation_gh_token")


def resolve_page(arg):
    page = (arg or DEFAULT_PAGE).strip().lstrip("/")
    if not page.lower().endswith(".html") or "/" in page or "\\" in page:
        page = DEFAULT_PAGE
    if not os.path.exists(os.path.join(ROOT, page)):
        print("No such page: %s - opening %s instead." % (page, DEFAULT_PAGE))
        page = DEFAULT_PAGE
    return "/" + page


def create_keys_file():
    """Write the template if the keys file is missing. --create-only stops here
    so the menu's "Edit saved keys" option can just open the file."""
    if os.path.exists(KEYS_FILE):
        return
    with open(KEYS_FILE, "w", encoding="utf-8") as f:
        json.dump(TEMPLATE, f, indent=2)
    print("Created " + KEYS_FILE)


def load_keys():
    if not os.path.exists(KEYS_FILE):
        create_keys_file()
        print("Paste your keys into it, save, then run this again.")
        subprocess.Popen(["notepad.exe", KEYS_FILE])
        return None

    # utf-8-sig: the PowerShell launcher writes this file with a BOM
    with open(KEYS_FILE, encoding="utf-8-sig") as f:
        keys = json.load(f)

    if not any(keys.get(k) for k in SECRETS):
        print(KEYS_FILE + " has no keys in it yet.")
        subprocess.Popen(["notepad.exe", KEYS_FILE])
        return None

    keys = {k: v for k, v in keys.items() if v}
    # pft.html predates the shared key and still reads its own copy
    if keys.get("cdg_api_key"):
        keys.setdefault("anthropic_api_key", keys["cdg_api_key"])
    return keys


def seed_html(keys, page):
    sets = "\n".join(
        "  localStorage.setItem(%s, %s);" % (json.dumps(k), json.dumps(v))
        for k, v in keys.items()
    )
    return (
        "<!doctype html><meta charset=utf-8><title>Opening...</title>"
        "<body style='background:#191919;color:#ddd;font:14px system-ui;padding:2rem'>"
        "Loading keys...<script>\n" + sets + "\n"
        "  location.replace(" + json.dumps(page) + ");\n"
        "</script></body>"
    )


def make_handler(keys, token, page):
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
                body = seed_html(keys, page).encode("utf-8")
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
    arg = sys.argv[1] if len(sys.argv) > 1 else None
    if arg == "--create-only":
        create_keys_file()
        return

    page = resolve_page(arg)

    if port_busy():
        # Keys are already in localStorage for this origin from the first run.
        print("Server already running - opening the page.")
        webbrowser.open("http://127.0.0.1:%d%s" % (PORT, page))
        return

    keys = load_keys()
    if keys is None:
        input("\nPress Enter to close.")
        return 1

    token = secrets.token_urlsafe(16)
    httpd = http.server.ThreadingHTTPServer(
        ("127.0.0.1", PORT), make_handler(keys, token, page)
    )
    url = "http://127.0.0.1:%d/__seed/%s" % (PORT, token)
    print("Serving %s on http://127.0.0.1:%d" % (ROOT, PORT))
    print("Opening %s with %d saved settings." % (page.lstrip("/"), len(keys)))
    print("Keep this window open while you use the page. Ctrl+C or close it to stop.")
    webbrowser.open(url)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()


if __name__ == "__main__":
    sys.exit(main() or 0)
