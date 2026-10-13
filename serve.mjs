import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = join(process.cwd(), "dist");
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".jpg": "image/jpeg", ".ts": "text/plain; charset=utf-8", ".md": "text/markdown; charset=utf-8" };

createServer(async (request, response) => {
  const requestPath = request.url === "/" ? "/index.html" : decodeURIComponent(request.url.split("?")[0]);
  const safePath = normalize(requestPath).replace(/^([.][.][/\\])+/, "");
  try {
    const body = await readFile(join(root, safePath));
    response.writeHead(200, { "Content-Type": types[extname(safePath)] || "application/octet-stream", "Cache-Control": "no-store" });
    response.end(body);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}).listen(4173, "127.0.0.1", () => console.log("Preview: http://127.0.0.1:4173"));
