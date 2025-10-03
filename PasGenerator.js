const crypto = require("node:crypto");

const generatePasswordLoop = (length) => {
  const symbols = "QWERTYUIOPASDFGHJKLZXCVBNM?!@#$%^&*()1234567890_+-=|";

  let randomPassword = "";

  for (let i = 0; i < length; i++) {
    randomPassword += symbols[crypto.randomInt(symbols.length)];
  }

  return randomPassword;
};

console.log(generatePasswordLoop(12));
