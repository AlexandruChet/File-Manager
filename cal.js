const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

function cl(name) {
  console.log(name);
}

rl.question("Write first num: ", (first) => {
  const firstNum = Number(first);

  rl.question("Write second num: ", (second) => {
    const secondNum = Number(second);

    rl.question("Write command (+ - * / ^ (exponentiation)): ", (command) => {
      let result;

      switch (command) {
        case "+":
          result = firstNum + secondNum;
          break;

        case "-":
          result = firstNum - secondNum;
          break;

        case "*":
          result = firstNum * secondNum;
          break;

        case "/":
          result =
            secondNum !== 0 ? firstNum / secondNum : "Error: division zero";
          break;

        case "^":
          result = firstNum ** secondNum;
          break;

        default:
          result = "Unknown command!";
      }

      cl(`Result: ${result}`);
      rl.close();
    });
  });
});
