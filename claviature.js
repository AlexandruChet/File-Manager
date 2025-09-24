const fs = require("node:fs");
const readline = require("node:readline");
const path = require("node:path");

function cl(name) {
  console.log(name);
}

const currentPath = process.cwd();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `> ${currentPath} `,
});

const list = {
  first: `Fat son how smiling mrs natural expense anxious friends.`,
  second: `Same an quit most an. Admitting an mr disposing sportsmen.`,
  third: `Must you with him from him her were more.`,
  fourth: `Oh he decisively impression attachment friendship so if everything.`,
  fifth: `Ever man are put down his very. And marry may table him avoid.`,
};

const keys = Object.keys(list);
const randomKey = keys[Math.floor(Math.random() * keys.length)];
const randomValue = list[randomKey];

cl("now you will need to type fast");
cl(`Your text:\n${randomValue}`);
cl("press enter to begin");

rl.prompt();

let startTime;

rl.on("line", (input) => {
  if (!startTime) {
    startTime = Date.now();
    cl("timer started! Type the text now.");
    rl.prompt();
    return;
  }

  const endTime = Date.now();
  const timeTaken = ((endTime - startTime) / 1000).toFixed(2);

  if (input.trim() === randomValue.trim()) {
    cl(`Your text is correct! Time taken: ${timeTaken} seconds`);
  } else {
    cl(`Your text is incorrect! Time taken: ${timeTaken} seconds`);
  }

  fs.writeFile("text.txt", input.trim(), (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      cl("Your text has been saved to text.txt");
    }
  });

  rl.close();
});
