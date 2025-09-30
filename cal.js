const readline = require("node:readline");

const path = process.cwd();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `${path}> `,
});

const Calculating = () => {
  rl.question(
    "You can write +, -, *, /, ^, P, √ (square root): or write numbers\n> ",
    (input) => {
      const [cmd, ...args] = input.trim().split(" ");

      switch (cmd) {
        case "√":
          rl.question("Write a number: ", (num) => {
            try {
              const number = parseFloat(num);
              if (isNaN(number)) throw new Error("Not a number");
              const answer = Math.sqrt(number);
              console.log(`Result: ${answer}`);
            } catch (error) {
              console.error(error.message);
            }
            Calculating();
          });
          break;

        default:
          console.log("Unknown command");
          Calculating();
          break;
      }
    }
  );
};

Calculating();
