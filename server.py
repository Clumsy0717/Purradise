"""Run: python3 server.py  ->  http://localhost:8000
Serves the site and a tiny JSON API: /api/fact returns a random cat fact."""
import json, random
from http.server import SimpleHTTPRequestHandler, HTTPServer

FACTS = [
    "Cats can rotate their ears 180 degrees.",
    "A group of kittens is called a kindle.",
    "Cats have about 32 muscles in each ear.",
    "A cat's purr can be a sign of comfort, and sometimes of self-soothing.",
    "Cats spend about 70 percent of their lives sleeping.",
    "Most cats can't taste sweetness.",
    "A cat's whiskers are about as wide as its body.",
    "Cats walk by moving both legs on one side, then the other.",
]

class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/api/fact":
            body = json.dumps({"fact": random.choice(FACTS)}).encode()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
        else:
            super().do_GET()

if __name__ == "__main__":
    print("Purradise running at http://localhost:8000")
    HTTPServer(("", 8000), Handler).serve_forever()