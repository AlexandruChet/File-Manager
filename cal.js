const readline = require("node:readline");
const chalk = require("chalk");

const path = process.cwd();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: chalk.blueBright(`${path}> `),
});

const menu = `
${chalk.bold.yellow("📘 Available commands:")}
  ${chalk.green("+")}     → Addition
  ${chalk.green("-")}     → Subtraction
  ${chalk.green("*")}     → Multiplication
  ${chalk.green("/")}     → Division
  ${chalk.cyan("√")}     → Square root
  ${chalk.cyan("^")}     → Power (exponentiation)
  ${chalk.cyan("pi")}    → Show π number
  ${chalk.cyan("u")}     → Circle circumference (2πr)
  ${chalk.green("r")}     → Random number (min–max)
  ${chalk.green("%")}     → Percent for
  ${chalk.blue("time")}  → Show current time and date
  ${chalk.blue("clear")} → Clear console
  ${chalk.gray("help")}  → Show this menu
  ${chalk.magenta("e")}  → Exit
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

      case "pi":
        const piNum = Math.PI;
        console.log(chalk.green(`π = ${piNum}\n`));
        Calculating();
        break;

      case "u":
        rl.question(chalk.cyan("Please write the radius: "), (radius) => {
          const rad = parseFloat(radius);

          if (isNaN(rad)) {
            console.log(chalk.red("❌ Error: Not a number\n"));
          } else if (rad < 0) {
            console.log(chalk.red("❌ Error: Radius cannot be negative\n"));
          } else {
            const u = 2 * Math.PI * rad;
            console.log(
              chalk.green(`✅ Circumference (U) = ${u.toFixed(3)}\n`)
            );
          }

          Calculating();
        });
        break;

      case "r":
        rl.question(
          chalk.cyan("Please write your random password length: "),
          (input) => {
            const length = parseInt(input);

            if (isNaN(length) || length <= 0) {
              console.log(
                chalk.red("❌ Error: Please enter a valid positive number\n")
              );
              Calculating();
              return;
            }

            const symbols =
              "QqWwEeRrTtYyUuIiOoPpAaSsDdFfGgHhJjKkLlZzXxCcVvBbNnMm1234567890!@#$%^&*()_+|=-";

            let randomPassword = "";

            for (let i = 0; i < length; i++) {
              randomPassword +=
                symbols[Math.floor(Math.random() * symbols.length)];
            }

            console.log(chalk.green(`🎲 Random password: ${randomPassword}\n`));
            Calculating();
          }
        );
        break;

      case "time":
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
        const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

        const currentTime = `${hours}:${formattedMinutes}:${formattedSeconds}`;

        console.log(chalk.cyanBright(`🕒 Current time: ${currentTime}`));

        const date = new Date();
        const formattedDate = date.toISOString().split("T")[0];

        console.log(chalk.cyanBright(`📅 date: ${formattedDate}`));

        Calculating();
        break;

      case "%":
        rl.question(
          "Choose calculation: a = find part, b = find percent: ",
          (answer) => {
            if (answer === "a") {
              rl.question("Please write your sum: ", (sumInput) => {
                rl.question("Please write percent: ", (percentInput) => {
                  const sum = parseFloat(sumInput);
                  const percent = parseFloat(percentInput);

                  if (isNaN(sum) || isNaN(percent)) {
                    console.log(
                      chalk.red("❌ Error: One of the inputs is not a number\n")
                    );
                  } else {
                    const result = (sum * percent) / 100;
                    console.log(
                      chalk.green(`${percent}% of ${sum} = ${result}\n`)
                    );
                  }
                  Calculating();
                });
              });
            } else if (answer === "b") {
              rl.question("Please write your part: ", (partInput) => {
                rl.question("Please write total sum: ", (totalInput) => {
                  const part = parseFloat(partInput);
                  const total = parseFloat(totalInput);

                  if (isNaN(part) || isNaN(total)) {
                    console.log(
                      chalk.red("❌ Error: One of the inputs is not a number\n")
                    );
                  } else {
                    const percent = (part / total) * 100;
                    console.log(
                      chalk.green(`${part} is ${percent}% of ${total}\n`)
                    );
                  }
                  Calculating();
                });
              });
            } else {
              console.log(chalk.red("❌ Error: Unknown option\n"));
              Calculating();
            }
          }
        );
        break;

      case "clear":
        console.clear();
        Calculating();
        break;

      case "help":
        console.log(menu);
        Calculating();
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
