const readline = require("node:readline");

const path = process.cwd();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `${path}> `,
});

const Calculating = () => {
  rl.question(
    "You can write +, -, *, /, √ (square root), e (exit):\n> ",
    (input) => {
      const [cmd] = input.trim().split(" ");

      switch (cmd) {
        case "√":
          rl.question("Write a number: ", (num) => {
            const number = parseFloat(num);
            if (isNaN(number)) {
              console.log("Error: Not a number\n");
            } else {
              console.log(`Result: ${Math.sqrt(number)}\n`);
            }
            Calculating();
          });
          break;

        case "+":
        case "-":
        case "*":
        case "/":
          rl.question("Write the first number: ", (num1) => {
            rl.question("Write the second number: ", (num2) => {
              const number1 = parseFloat(num1);
              const number2 = parseFloat(num2);

              if (isNaN(number1) || isNaN(number2)) {
                console.log("Error: One of the inputs is not a number\n");
              } else {
                let result;
                switch (cmd) {
                  case "+": result = number1 + number2; break;
                  case "-": result = number1 - number2; break;
                  case "*": result = number1 * number2; break;
                  case "/": 
                    if (number2 === 0) {
                      console.log("Error: Division by zero\n");
                      Calculating();
                      return;
                    }
                    result = number1 / number2; 
                    break;
                }
                console.log(`Result: ${result}\n`);
              }
              Calculating();
            });
          });
          break;

        case "e":
          rl.close();
          break;

        default:
          console.log("Unknown command\n");
          Calculating();
          break;
      }
    }
  );
};

Calculating();
