import { promises as fs, createReadStream, ReadStream } from "node:fs";
import http, { IncomingMessage, ServerResponse } from "node:http";
import path from "node:path";

const PORT: number = 3000;
const STATIC_PATH: string = path.join(process.cwd(), "./static");

type MimeTypes = Record<string, string>;

const MIME_TYPES: MimeTypes = {
  html: "text/html; charset=UTF-8",
  css: "text/css",
  js: "text/javascript",
  json: "application/json",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  svg: "image/svg+xml",
  default: "application/octet-stream",
};

interface PreparedFile {
  found: boolean;
  ext: string;
  stream: ReadStream;
}

async function prepareFile(url: string): Promise<PreparedFile> {
  const cleanerUrl: string = url.split("?")[0];
  const parts: string[] = [STATIC_PATH, cleanerUrl];
  if (cleanerUrl.endsWith("/")) parts.push("index.html");

  const filePath: string = path.join(...parts);
  const resolvedPath: string = path.resolve(filePath);
  const pathTraversal: boolean = !resolvedPath.startsWith(STATIC_PATH);

  let exists: boolean = false;
  try {
    await fs.access(resolvedPath);
    exists = true;
  } catch {
    exists = false;
  }

  const found: boolean = !pathTraversal && exists;
  const streamPath: string = found
    ? resolvedPath
    : path.join(STATIC_PATH, "404.html");

  const ext: string = path.extname(streamPath).substring(1).toLowerCase();
  const stream: ReadStream = createReadStream(streamPath);

  return { found, ext, stream };
}

const server = http.createServer(
  async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    try {
      if (!req.url) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Bad Request");
        return;
      }

      if (req.url === "/favicon.ico") {
        res.writeHead(204);
        res.end();
        return;
      }

      const file = await prepareFile(req.url);
      const statusCode: number = file.found ? 200 : 404;
      const mimeType: string = MIME_TYPES[file.ext] || MIME_TYPES.default;

      res.writeHead(statusCode, { "Content-Type": mimeType });
      file.stream.pipe(res);

      console.log(`${req.method} ${req.url} ${statusCode}`);
    } catch (error) {
      console.error("Server error:", error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  }
);

server.listen(PORT, (): void => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
