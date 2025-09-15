const fs = require("node:fs");
const crypto = require("node:crypto");
const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("write your code", (answer) => {
  const password = answer;
  const algorithm = "aes-256-cbc";
  const key = crypto.randomBytes(32);

  function encrypt(text) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, "utf-8", "hex");
    encrypted += cipher.final("hex");

    return {
      iv: iv.toString("hex"),
      encryptedData: encrypted,
    };
  }

  encrypt(password);
});
