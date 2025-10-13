const http = require("node:http");
const path = require("node:path");
const fs = require("node:fs");

const PORT = 3000;
const STATIC_PATH = path.join(process.cwd(), "./static");
const toBool = [() => true, () => false];

const MIME_TYPES = {
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

const prepareFile = async (url) => {
  const cleanUrl = url.split("?")[0];
  const paths = [STATIC_PATH, cleanUrl];
  if (cleanUrl.endsWith("/")) paths.push("index.html");

  const filePath = path.join(...paths);
  const resolvedPath = path.resolve(filePath);
  const pathTraversal = !resolvedPath.startsWith(STATIC_PATH);
  const exists = await fs.promises
    .access(resolvedPath)
    .then(toBool[0], toBool[1]);
  const found = !pathTraversal && exists;

  const streamPath = found ? resolvedPath : path.join(STATIC_PATH, "404.html");
  const ext = path.extname(streamPath).substring(1).toLowerCase();
  const stream = fs.createReadStream(streamPath);
  return { found, ext, stream };
};

async function getFilesWithExtension(directory) {
  try {
    const files = await fs.promises.readdir(directory);

    const filesWithExt = files.map((file) => {
      const ext = path.extname(file);
      return {
        name: file,
        extension: ext || "no-extension",
      };
    });

    return filesWithExt;
  } catch (error) {
    console.error("Error to reading: ", error);
    throw error;
  }
}

getFilesWithExtension(STATIC_PATH)
  .then((files) => console.log(files))
  .catch((err) => console.error("Error: ", err));

http
  .createServer(async (req, res) => {
    const file = await prepareFile(req.url);
    const statusCode = file.found ? 200 : 404;

    if (req.url === "/favicon.ico") {
      res.writeHead(204);
      return res.end();
    }

    const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;
    res.writeHead(statusCode, { "Content-Type": mimeType });
    file.stream.pipe(res);
    console.log(`${req.method} ${req.url} ${statusCode}`);
  })
  .listen(PORT);

console.log(`Server running at localhost:${PORT}`);
