const crypto = require("node:crypto");

const generatePasswordLoop = (length) => {
  const symbols = "QWERTYUIOPASDFGHJKLZXCVBNM?!@#$%^&*()1234567890_+-=|";

  let randomPassword = "";

  for (let i = 0; i < length; i++) {
    randomPassword += symbols[crypto.randomInt(symbols.length)];
  }

  return randomPassword;
};

const basicPas = generatePasswordLoop(4);
console.log("Original Password:", basicPas);

let attempt;
let tries = 0;

do {
  attempt = generatePasswordLoop(4);
  tries++;
} while (attempt !== basicPas);

console.log("Password selected:", attempt);
console.log("Number of attempts:", tries);
