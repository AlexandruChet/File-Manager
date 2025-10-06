const { createGzip } = require("node:zlib");
const { createReadStream, createWriteStream } = require("node:fs");
const { pipeline } = require("node:stream");
const { promisify } = require("node:util");

const pipe = promisify(pipeline);

const compress = async (toCompress, afterCompress) => {
  const gzip = createGzip();

  const source = createReadStream(toCompress);
  const destination = createWriteStream(afterCompress);

  await pipe(source, gzip, destination);

  console.log(`✅ File "${toCompress}" compressed into "${afterCompress}"`);
};

compress("./AI.js", "./compressed.js.gz");
