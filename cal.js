const readline = require("node:readline");
const chalk = require("chalk");

const path = process.cwd();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: chalk.blueBright(`${path}> `),
});

const menu = `
${chalk.yellow("Available commands:")}
  ${chalk.green("+")}   → Addition
  ${chalk.green("-")}   → Subtraction
  ${chalk.green("*")}   → Multiplication
  ${chalk.green("/")}   → Division
  ${chalk.cyan("√")}   → Square root
  ${chalk.cyan("^")}   → Power
  ${chalk.magenta("e")}   → Exit
`;

const Calculating = () => {
  rl.question(`${menu}\n${chalk.yellow("> ")} `, (input) => {
    const [cmd] = input.trim().split(" ");

    switch (cmd) {
      case "√":
        rl.question(chalk.cyan("Write a number: "), (num) => {
          const number = parseFloat(num);
          if (isNaN(number)) {
            console.log(chalk.red("❌ Error: Not a number\n"));
          } else {
            console.log(chalk.green(`✅ Result: ${Math.sqrt(number)}\n`));
          }
          Calculating();
        });
        break;

      case "^":
        rl.question(chalk.cyan("Write the base number: "), (num) => {
          rl.question(chalk.cyan("Write the exponent: "), (st) => {
            const number = parseFloat(num);
            const exponent = parseFloat(st);

            if (isNaN(number) || isNaN(exponent)) {
              console.log(
                chalk.red("❌ Error: One of the inputs is not a number\n")
              );
            } else {
              const result = Math.pow(number, exponent);
              console.log(chalk.green(`✅ Result: ${result}\n`));
            }

            Calculating();
          });
        });
        break;

      case "+":
      case "-":
      case "*":
      case "/":
        rl.question(chalk.cyan("Write the first number: "), (num1) => {
          rl.question(chalk.cyan("Write the second number: "), (num2) => {
            const number1 = parseFloat(num1);
            const number2 = parseFloat(num2);

            if (isNaN(number1) || isNaN(number2)) {
              console.log(
                chalk.red("❌ Error: One of the inputs is not a number\n")
              );
            } else {
              let result;
              switch (cmd) {
                case "+":
                  result = number1 + number2;
                  break;
                case "-":
                  result = number1 - number2;
                  break;
                case "*":
                  result = number1 * number2;
                  break;
                case "/":
                  if (number2 === 0) {
                    console.log(chalk.red("❌ Error: Division by zero\n"));
                    Calculating();
                    return;
                  }
                  result = number1 / number2;
                  break;
              }
              console.log(chalk.green(`✅ Result: ${result}\n`));
            }
            Calculating();
          });
        });
        break;

      case "e":
        console.log(chalk.magenta("👋 Goodbye! See you next time!"));
        rl.close();
        break;

      default:
        console.log(chalk.red("❌ Unknown command\n"));
        Calculating();
        break;
    }
  });
};

Calculating();
