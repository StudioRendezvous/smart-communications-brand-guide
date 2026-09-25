"""Local preview server for the brand site. Sends no-cache headers so edits show on reload.
Usage: python3 tools/serve.py [port]   (serves ./site)"""
import functools
import http.server
import os
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 4180
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "site")


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        super().end_headers()


if __name__ == "__main__":
    handler = functools.partial(NoCacheHandler, directory=ROOT)
    with http.server.ThreadingHTTPServer(("", PORT), handler) as httpd:
        print(f"Serving {os.path.normpath(ROOT)} at http://localhost:{PORT}")
        httpd.serve_forever()
