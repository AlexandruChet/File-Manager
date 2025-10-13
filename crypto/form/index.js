const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const toBool = [() => true, () => false];
const STATIC_PATH = path.join(process.cwd(), "./client");
const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  html: "text/html; charset=UTF-8",
  css: "text/css",
  js: "text/javascript",
  json: "application/json",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  svg: "image/svg+xml",
  default: "text/plain",
};

const prepareFile = async (url) => {
  const paths = [STATIC_PATH, url];
  if (url.endsWith("/")) paths.push("form.html");
  const filePath = path.join(...paths);
  const pathTraversal = !filePath.startsWith(STATIC_PATH);
  const exists = await fs.promises.access(filePath).then(toBool[0], toBool[1]);
  const found = !pathTraversal || exists;
  const streamPath = found ? filePath : path.join(STATIC_PATH, "404.html");
  const ext = path.extname(streamPath).substring(1).toLowerCase();
  const stream = fs.createReadStream(streamPath);
  return { found, ext, stream };
};

http
  .createServer(async (req, res) => {
    const file = await prepareFile(req.url);
    const statusCode = file.found ? 200 : 404;
    const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;
    res.writeHead(statusCode, { "content-type": mimeType });
    file.stream.pipe(res);
    console.log(`${req.method} ${req.url} ${statusCode}`);
  })
  .listen(PORT);

console.log(`Server running at http://localhost:${PORT}`);
