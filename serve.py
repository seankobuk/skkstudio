"""Local preview server that mirrors the .htaccess clean URLs (/about -> about.html).

Usage: python3 serve.py [port]   (default 8787)
"""
import http.server
import os
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))


class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def translate_path(self, path):
        fs_path = super().translate_path(path)
        if not os.path.exists(fs_path) and os.path.isfile(fs_path.rstrip("/") + ".html"):
            return fs_path.rstrip("/") + ".html"
        return fs_path


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8787
    print(f"Serving {ROOT} at http://localhost:{port}")
    http.server.ThreadingHTTPServer(("", port), CleanURLHandler).serve_forever()
