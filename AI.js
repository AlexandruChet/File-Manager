const fs = require("node:fs").promises;
const { mkdir } = require("node:fs");
const path = require("node:path");
const readline = require("node:readline");
import chalk from "chalk";

let road = process.cwd();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `${chalk.greenBright(road)}> `,
});

class Anton {
  basicText() {
    const phrases = [
      `✅ ${chalk.greenBright("Success! Everything went smoothly. 🚀")}`,
      `🎉 ${chalk.cyanBright("Done! You can continue your adventure. 🌟")}`,
      `✔️ ${chalk.blueBright("Task completed! Keep up the great work! 💪")}`,
      `💡 ${chalk.magentaBright("All set! Ready for the next command. ⚡")}`,
      `✨ ${chalk.yellowBright("Operation successful! Shine on! ✨")}`,
    ];
    console.log(phrases[Math.floor(Math.random() * phrases.length)]);
  }

  errorText() {
    const phrases = [
      `⚠️ ${chalk.redBright("Oops! Command not recognized. Try 'help' 📖")}`,
      `❌ ${chalk.redBright(
        "Something went wrong. Double-check your input 🧐"
      )}`,
      `🚫 ${chalk.redBright(
        "Error! This command doesn't exist. Try again 🔄"
      )}`,
      `💡 ${chalk.yellowBright(
        "Hint: Use 'help' to see all available commands 🛠️"
      )}`,
      `🛑 ${chalk.redBright("Invalid command! Don't worry, you'll get it 💫")}`,
    ];
    console.log(phrases[Math.floor(Math.random() * phrases.length)]);
  }

  greeting() {
    const greetings = [
      `👋 ${chalk.cyanBright(
        "Hey there! I'm Anton, your friendly CLI assistant 🤖"
      )}`,
      `✨ ${chalk.greenBright(
        "Welcome! Ready to help you code like a pro 💻"
      )}`,
      `🚀 ${chalk.magentaBright("Hi! Let's make some magic happen today 🌟")}`,
      `💫 ${chalk.blueBright("Greetings! I'm here to guide your commands 🧭")}`,
    ];
    console.log(greetings[Math.floor(Math.random() * greetings.length)]);
  }

  farewell() {
    const farewells = [
      `👋 ${chalk.cyanBright("Goodbye! Keep coding and have fun! 🎉")}`,
      `🌟 ${chalk.greenBright(
        "Exiting for now. Come back soon for new adventures 💻"
      )}`,
      `💻 ${chalk.magentaBright(
        "Work done! Stay awesome and keep learning 💪"
      )}`,
      `✨ ${chalk.blueBright("See you later! More coding awaits 🛠️")}`,
    ];
    console.log(farewells[Math.floor(Math.random() * farewells.length)]);
  }

  infoText(message) {
    const phrases = [
      `ℹ️ ${chalk.cyanBright(`Info: ${message} 🔍`)}`,
      `💡 ${chalk.yellowBright(`Tip: ${message} 📝`)}`,
      `📝 ${chalk.blueBright(`Note: ${message} 📌`)}`,
      `🔹 ${chalk.magentaBright(`FYI: ${message} 💭`)}`,
      `✨ ${chalk.greenBright(`Heads up: ${message} 🌟`)}`,
    ];
    console.log(phrases[Math.floor(Math.random() * phrases.length)]);
  }
}

const anton = new Anton();

const workLoop = () => {
  rl.question(`${road}> Hello please write your command:  `, (a) => {
    const [cmd, ...args] = a.trim().split(" ");
    anton.greeting();

    switch (cmd) {
      case "help":
        const commandList = {
          help: "-> shows all commands",
          createFile: "-> creates a file",
          createDirectory: "-> creates a folder",
          copyFile: "-> copy file",
          search: "-> searches for a word in files",
          write: "-> overwrites the contents of the file",
          writeAppendFile: "-> written at the end of the file",
          launch: "-> launch file",
          delete: "-> deleted file",
          show: "-> show file content",
          ls: "-> list files and folders",
          rewrite: "-> rewrite the name",
          serverFile: "-> automatically starts a server on node js",
          about:
            "-> The file itself is a list of commands and a simulation AI that helps you.",
          cd: "-> change directory",
          admin: "-> attempt to obtain admin status",
          encrypt: "-> this command encrypt your password",
          exit: "-> close program",
        };

        console.table(commandList);
        anton.basicText();
        workLoop();
        break;

      case "createFile":
        rl.question("📄 Please enter file name: ", async (fileName) => {
          try {
            const filePath = path.join(road, fileName);
            await fs.writeFile(filePath, "");
            anton.infoText(`File created at ${filePath}`);
            anton.basicText();
          } catch (err) {
            anton.errorText();
          }
          workLoop();
        });
        break;

      case "createDirectory":
        rl.question("📂 Please enter directory name: ", async (dirName) => {
          try {
            const dirPath = path.join(road, dirName);
            await fs.mkdir(dirPath, { recursive: true });
            anton.infoText(`Directory created at ${dirPath}`);
            anton.basicText();
          } catch (err) {
            anton.errorText();
          }
          workLoop();
        });
        break;

      case "copyFile":
        rl.question("Enter source file path: ", (sourcePath) => {
          rl.question(
            "Enter destination file path: ",
            async (destinationPath) => {
              try {
                await fs.copyFile(sourcePath, destinationPath);
                anton.infoText(
                  `File successfully copied to ${destinationPath}`
                );
                anton.basicText();
              } catch (error) {
                anton.errorText();
              }
              workLoop();
            }
          );
        });
        break;

      case "search":
        rl.question("write the name / path of the file: ", (filePath) => {
          rl.question(
            "write the word that you need to find: ",
            async (wordToFind) => {
              try {
                const data = await fs.readFile(filePath, "utf8");
                const lines = data.split("\n");
                const found = lines.some((line) => line.includes(wordToFind));

                if (found) {
                  anton.infoText(`Word "${wordToFind}" found in: ${filePath}`);
                } else {
                  anton.infoText(
                    `Word "${wordToFind}" not found in: ${filePath}`
                  );
                }
                anton.basicText();
              } catch (error) {
                anton.errorText();
              }
              workLoop();
            }
          );
        });
        break;

      case "write":
        rl.question("write the path to the file: ", (filePath) => {
          rl.question(
            "write the information you want to write: ",
            async (content) => {
              try {
                await fs.writeFile(filePath, content, "utf8");
                anton.infoText(`All content written to file ${filePath}`);
                anton.basicText();
              } catch (error) {
                anton.errorText();
              }
              workLoop();
            }
          );
        });
        break;

      case "exit":
        anton.farewell();
        rl.close();
        break;

      default:
        anton.errorText();
        workLoop();
    }
  });
};

workLoop();
