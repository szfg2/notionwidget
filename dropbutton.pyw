"""Floating Drop button for Windows.

Hover the round button at the screen edge to open a small panel, then paste or type
and it's saved to the same place drop.html reads (szfg2/patient-data/drop).
The Chat tab talks to Claude Code running in the vault, optionally with a screenshot.
The GitHub token comes from DROP_GH_TOKEN or, failing that, `gh auth token`.
Drag the panel by its header to move it; right-click for the menu.
"""
import base64
import ctypes
import html
import io
import json
import os
import queue
import random
import re
import shutil
import subprocess
import tempfile
import threading
import time
import urllib.error
import urllib.parse
import urllib.request
import webbrowser
import tkinter as tk
from calendar import monthrange
from ctypes import wintypes
from datetime import date, timedelta
from html.parser import HTMLParser

from PIL import Image, ImageDraw, ImageGrab, ImageTk

OWNER, REPO, BRANCH, DIR = "szfg2", "patient-data", "main", "drop"
INDEX = DIR + "/index.json"
PAGE_URL = "https://szfg2.github.io/notionwidget/drop.html"
VAULT_HOME = "https://pages.szfg2.tech/"
VIEW_URL = VAULT_HOME + "view/"  # the vault webpage's in-browser note viewer
VAULT = os.path.expanduser(r"~\Vault")
TODOS = os.path.join(VAULT, "To-Dos.md")
CONFIG = os.path.join(os.environ.get("APPDATA") or os.path.expanduser("~"), "dropbutton.json")
IMG_EXT = re.compile(r"\.(png|jpe?g|gif|webp|bmp|tiff?)$", re.I)

KEY = "#010101"  # painted transparent, so the button looks round
SURFACE, SURFACE2 = "#1f201f", "#252625"
BORDER, BORDER_STRONG = "#343633", "#464944"
TEXT, MUTED, FAINT = "#eeece8", "#9a9892", "#73716c"
ACCENT, ACCENT_STRONG, DANGER = "#65c1a7", "#81d4bd", "#e68a82"
FONT = ("Segoe UI", 10)


# ---------- GitHub ----------

class GitHubError(Exception):
    def __init__(self, status, message):
        super().__init__(message)
        self.status = status


_token = None


def token():
    global _token
    if not _token:
        _token = os.environ.get("DROP_GH_TOKEN") or subprocess.run(
            ["gh", "auth", "token"], capture_output=True, text=True,
            creationflags=subprocess.CREATE_NO_WINDOW).stdout.strip()
    if not _token:
        raise RuntimeError("No GitHub token — run 'gh auth login'")
    return _token


def gh(path, method="GET", body=None, raw=False):
    url = f"https://api.github.com/repos/{OWNER}/{REPO}/contents/{urllib.parse.quote(path)}"
    headers = {
        "Accept": "application/vnd.github.raw+json" if raw else "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "Authorization": "Bearer " + token(),
        "User-Agent": "dropbutton",
    }
    data = None
    if body is not None:
        data = json.dumps(dict(body, branch=BRANCH)).encode()
        headers["Content-Type"] = "application/json"
    else:
        url += "?ref=" + BRANCH
    req = urllib.request.Request(url, data=data, method=method, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=60) as res:
            return res.read()
    except urllib.error.HTTPError as e:
        try:
            message = json.loads(e.read()).get("message") or f"HTTP {e.code}"
        except ValueError:
            message = f"HTTP {e.code}"
        raise GitHubError(e.code, message) from None


def b64(data):
    return base64.b64encode(data).decode()


def read_index():
    try:
        meta = json.loads(gh(INDEX))
    except GitHubError as e:
        if e.status == 404:
            return [], None
        raise
    # Files over 1 MB come back without content, so fetch those raw.
    if meta.get("encoding") == "base64" and meta.get("content"):
        raw = base64.b64decode(meta["content"]).decode()
    else:
        raw = gh(INDEX, raw=True).decode()
    try:
        items = json.loads(raw).get("items", [])
    except ValueError:
        items = []
    return items, meta["sha"]


def add_item(item):
    # Re-reads before writing so a save from another device at the same moment isn't overwritten.
    for attempt in range(4):
        items, sha = read_index()
        items = [item] + [x for x in items if x.get("id") != item["id"]]
        content = json.dumps({"v": 1, "items": items}, indent=1, ensure_ascii=False).encode()
        body = {"message": "Drop: add item", "content": b64(content)}
        if sha:
            body["sha"] = sha
        try:
            gh(INDEX, "PUT", body)
            return items
        except GitHubError as e:
            if e.status in (409, 422) and attempt < 3:
                continue
            raise


# ---------- saving ----------

def new_id():
    return time.strftime("%Y%m%d-%H%M%S") + "-" + "".join(random.choices("abcdefghijklmnopqrstuvwxyz0123456789", k=4))


def encode_image(img):
    """Small screenshots stay as crisp PNGs; big ones are shrunk to WebP, as drop.html does."""
    png = io.BytesIO()
    (img if img.mode in ("RGB", "RGBA", "L", "LA", "P") else img.convert("RGBA")).save(png, "PNG")
    scale = min(1, 2400 / max(img.size))
    if scale == 1 and png.tell() <= 400 * 1024:
        return png.getvalue(), "png"
    rgba = img.convert("RGBA")
    flat = Image.new("RGB", img.size, "white")
    flat.paste(rgba, mask=rgba.getchannel("A"))
    if scale < 1:
        flat = flat.resize((round(img.width * scale), round(img.height * scale)), Image.LANCZOS)
    webp = io.BytesIO()
    flat.save(webp, "WEBP", quality=90)
    return (webp.getvalue(), "webp") if webp.tell() < png.tell() else (png.getvalue(), "png")


def save(text, images, device):
    item_id = new_id()
    names = []
    for i, img in enumerate(images, 1):
        data, ext = encode_image(img)
        name = f"{item_id}-{i}.{ext}"
        gh(f"{DIR}/{name}", "PUT", {"message": "Drop: add " + name, "content": b64(data)})
        names.append(name)
    parts = []
    if text.strip():
        parts.append('<div style="white-space: pre-wrap;">' + html.escape(text.strip("\n")) + "</div>")
    parts += [f'<img data-drop="{n}">' for n in names]
    return add_item({
        "id": item_id, "ts": int(time.time() * 1000), "from": device, "html": "".join(parts),
        "text": " ".join(text.split())[:300], "images": names,
    })


# ---------- copying back out ----------

class _PlainText(HTMLParser):
    BLOCK = {"div", "p", "li", "tr", "table", "blockquote", "pre", "h1", "h2", "h3", "h4", "h5", "h6"}

    def __init__(self):
        super().__init__()
        self.out = []

    def newline(self):
        if self.out and not self.out[-1].endswith("\n"):
            self.out.append("\n")

    def handle_starttag(self, tag, attrs):
        if tag == "br":
            self.out.append("\n")
        elif tag in self.BLOCK:
            self.newline()
        elif tag in ("td", "th") and self.out and not self.out[-1].endswith("\n"):
            self.out.append("\t")

    def handle_endtag(self, tag):
        if tag in self.BLOCK:
            self.newline()

    def handle_data(self, data):
        self.out.append(data)


def html_to_text(markup):
    p = _PlainText()
    p.feed(markup)
    p.close()
    return re.sub(r"\n{3,}", "\n\n", "".join(p.out)).strip()


def fetch_image(name):
    return Image.open(io.BytesIO(gh(f"{DIR}/{name}", raw=True)))


def set_clipboard(formats):
    """Puts (format, bytes) pairs on the Windows clipboard; Tk can only do text, so this talks to Windows directly."""
    k32, u32 = ctypes.windll.kernel32, ctypes.windll.user32
    k32.GlobalAlloc.restype = k32.GlobalLock.restype = ctypes.c_void_p
    k32.GlobalAlloc.argtypes = (ctypes.c_uint, ctypes.c_size_t)
    k32.GlobalLock.argtypes = k32.GlobalUnlock.argtypes = (ctypes.c_void_p,)
    u32.SetClipboardData.argtypes = (ctypes.c_uint, ctypes.c_void_p)
    for _ in range(10):
        if u32.OpenClipboard(None):
            break
        time.sleep(0.05)
    else:
        raise RuntimeError("Clipboard is busy")
    try:
        u32.EmptyClipboard()
        for fmt, data in formats:
            handle = k32.GlobalAlloc(0x0002, len(data))
            ctypes.memmove(k32.GlobalLock(handle), data, len(data))
            k32.GlobalUnlock(handle)
            u32.SetClipboardData(fmt, handle)
    finally:
        u32.CloseClipboard()


def clipboard_formats(text=None, img=None):
    if text is not None:
        return [(13, (text + "\0").encode("utf-16-le"))]  # CF_UNICODETEXT
    png, bmp = io.BytesIO(), io.BytesIO()
    img.save(png, "PNG")
    img.convert("RGB").save(bmp, "BMP")
    return [(ctypes.windll.user32.RegisterClipboardFormatW("PNG"), png.getvalue()),
            (8, bmp.getvalue()[14:])]  # CF_DIB is a BMP without its 14-byte file header


def when(ts):
    t = time.localtime(ts / 1000)
    if time.strftime("%Y%m%d", t) == time.strftime("%Y%m%d"):
        return time.strftime("%H:%M", t)
    return time.strftime("%a %d %b", t).replace(" 0", " ")


def read_clipboard(root):
    grab = None
    try:
        grab = ImageGrab.grabclipboard()
    except OSError:
        pass
    try:
        text = root.clipboard_get()
    except tk.TclError:
        text = ""
    images = []
    if isinstance(grab, list):  # files copied in Explorer
        for path in grab:
            if IMG_EXT.search(path):
                try:
                    img = Image.open(path)
                    img.load()
                    images.append(img)
                except OSError:
                    pass
        if all(not l.strip() or IMG_EXT.search(l.strip()) for l in text.splitlines()):
            text = ""
    elif isinstance(grab, Image.Image) and not text.strip():
        # Excel also puts a picture of the cells on the clipboard; only keep the picture when there's no text.
        images.append(grab)
    return text, images


def open_vault():
    webbrowser.open(VAULT_HOME)


# ---------- chat ----------
# Runs Claude Code inside the vault, so it has the vault, both CLAUDE.md files, skills and connectors.

CLAUDE = shutil.which("claude") or os.path.expanduser(r"~\.local\bin\claude.exe")
CHAT_PROMPT = ("You are replying in a small floating chat panel on Samuel's Windows desktop (the Drop button). "
               "Keep answers short and in plain text: no tables or headings, minimal markdown. "
               "When a screenshot is attached it shows Samuel's current screen.")
# Vault edits are allowed by --permission-mode acceptEdits; connectors are read-only; shell commands are refused.
CHAT_TOOLS = ",".join([
    "WebSearch", "WebFetch",
    "mcp__claude_ai_Google_Calendar__list_events", "mcp__claude_ai_Google_Calendar__search_events",
    "mcp__claude_ai_Google_Calendar__get_event", "mcp__claude_ai_Gmail__search_threads",
    "mcp__claude_ai_Gmail__get_thread", "mcp__claude_ai_Gmail__get_message",
    "mcp__claude_ai_Google_Drive__search_files", "mcp__claude_ai_Google_Drive__read_file_content",
])


class MONITORINFO(ctypes.Structure):
    _fields_ = [("cbSize", wintypes.DWORD), ("rcMonitor", wintypes.RECT),
                ("rcWork", wintypes.RECT), ("dwFlags", wintypes.DWORD)]


def monitor_rect(x, y):
    u32 = ctypes.windll.user32
    u32.MonitorFromPoint.restype = ctypes.c_void_p
    u32.MonitorFromPoint.argtypes = (wintypes.POINT, wintypes.DWORD)
    u32.GetMonitorInfoW.argtypes = (ctypes.c_void_p, ctypes.c_void_p)
    info = MONITORINFO()
    info.cbSize = ctypes.sizeof(info)
    u32.GetMonitorInfoW(u32.MonitorFromPoint(wintypes.POINT(x, y), 2), ctypes.byref(info))
    r = info.rcMonitor
    return r.left, r.top, r.right, r.bottom


def keep_on_top(widget):
    # Tk's -topmost is set once; Windows drops it after Explorer restarts, full-screen apps, or other
    # topmost windows appear. Re-pin without activating, moving or resizing.
    u32 = ctypes.windll.user32
    u32.GetAncestor.restype = wintypes.HWND
    u32.SetWindowPos.argtypes = (wintypes.HWND, wintypes.HWND, ctypes.c_int, ctypes.c_int,
                                 ctypes.c_int, ctypes.c_int, wintypes.UINT)
    hwnd = u32.GetAncestor(wintypes.HWND(widget.winfo_id()), 2)  # GA_ROOT: the real top-level window
    u32.SetWindowPos(hwnd, wintypes.HWND(-1), 0, 0, 0, 0, 0x0001 | 0x0002 | 0x0010)  # TOPMOST; NOSIZE|NOMOVE|NOACTIVATE


def grab_screen(rect):
    # The all-screens grab starts at the virtual desktop's top-left, which is negative if a monitor sits left of the main one.
    u32 = ctypes.windll.user32
    vx, vy = u32.GetSystemMetrics(76), u32.GetSystemMetrics(77)
    left, top, right, bottom = rect
    return ImageGrab.grab(all_screens=True).crop((left - vx, top - vy, right - vx, bottom - vy))


def image_block(img):
    img = img.convert("RGB")
    img.thumbnail((1568, 1568), Image.LANCZOS)  # Claude's preferred maximum; larger just costs more
    buf, media = io.BytesIO(), "image/png"
    img.save(buf, "PNG")
    if buf.tell() > 3_500_000:
        buf, media = io.BytesIO(), "image/jpeg"
        img.save(buf, "JPEG", quality=85)
    return {"type": "image", "source": {"type": "base64", "media_type": media, "data": b64(buf.getvalue())}}


def describe_tool(name, args):
    target = str(args.get("file_path") or args.get("path") or args.get("pattern") or args.get("query")
                 or args.get("url") or args.get("q") or "")
    if not target.startswith("http"):
        target = os.path.basename(target.rstrip("\\/")) or target
    label = name.split("__")[-1].replace("_", " ")
    return (label + " " + target).strip()[:60]


# ---------- to-dos ----------
# Reads To-Dos.md straight from the vault: open "- [ ]" tasks, the sections it embeds from other
# notes (![[Note#Section]]), and recurring tasks that are due (same rules as the note's dataviewjs).

TASK = re.compile(r"^[>\s]*[-*] \[ \] (.*)$")
DUE = re.compile(r"📅\s*(\d{4}-\d{2}-\d{2})")
EMBED = re.compile(r"^!\[\[([^#\]|]+)#([^\]|]+)\]\]$")
HEADING = re.compile(r"^(#{1,6})\s+(.*)$")
RECUR_START, RECUR_END = "<!-- RECURRING-TASKS", "RECURRING-TASKS-END -->"


def plain(text):
    text = re.sub(r"\(from:[^)]*\)|\(\[email\]\([^)]*\)\)", "", text)
    text = re.sub(r"[📅✅⏳🛫➕]\s*\d{4}-\d{2}-\d{2}", "", text)
    text = re.sub(r"\[\[([^\]|]+)\|([^\]]+)\]\]", r"\2", text)
    text = re.sub(r"\[\[([^\]]+)\]\]", r"\1", text)
    text = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", text)
    text = re.sub(r"\*\*|`", "", text)
    text = "".join(c for c in text if ord(c) <= 0xFFFF)  # Tk can't draw most emoji
    return re.sub(r"\s+", " ", text).strip()


def read_lines(path):
    with open(path, encoding="utf-8", newline="") as f:
        return [line.rstrip("\r") for line in f.read().split("\n")]


def rewrite_line(path, index, expected, new):
    """Changes one line, but only if it still reads as expected, so a stale view never edits the wrong line."""
    with open(path, encoding="utf-8", newline="") as f:
        lines = f.read().split("\n")
    if index >= len(lines) or lines[index].rstrip("\r") != expected:
        matches = [i for i, line in enumerate(lines) if line.rstrip("\r") == expected]
        if len(matches) != 1:
            raise RuntimeError("the note has changed, so refresh and try again")
        index = matches[0]
    lines[index] = new + ("\r" if lines[index].endswith("\r") else "")
    with open(path, "w", encoding="utf-8", newline="") as f:
        f.write("\n".join(lines))
    return index


def find_note(name):
    path = os.path.join(VAULT, name + ".md")
    if os.path.exists(path):
        return path
    for folder, dirs, files in os.walk(VAULT):
        dirs[:] = [d for d in dirs if not d.startswith(".")]
        if name + ".md" in files:
            return os.path.join(folder, name + ".md")
    return None


def task(group, text, path, index, line, note):
    due = DUE.search(text)
    return {"kind": "task", "group": group, "text": plain(text), "note": note, "path": path, "index": index,
            "line": line, "due": date.fromisoformat(due.group(1)) if due else None}


def embedded_tasks(note, section, group):
    path = find_note(note)
    if not path:
        return []
    lines, out, level = read_lines(path), [], None
    for i, line in enumerate(lines):
        h = HEADING.match(line)
        if h and level is None and plain(h.group(2)) == plain(section):
            level = len(h.group(1))
        elif h and level is not None and len(h.group(1)) <= level:
            break
        elif level is not None:
            m = TASK.match(line)
            if m:
                out.append(task(group, m.group(1), path, i, line, note))
    return out


def cycle_start(sched, today):
    """The most recent date a recurring task became due: weekly-N is ISO weekday N, monthly-N is day N."""
    kind, _, n = sched.partition("-")
    n = int(n)
    if kind == "weekly":
        return today - timedelta(days=(today.isoweekday() - n) % 7)
    here = today.replace(day=min(n, monthrange(today.year, today.month)[1]))
    if here <= today:
        return here
    prev = today.replace(day=1) - timedelta(days=1)
    return prev.replace(day=min(n, monthrange(prev.year, prev.month)[1]))


def recurring_due(lines, today):
    out, inside = [], False
    for i, line in enumerate(lines):
        if line.strip() == RECUR_START:
            inside = True
        elif line.strip() == RECUR_END:
            break
        elif inside:
            parts = line.split("|")
            if len(parts) < 4:
                continue
            hist = [d.strip() for d in parts[3].split(",") if d.strip()]
            try:
                if hist and date.fromisoformat(hist[0]) >= cycle_start(parts[2].strip(), today):
                    continue
            except ValueError:
                continue
            out.append({"kind": "recur", "group": "Recurring · due", "text": plain(re.sub(r"\s—.*$", "", parts[1])),
                        "last": hist[0] if hist else "", "hist": hist, "parts": [p.strip() for p in parts[:3]],
                        "note": "To-Dos", "path": TODOS, "index": i, "line": line})
    return out


def collect_todos(today):
    lines, out, group, code = read_lines(TODOS), [], "", False
    for i, line in enumerate(lines):
        if line.lstrip("> ").startswith("```"):
            code = not code
        elif not code:
            h, m, e = HEADING.match(line), TASK.match(line), EMBED.match(line.strip())
            if h:
                group = plain(h.group(2))
            elif m:
                out.append(task(group, m.group(1), TODOS, i, line, "To-Dos"))
            elif e:
                out += embedded_tasks(e.group(1).strip(), e.group(2).strip(), group)
    return out + recurring_due(lines, today)


# ---------- config ----------

def load_cfg():
    try:
        with open(CONFIG, encoding="utf-8") as f:
            return json.load(f)
    except (OSError, ValueError):
        return {}


def save_cfg(cfg):
    try:
        with open(CONFIG, "w", encoding="utf-8") as f:
            json.dump(cfg, f)
    except OSError:
        pass


# ---------- window ----------

class DropButton:
    def __init__(self):
        self.cfg = load_cfg()
        self.device = self.cfg.get("device", "Windows")
        self.root = r = tk.Tk()
        r.withdraw()
        r.overrideredirect(True)
        r.attributes("-topmost", True)
        r.attributes("-transparentcolor", KEY)
        r.configure(bg=KEY)

        self.dpi = r.winfo_fpixels("1i") / 96
        self.size = round(44 * self.dpi)
        sw, sh = r.winfo_screenwidth(), r.winfo_screenheight()
        self.bx = self.cfg.get("x", sw - self.size - round(12 * self.dpi))
        self.by = self.cfg.get("y", sh // 2)
        self.clamp()

        self.expanded = False
        self.busy = False
        self.dragging = None
        self.wait_for_leave = False
        self.inside_since = None
        self.outside_since = None
        self.pinned_at = 0
        self.pending = []
        self.items = []
        self.loading = False
        self.last_fetch = 0
        self.results = queue.Queue()  # callbacks from worker threads, run on the UI thread
        self.images = {}
        self.tab = self.cfg.get("tab", "drop")
        self.session = None
        self.chat_proc = None
        self.stopped = False
        self.reply = ""
        self.unread = False
        self.shot = False
        self.thumbs = []
        self.todos = []
        self.undo = None

        self.btn = tk.Canvas(r, width=self.size, height=self.size, bg=KEY, highlightthickness=0, bd=0)
        self.btn_img = self.btn.create_image(0, 0, anchor="nw")
        self.draw_button()

        self.build_panel()
        self.menu = tk.Menu(r, tearoff=0)
        self.menu.add_command(label="Open Vault home", command=open_vault)
        self.menu.add_command(label="Open Drop page", command=lambda: webbrowser.open(PAGE_URL))
        self.menu.add_command(label="Quit", command=self.quit)
        for w in (self.btn, self.head, *self.tabs.values()):
            w.bind("<Button-3>", lambda e: self.menu.tk_popup(e.x_root, e.y_root))

        self.collapse()
        r.deiconify()
        self.poll()

    def quit(self):
        self.stop_chat()
        self.root.destroy()

    def build_panel(self):
        p = self.panel = tk.Frame(self.root, bg=SURFACE, highlightthickness=1, highlightbackground=BORDER_STRONG)

        self.head = head = tk.Frame(p, bg=SURFACE, cursor="fleur")
        head.pack(fill="x", padx=10, pady=(8, 6))
        self.tabs = {}
        for name, label in (("drop", "Drop"), ("chat", "Chat"), ("todos", "To-Dos")):
            t = self.tabs[name] = tk.Label(head, text=label, bg=SURFACE, font=("Segoe UI Semibold", 10), cursor="hand2")
            t.tab = name
            t.pack(side="left", padx=(0, 10))
        self.status = tk.Label(head, text="", bg=SURFACE, fg=MUTED, font=("Segoe UI", 9))
        self.status.pack(side="left")
        close = tk.Label(head, text="✕", bg=SURFACE, fg=MUTED, font=FONT, cursor="hand2")
        close.pack(side="right")
        close.bind("<Button-1>", lambda e: self.collapse(manual=True))
        link = tk.Label(head, text="↗", bg=SURFACE, fg=MUTED, font=FONT, cursor="hand2")
        link.pack(side="right", padx=(0, 10))
        link.bind("<Button-1>", lambda e: webbrowser.open(PAGE_URL))
        vault = tk.Label(head, text="⌂ Vault", bg=SURFACE, fg=ACCENT_STRONG, font=("Segoe UI Semibold", 9), cursor="hand2")
        vault.pack(side="right", padx=(0, 10))
        vault.bind("<Button-1>", lambda e: open_vault())
        for w in (head, *self.tabs.values()):
            w.bind("<ButtonPress-1>", self.drag_start)
            w.bind("<B1-Motion>", self.drag_move)
            w.bind("<ButtonRelease-1>", self.drag_end)

        v = self.drop_view = tk.Frame(p, bg=SURFACE)
        self.text = self.input(v, height=6)
        self.text.pack(fill="both", expand=True, padx=10)
        self.text.bind("<<Paste>>", self.on_paste)
        self.text.bind("<Control-Return>", lambda e: (self.save_draft(), "break")[1])

        bar = tk.Frame(v, bg=SURFACE)
        bar.pack(fill="x", padx=10, pady=(6, 10))
        tk.Label(bar, text="Ctrl+V saves · Ctrl+Enter saves typing", bg=SURFACE, fg=FAINT,
                 font=("Segoe UI", 8)).pack(side="left")
        self.save_btn = self.button(bar, "Save", self.save_draft, primary=True)
        self.save_btn.pack(side="right")
        self.clip_btn = self.button(bar, "Save clipboard", self.save_clipboard)
        self.clip_btn.pack(side="right", padx=(0, 6))

        tk.Frame(v, bg=BORDER, height=1).pack(fill="x")
        tk.Label(v, text="RECENT", bg=SURFACE, fg=FAINT, font=("Segoe UI Semibold", 8),
                 anchor="w").pack(fill="x", padx=12, pady=(8, 2))
        self.list = tk.Frame(v, bg=SURFACE)
        self.list.pack(fill="x", padx=4, pady=(0, 6))

        self.build_chat(p)
        self.build_todos(p)
        self.views = {"drop": self.drop_view, "chat": self.chat_view, "todos": self.todo_view}
        self.show_tab(self.tab if self.tab in self.views else "drop", focus=False)

    def build_chat(self, p):
        v = self.chat_view = tk.Frame(p, bg=SURFACE)
        top = tk.Frame(v, bg=SURFACE)
        top.pack(fill="x", padx=10)
        self.link(top, "New chat", self.new_chat).pack(side="left")
        self.link(top, "Copy last reply", self.copy_reply).pack(side="right")

        self.log = tk.Text(v, width=46, height=16, wrap="word", bg=SURFACE, fg=TEXT, relief="flat", font=FONT,
                           padx=2, pady=4, highlightthickness=0, cursor="arrow", spacing3=2)
        self.log.pack(fill="both", expand=True, padx=10, pady=(4, 6))
        self.log.tag_configure("you", foreground=ACCENT_STRONG, font=("Segoe UI Semibold", 9))
        self.log.tag_configure("claude", foreground=MUTED, font=("Segoe UI Semibold", 9))
        self.log.tag_configure("tool", foreground=FAINT, font=("Segoe UI", 8))
        self.log.tag_configure("hint", foreground=FAINT, font=("Segoe UI", 9))
        self.log.tag_configure("err", foreground=DANGER)
        self.readonly(self.log)
        self.chat_hint()

        self.ask = self.input(v, height=3)
        self.ask.pack(fill="x", padx=10)
        self.ask.bind("<Return>", lambda e: (None if self.chat_proc else self.send(), "break")[1])
        self.ask.bind("<Shift-Return>", lambda e: (self.ask.insert("insert", "\n"), "break")[1])

        bar = tk.Frame(v, bg=SURFACE)
        bar.pack(fill="x", padx=10, pady=(6, 10))
        self.shot_toggle = tk.Label(bar, bg=SURFACE, font=("Segoe UI", 9), cursor="hand2")
        self.shot_toggle.pack(side="left")
        self.shot_toggle.bind("<Button-1>", lambda e: self.set_shot(not self.shot))
        self.set_shot(False)
        self.send_btn = self.button(bar, "Send", lambda: self.stop_chat() if self.chat_proc else self.send(), primary=True)
        self.send_btn.pack(side="right")

    def build_todos(self, p):
        v = self.todo_view = tk.Frame(p, bg=SURFACE)
        top = tk.Frame(v, bg=SURFACE)
        top.pack(fill="x", padx=10)
        self.todo_summary = tk.Label(top, text="", bg=SURFACE, fg=MUTED, font=("Segoe UI", 8))
        self.todo_summary.pack(side="left")
        self.link(top, "Open note", lambda: webbrowser.open(VIEW_URL + "To-Dos")).pack(side="right")
        self.link(top, "Refresh", self.load_todos).pack(side="right", padx=(0, 10))

        t = self.todo_list = tk.Text(v, width=46, height=22, wrap="word", bg=SURFACE, fg=TEXT, relief="flat",
                                     font=("Segoe UI", 9), padx=2, pady=4, highlightthickness=0, cursor="arrow",
                                     spacing3=4)
        t.pack(fill="both", expand=True, padx=10, pady=(4, 10))
        t.tag_configure("group", foreground=FAINT, font=("Segoe UI Semibold", 8), spacing1=8)
        t.tag_configure("row", lmargin2=22)  # wrapped lines line up with the text, not the box
        t.tag_configure("box", foreground=ACCENT_STRONG, font=("Segoe UI", 11))
        t.tag_configure("meta", foreground=FAINT, font=("Segoe UI", 8))
        t.tag_configure("soon", foreground="#e0b25a", font=("Segoe UI Semibold", 8))
        t.tag_configure("late", foreground=DANGER, font=("Segoe UI Semibold", 8))
        t.tag_configure("action", foreground=ACCENT_STRONG, font=("Segoe UI Semibold", 8))
        self.readonly(t)
        self.status.bind("<Button-1>", lambda e: self.undo_todo())

    def input(self, parent, height):
        box = tk.Text(parent, width=46, height=height, wrap="word", bg=SURFACE2, fg=TEXT, insertbackground=TEXT,
                      relief="flat", font=FONT, padx=8, pady=6, undo=True,
                      highlightthickness=1, highlightbackground=BORDER, highlightcolor=ACCENT)
        box.bind("<Escape>", lambda e: self.collapse(manual=True))
        box.bind("<Button-1>", lambda e: self.root.focus_force())
        return box

    def readonly(self, box):
        box.bind("<Key>", lambda e: None if e.state & 4 else "break")  # read-only, but Ctrl+C still copies
        for ev in ("<<Paste>>", "<<Cut>>", "<<Undo>>", "<<Redo>>"):
            box.bind(ev, lambda e: "break")

    def link(self, parent, label, command):
        w = tk.Label(parent, text=label, bg=SURFACE, fg=ACCENT_STRONG, font=("Segoe UI Semibold", 8), cursor="hand2")
        w.bind("<Button-1>", lambda e: command())
        return w

    def show_tab(self, name, focus=True):
        self.tab = name
        for n, t in self.tabs.items():
            t.configure(fg=TEXT if n == name else FAINT)
        for n, view in self.views.items():
            if n != name:
                view.pack_forget()
        self.views[name].pack(fill="both", expand=True)
        if name == "chat":
            self.unread = False
            if focus:
                self.root.focus_force()
                self.ask.focus_set()
        elif name == "todos" and self.expanded:
            self.load_todos()
        self.cfg["tab"] = name
        save_cfg(self.cfg)
        self.fit()

    def button(self, parent, label, command, primary=False):
        bg, fg, hover = (ACCENT, "#10201b", ACCENT_STRONG) if primary else (SURFACE2, TEXT, BORDER_STRONG)
        return tk.Button(parent, text=label, command=command, bg=bg, fg=fg, activebackground=hover,
                         activeforeground=fg, relief="flat", bd=0, padx=10, pady=4, cursor="hand2",
                         font=("Segoe UI Semibold", 9))

    # ----- drawing -----

    def draw_button(self, color=ACCENT):
        # Red dot: unsaved note. White dot: a chat reply arrived while the panel was closed.
        dot = DANGER if hasattr(self, "text") and not self.draft_empty() else TEXT if self.unread else None
        key = (color, dot)
        if key not in self.images:
            s, k = self.size, 4
            big = Image.new("RGB", (s * k, s * k), KEY)
            d = ImageDraw.Draw(big)
            d.ellipse((2 * k, 2 * k, (s - 2) * k, (s - 2) * k), fill=color)
            c, arm, w = s * k // 2, s * k * 0.2, max(2, round(s * k * 0.07))
            d.line((c - arm, c, c + arm, c), fill="#10201b", width=w)
            d.line((c, c - arm, c, c + arm), fill="#10201b", width=w)
            if dot:
                rr = s * k * 0.12
                d.ellipse((s * k - 2 * rr - 2 * k, 2 * k, s * k - 2 * k, 2 * rr + 2 * k), fill=dot)
            self.images[key] = ImageTk.PhotoImage(big.resize((s, s), Image.LANCZOS))
        self.btn.itemconfigure(self.btn_img, image=self.images[key])

    # ----- geometry -----

    def clamp(self):
        sw, sh = self.root.winfo_screenwidth(), self.root.winfo_screenheight()
        self.bx = max(0, min(self.bx, sw - self.size))
        self.by = max(0, min(self.by, sh - self.size))

    def panel_origin(self, pw, ph):
        # The panel grows away from the nearest screen edge so it's never cut off.
        sw, sh = self.root.winfo_screenwidth(), self.root.winfo_screenheight()
        x = self.bx + self.size - pw if self.bx + self.size / 2 > sw / 2 else self.bx
        y = self.by + self.size - ph if self.by + self.size / 2 > sh / 2 else self.by
        return max(0, min(x, sw - pw)), max(0, min(y, sh - ph))

    def expand(self):
        self.expanded = True
        self.btn.pack_forget()
        self.panel.pack(fill="both", expand=True)
        if self.unread:
            self.tab = "chat"
        self.show_tab(self.tab, focus=False)
        self.render_list()
        self.show_pending()
        if time.monotonic() - self.last_fetch > 10:
            self.refresh()

    def fit(self):
        if not self.expanded or self.dragging:
            return
        self.root.update_idletasks()
        pw, ph = self.panel.winfo_reqwidth(), self.panel.winfo_reqheight()
        x, y = self.panel_origin(pw, ph)
        self.root.geometry(f"{pw}x{ph}+{x}+{y}")

    def collapse(self, manual=False):
        if self.busy:
            return
        self.expanded = False
        self.wait_for_leave = manual
        self.outside_since = None
        self.panel.pack_forget()
        self.btn.pack()
        self.draw_button()
        self.root.geometry(f"{self.size}x{self.size}+{self.bx}+{self.by}")

    # A press on the header that doesn't move is a click (which switches tab); one that moves drags the panel.
    def drag_start(self, e):
        self.dragging = (e.x_root - self.root.winfo_x(), e.y_root - self.root.winfo_y())
        self.drag_from = (e.x_root, e.y_root)
        self.moved = False

    def drag_move(self, e):
        if not self.dragging:
            return
        if abs(e.x_root - self.drag_from[0]) + abs(e.y_root - self.drag_from[1]) > 4:
            self.moved = True
        if self.moved:
            self.root.geometry(f"+{e.x_root - self.dragging[0]}+{e.y_root - self.dragging[1]}")

    def drag_end(self, e):
        if not self.dragging:
            return
        self.dragging = None
        if not self.moved:
            if getattr(e.widget, "tab", None):
                self.show_tab(e.widget.tab)
            return
        sw, sh = self.root.winfo_screenwidth(), self.root.winfo_screenheight()
        x, y, w, h = self.root.winfo_x(), self.root.winfo_y(), self.root.winfo_width(), self.root.winfo_height()
        self.bx = x + w - self.size if x + w / 2 > sw / 2 else x
        self.by = y + h - self.size if y + h / 2 > sh / 2 else y
        self.clamp()
        self.cfg.update(x=self.bx, y=self.by)
        save_cfg(self.cfg)

    # ----- hover -----

    def pointer_inside(self):
        px, py = self.root.winfo_pointerxy()
        x, y = self.root.winfo_rootx(), self.root.winfo_rooty()
        return x <= px < x + self.root.winfo_width() and y <= py < y + self.root.winfo_height()

    def poll(self):
        while not self.results.empty():
            self.results.get()()
        inside, now = self.pointer_inside(), time.monotonic()
        if now - self.pinned_at > 1:
            self.pinned_at = now
            keep_on_top(self.root)
        if not self.expanded:
            if not inside:
                self.wait_for_leave = False
                self.inside_since = None
            elif not self.wait_for_leave:
                self.inside_since = self.inside_since or now
                if now - self.inside_since > 0.15:
                    self.expand()
        elif (inside or self.dragging or self.busy or self.chat_proc or not self.draft_empty()
              or self.ask.get("1.0", "end").strip()):
            self.outside_since = None
        else:
            self.outside_since = self.outside_since or now
            if now - self.outside_since > 0.8:
                self.collapse()
        self.root.after(100, self.poll)

    # ----- content -----

    def draft_empty(self):
        return not self.text.get("1.0", "end").strip() and not self.pending

    def set_status(self, text, color=MUTED):
        self.undo = None  # "Undo" is only clickable while it's the message showing
        self.status.configure(cursor="")
        self.status.configure(text=text, fg=color)

    def show_pending(self):
        if not self.busy:
            n = len(self.pending)
            self.set_status(f"+ {n} picture{'s' if n > 1 else ''}" if n else "")

    def on_paste(self, e=None):
        text, images = read_clipboard(self.root)
        if not text and not images:
            self.set_status("Clipboard is empty", DANGER)
        elif self.draft_empty():
            self.submit(text, images, from_draft=False)
        else:
            # Adding to a note being typed: hold it until Save.
            self.pending += images
            if text:
                self.text.insert("insert", text)
            self.show_pending()
        return "break"

    def save_clipboard(self):
        text, images = read_clipboard(self.root)
        if text or images:
            self.submit(text, images, from_draft=False)
        else:
            self.set_status("Clipboard is empty", DANGER)

    def save_draft(self):
        if self.draft_empty():
            self.text.focus_set()
            return
        self.submit(self.text.get("1.0", "end"), list(self.pending), from_draft=True)

    def submit(self, text, images, from_draft):
        if self.busy:
            return
        self.busy = True
        self.set_status("Uploading…" if images else "Saving…", ACCENT_STRONG)
        for w in (self.save_btn, self.clip_btn):
            w.configure(state="disabled")

        def work():
            try:
                items = save(text, images, self.device)
                self.results.put(lambda: self.finish(items, from_draft, ""))
            except Exception as e:  # noqa: BLE001 — any failure is shown in the panel
                self.results.put(lambda: self.finish(None, from_draft, str(e)))

        threading.Thread(target=work, daemon=True).start()

    def finish(self, items, from_draft, error):
        self.busy = False
        for w in (self.save_btn, self.clip_btn):
            w.configure(state="normal")
        if items is None:
            self.set_status("Failed: " + error[:40], DANGER)
            return
        if from_draft:
            self.text.delete("1.0", "end")
            self.pending = []
        self.items, self.last_fetch = items, time.monotonic()
        self.render_list()
        self.set_status("Saved ✓", ACCENT_STRONG)
        self.draw_button(ACCENT_STRONG)
        self.root.after(900, lambda: None if self.busy else (self.show_pending(), self.draw_button()))

    # ----- recent items -----

    def refresh(self):
        if self.loading:
            return
        self.loading = True
        if not self.items:
            self.render_list()

        def work():
            try:
                items, _ = read_index()
                self.results.put(lambda: self.loaded(items, ""))
            except Exception as e:  # noqa: BLE001
                self.results.put(lambda: self.loaded(None, str(e)))

        threading.Thread(target=work, daemon=True).start()

    def loaded(self, items, error):
        self.loading = False
        self.last_fetch = time.monotonic()
        if items is None:
            self.set_status("Couldn't load: " + error[:30], DANGER)
            return
        self.items = items
        self.render_list()

    def render_list(self):
        for w in self.list.winfo_children():
            w.destroy()
        if not self.items:
            msg = "Loading…" if self.loading else "Nothing saved yet."
            tk.Label(self.list, text=msg, bg=SURFACE, fg=FAINT, font=("Segoe UI", 9),
                     anchor="w").pack(fill="x", padx=8, pady=4)
        for it in self.items[:8]:
            self.add_row(it)
        self.fit()

    def add_row(self, it):
        n = len(it.get("images") or [])
        preview = it.get("text") or ("Picture" if n == 1 else f"{n} pictures")
        if len(preview) > 46:
            preview = preview[:45].rstrip() + "…"
        if n and it.get("text"):
            preview = "🖼 " + preview
        row = tk.Frame(self.list, bg=SURFACE, cursor="hand2")
        row.pack(fill="x")
        meta = tk.Label(row, text=f"{when(it['ts'])}  {it.get('from', '')}", bg=SURFACE, fg=MUTED,
                        font=("Segoe UI", 8), anchor="w", width=16)
        meta.pack(side="left", padx=(8, 4), pady=3)
        body = tk.Label(row, text=preview, bg=SURFACE, fg=TEXT, font=("Segoe UI", 9), anchor="w")
        body.pack(side="left", fill="x", expand=True)
        copy = tk.Label(row, text="Copy", bg=SURFACE, fg=ACCENT_STRONG, font=("Segoe UI Semibold", 8))
        copy.pack(side="right", padx=8)
        parts = (row, meta, body, copy)

        def paint(bg):
            for w in parts:
                w.configure(bg=bg)

        for w in parts:
            w.bind("<Enter>", lambda e: paint(SURFACE2))
            w.bind("<Leave>", lambda e: paint(SURFACE))
            w.bind("<Button-1>", lambda e, it=it: self.copy_item(it))

    def copy_item(self, it):
        names = it.get("images") or []
        text = html_to_text(it.get("html", "")) or it.get("text", "")
        if text or not names:
            self.copied(clipboard_formats(text=text), "", "Copied text ✓" + (" (not pictures)" if names else ""))
            return
        self.set_status("Fetching picture…", ACCENT_STRONG)

        def work():
            try:
                formats = clipboard_formats(img=fetch_image(names[0]))
                self.results.put(lambda: self.copied(formats, ""))
            except Exception as e:  # noqa: BLE001
                self.results.put(lambda: self.copied(None, str(e)))

        threading.Thread(target=work, daemon=True).start()

    def copied(self, formats, error, message="Picture copied ✓"):
        try:
            if formats is None:
                raise RuntimeError(error)
            set_clipboard(formats)
            self.set_status(message, ACCENT_STRONG)
        except Exception as e:  # noqa: BLE001
            self.set_status("Copy failed: " + str(e)[:30], DANGER)

    # ----- chat -----

    def chat_hint(self):
        self.write("Ask Claude anything. It can read your Vault, calendar, Gmail and Drive, and add to Vault notes.\n\n"
                   "Tick “Include current screen” to ask about what's on your screen. The panel hides for a moment "
                   "while the screenshot is taken.", "hint")

    def write(self, text, *tags):
        self.log.insert("end", text, tags)
        self.log.see("end")

    def set_shot(self, on):
        self.shot = on
        self.shot_toggle.configure(text=("☑" if on else "☐") + "  Include current screen",
                                   fg=ACCENT_STRONG if on else MUTED)

    def send(self):
        question = self.ask.get("1.0", "end").strip()
        if not question:
            self.ask.focus_set()
            return
        self.ask.delete("1.0", "end")
        if self.shot:
            self.set_shot(False)  # one screenshot per tick, so one is never sent by accident
            self.root.attributes("-alpha", 0.0)
            self.root.after(180, lambda: self.start_chat(question, grab=True))
        else:
            self.start_chat(question, grab=False)

    def start_chat(self, question, grab):
        shot = None
        if grab:
            try:
                x = self.root.winfo_rootx() + self.root.winfo_width() // 2
                y = self.root.winfo_rooty() + self.root.winfo_height() // 2
                shot = grab_screen(monitor_rect(x, y))
            except Exception as e:  # noqa: BLE001
                self.write(f"Couldn't capture the screen: {e}\n", "err")
            finally:
                self.root.attributes("-alpha", 1.0)
        if self.log.tag_ranges("hint"):
            self.log.delete("1.0", "end")
        self.write("You\n", "you")
        self.write(question + "\n")
        if shot:
            thumb = shot.copy()
            thumb.thumbnail((240, 150))
            self.thumbs.append(ImageTk.PhotoImage(thumb))
            self.log.image_create("end", image=self.thumbs[-1], pady=4)
            self.write("\n")
        self.write("\nClaude\n", "claude")
        self.reply = ""
        self.stopped = False

        args = [CLAUDE, "-p", "--input-format", "stream-json", "--output-format", "stream-json", "--verbose",
                "--include-partial-messages", "--permission-mode", "acceptEdits",
                "--allowedTools", CHAT_TOOLS, "--append-system-prompt", CHAT_PROMPT]
        if self.session:
            args += ["--resume", self.session]
        errors = tempfile.TemporaryFile(mode="w+", encoding="utf-8")
        try:
            proc = subprocess.Popen(args, cwd=VAULT, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=errors,
                                    text=True, encoding="utf-8", errors="replace",
                                    creationflags=subprocess.CREATE_NO_WINDOW)
        except OSError as e:
            self.write(f"Couldn't start Claude Code: {e}\n\n", "err")
            return
        self.chat_proc = proc
        self.send_btn.configure(text="Stop")
        self.set_status("Claude is thinking…", ACCENT_STRONG)
        threading.Thread(target=self.chat_worker, args=(proc, errors, question, shot), daemon=True).start()

    def chat_worker(self, proc, errors, question, shot):
        put = self.results.put
        content = [{"type": "text", "text": question}] + ([image_block(shot)] if shot else [])
        try:
            proc.stdin.write(json.dumps({"type": "user", "message": {"role": "user", "content": content}}) + "\n")
            proc.stdin.close()
        except OSError:
            pass
        result = None
        for line in proc.stdout:
            try:
                d = json.loads(line)
            except ValueError:
                continue
            kind = d.get("type")
            if kind == "stream_event":
                ev = d.get("event") or {}
                delta = ev.get("delta") or {}
                if ev.get("type") == "content_block_delta" and delta.get("type") == "text_delta":
                    put(lambda t=delta["text"]: self.chat_text(t))
            elif kind == "assistant":
                for block in (d.get("message") or {}).get("content") or []:
                    if block.get("type") == "tool_use":
                        put(lambda b=block: self.chat_tool(b.get("name", ""), b.get("input") or {}))
            elif kind == "system" and d.get("subtype") == "init":
                put(lambda s=d.get("session_id"): setattr(self, "session", s))
            elif kind == "result":
                result = d
        proc.wait()
        errors.seek(0)
        err = errors.read().strip()[-300:]
        errors.close()
        put(lambda: self.chat_done(proc, result, err or f"Claude Code stopped (exit code {proc.returncode})"))

    def chat_text(self, text):
        self.reply += text
        self.write(text)

    def chat_tool(self, name, args):
        if self.log.get("end-2c") != "\n":
            self.write("\n")
        self.write("· " + describe_tool(name, args) + "\n", "tool")
        if self.reply:
            self.reply += "\n\n"

    def chat_done(self, proc, result, error):
        if proc is not self.chat_proc:
            return
        self.chat_proc = None
        self.send_btn.configure(text="Send")
        self.set_status("")
        if self.stopped:
            self.write("\n(stopped)", "tool")
        elif result is None:
            self.write("\n" + error, "err")
        else:
            if result.get("is_error") or result.get("subtype") != "success":
                self.write("\n" + str(result.get("result") or result.get("subtype")), "err")
            elif not self.reply and result.get("result"):
                self.chat_text(result["result"])
            denied = sorted({x.get("tool_name", "?") for x in result.get("permission_denials") or []})
            if denied:
                self.write("\n(Not allowed from the button: " + ", ".join(denied) + ")", "tool")
        self.reply = self.reply.strip()
        self.write("\n\n")
        if not self.expanded:
            self.unread = True
            self.draw_button()

    def stop_chat(self):
        proc = self.chat_proc
        if not proc:
            return
        self.stopped = True
        subprocess.run(["taskkill", "/PID", str(proc.pid), "/T", "/F"], capture_output=True,
                       creationflags=subprocess.CREATE_NO_WINDOW)

    def new_chat(self):
        self.stop_chat()
        self.chat_proc = None
        self.send_btn.configure(text="Send")
        self.session = None
        self.reply = ""
        self.thumbs = []
        self.log.delete("1.0", "end")
        self.chat_hint()
        self.set_status("New chat", MUTED)
        self.ask.focus_set()

    def copy_reply(self):
        if not self.reply:
            self.set_status("No reply yet", DANGER)
            return
        self.copied(clipboard_formats(text=self.reply), "", "Reply copied ✓")

    # ----- to-dos -----

    def load_todos(self):
        t, today = self.todo_list, date.today()
        for tag in t.tag_names():
            if tag.startswith("#"):
                t.tag_delete(tag)
        t.delete("1.0", "end")
        try:
            self.todos = collect_todos(today)
        except (OSError, ValueError) as e:
            self.todos = []
            t.insert("end", f"Couldn't read To-Dos.md: {e}", "late")
            self.fit()
            return
        group, late = None, 0
        for n, it in enumerate(self.todos):
            if it["group"] != group:
                group = it["group"]
                t.insert("end", group.upper() + "\n", "group")
            act, opener = f"#act{n}", f"#open{n}"
            if it["kind"] == "task":
                t.insert("end", "☐ ", ("row", "box", act))
                t.insert("end", it["text"], ("row", opener))
                if it["due"]:
                    days = (it["due"] - today).days
                    late += days < 0
                    label = "overdue · " if days < 0 else "today · " if days == 0 else ""
                    t.insert("end", f"  {label}{it['due'].day} {it['due']:%b}",
                             ("row", "late" if days <= 0 else "soon" if days <= 7 else "meta"))
            else:
                t.insert("end", "↻ ", ("row", "box"))
                t.insert("end", it["text"], ("row", opener))
                t.insert("end", "  last " + (it["last"] or "never"), ("row", "meta"))
                t.insert("end", "   Log", ("row", "action", act))
            t.insert("end", "\n", "row")
            t.tag_bind(act, "<Button-1>", lambda e, n=n: self.todo_action(n))
            t.tag_bind(opener, "<Button-1>", lambda e, note=it["note"]: webbrowser.open(VIEW_URL + urllib.parse.quote(note)))
            for tag in (act, opener):
                t.tag_bind(tag, "<Enter>", lambda e: t.configure(cursor="hand2"))
                t.tag_bind(tag, "<Leave>", lambda e: t.configure(cursor="arrow"))
        if not self.todos:
            t.insert("end", "Nothing open.", "meta")
        tasks = sum(it["kind"] == "task" for it in self.todos)
        recur = len(self.todos) - tasks
        self.todo_summary.configure(text=f"{tasks} open" + (f" · {late} overdue" if late else "")
                                    + (f" · {recur} recurring due" if recur else ""))
        self.fit()

    def todo_action(self, n):
        it, today = self.todos[n], date.today().isoformat()
        if it["kind"] == "task":
            new, done = it["line"].replace("[ ]", "[x]", 1) + f" ✅ {today}", "Ticked"
        else:
            hist = sorted({today, *it["hist"]}, reverse=True)[:12]
            new, done = " | ".join(it["parts"] + [", ".join(hist)]), "Logged"
        try:
            index = rewrite_line(it["path"], it["index"], it["line"], new)
        except (OSError, RuntimeError) as e:
            self.set_status("Not saved: " + str(e)[:40], DANGER)
            self.load_todos()
            return
        self.set_status(f"{done} ✓  Undo", ACCENT_STRONG)
        undo = self.undo = (it["path"], index, new, it["line"])
        self.status.configure(cursor="hand2")
        self.root.after(20000, lambda: self.set_status("") if self.undo is undo else None)
        self.load_todos()

    def undo_todo(self):
        undo = self.undo
        if not undo:
            return
        try:
            rewrite_line(*undo)
            self.set_status("Undone", MUTED)
        except (OSError, RuntimeError) as e:
            self.set_status("Couldn't undo: " + str(e)[:40], DANGER)
        self.load_todos()


def main():
    try:
        ctypes.windll.shcore.SetProcessDpiAwareness(1)
    except (AttributeError, OSError):
        pass
    mutex = ctypes.windll.kernel32.CreateMutexW(None, False, "szfg2-dropbutton")  # noqa: F841 — held for one instance
    if ctypes.windll.kernel32.GetLastError() == 183:
        return
    DropButton().root.mainloop()


if __name__ == "__main__":
    main()
