const express = require("express");
const path = require("node:path");
const fs = require("node:fs");

const PORT = process.env.PORT || 3000;
const app = express();

const STATIC_PATH = path.join(process.cwd(), "./public");

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

const toBool = [() => true, () => false];

const prepareFile = async (url) => {
  const paths = [STATIC_PATH, url];
  if (url.endsWith("/")) paths.push("index.html");

  const filePath = path.join(...paths);
  const pathTraversal = !filePath.startsWith(STATIC_PATH);

  const exists = await fs.promises
    .access(filePath)
    .then(...toBool)
    .catch(() => false);

  const found = !pathTraversal && exists;
  const streamPath = found ? filePath : path.join(STATIC_PATH, "404.html");

  const ext = path.extname(streamPath).substring(1).toLowerCase();
  const stream = fs.createReadStream(streamPath);

  return { found, ext, stream };
};

app.get(/.*/, async (req, res) => {
  const file = await prepareFile(req.url);
  const statusCode = file.found ? 200 : 404;
  const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;

  res.writeHead(statusCode, { "Content-Type": mimeType });
  file.stream.pipe(res);

  console.log(`${req.method} ${req.url} ${statusCode}`);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://127.0.0.1:${PORT}`);
});
