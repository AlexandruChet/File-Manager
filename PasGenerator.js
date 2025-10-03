const crypto = require("node:crypto");

const generatePasswordLoop = (length, symbols) => {
  let randomPassword = "";

  for (let i = 0; i < length; i++) {
    randomPassword += symbols[crypto.randomInt(symbols.length)];
  }
  
  return randomPassword;
};

const Loop = async () => {
  const symbols = "QWERTYUIOPASDFGHJKLZXCVBNM?!@#$%^&*()1234567890_+-=|";
  const length = 4;
  const basicPas = generatePasswordLoop(length, symbols);
  console.log("Original Password:", basicPas);

  let attempt = null;
  let tries = 0;
  const maxAttempts = 5_000_000_000_000_000_000_000_000;
  const batchSize = 2000;
  const startTime = Date.now();
  let lastTries = 0;

  const statsInterval = setInterval(() => {
    const past = (Date.now() - startTime) / 1000;
    const delta = tries - lastTries;
    lastTries = tries;
    const triesPerSec = (tries / Math.max(1, past)).toFixed(0);
    console.log(
      `Elapsed: ${past.toFixed(1)}
      s | Attempts: ${tries} | Speed: ${triesPerSec} tries/s`
    );
  }, 1000);

  outer: while (tries < maxAttempts) {
    for (let i = 0; i < batchSize; i++) {
      attempt = generatePasswordLoop(length, symbols);
      tries++;
      if (attempt === basicPas) {
        break outer;
      }
    }
    await new Promise((resolve) => setImmediate(resolve));
  }

  clearInterval(statsInterval);

  if (attempt === basicPas) {
    const totalSec = (Date.now() - startTime) / 1000;
    console.log("Password selected:", attempt);
    console.log("Number of attempts:", tries);
    console.log(
      `Total time: ${totalSec.toFixed(2)}s | Avg speed: ${(
        tries / totalSec
      ).toFixed(0)} tries/s`
    );
  } else {
    console.log(
      `Stopped after maxAttempts (${maxAttempts}). Last attempt: ${attempt}`
    );
  }
};
Loop();
