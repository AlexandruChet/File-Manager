const fs = require("node:fs").promises;
const path = require("node:path");
const readline = require("node:readline");
const chalk = require("chalk");
const { exec } = require("child_process");
const { isUtf8 } = require("node:buffer");

let road = process.cwd();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `${chalk.greenBright(road)}> `,
});
class Anton {
  static logMessage(icon, colorFn, message) {
    console.log(`${icon} ${colorFn(message)}`);
  }

  success(message = "Success! Everything went smoothly. 🚀") {
    Anton.logMessage("✅", chalk.greenBright, message);
  }

  error(message = "Oops! Command not recognized. Try 'help' 📖") {
    Anton.logMessage("⚠️", chalk.redBright, message);
  }

  greeting(message = "Hey there! I'm Anton, your friendly CLI assistant 🤖") {
    Anton.logMessage("👋", chalk.cyanBright, message);
  }

  farewell(message = "Goodbye! Keep coding and have fun! 🎉") {
    Anton.logMessage("👋", chalk.cyanBright, message);
  }

  info(message) {
    Anton.logMessage("ℹ️", chalk.blueBright, `Info: ${message} 🔍`);
  }

  warning(message) {
    Anton.logMessage("⚡", chalk.yellowBright, `Warning: ${message} ⚠️`);
  }
}

const anton = new Anton();

const workLoop = () => {
  rl.question(`${road}> Hello please write your command:  `, (a) => {
    const [cmd, ...args] = a.trim().split("");
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
            anton.error();
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
          } catch (error) {
            console.error(error);
            anton.error();
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
                anton.error();
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
                anton.error();
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
                anton.error();
              }
              workLoop();
            }
          );
        });
        break;

      case "writeAppend":
        rl.question("write the path to the file: ", (fileToPath) => {
          rl.question(
            "write the information you want to write: ",
            async (content) => {
              try {
                await fs.appendFile(fileToPath, content, "utf8");
                anton.infoText(
                  `The data was successfully added to the file: ${fileToPath}`
                );
                anton.basicText();
              } catch (error) {
                anton.error();
                console.error(error);
              }
              workLoop();
            }
          );
        });
        break;

      case "launch":
        rl.question("Write file name (only .js): ", async (url) => {
          if (url.endsWith(".js")) {
            try {
              exec(`node ${url}`, (error, stdout) => {
                if (error) {
                  anton.error();
                  console.error(`Error: ${error.message}`);
                } else {
                  anton.infoText(`File "${url}" executed successfully`);
                  console.log(`Output:\n${stdout}`);
                  anton.basicText();
                }
                workLoop();
              });
            } catch (error) {
              anton.error();
              console.error(`Unexpected error: ${error}`);
              workLoop();
            }
          } else {
            anton.error();
            anton.infoText("You can only launch .js files");
            workLoop();
          }
        });
        break;

      case "delete":
        rl.question("Please write your file name: ", async (fileName) => {
          try {
            await fs.unlink(fileName);
          } catch (error) {
            console.error(error);
            anton.error();
          }
          workLoop();
        });
        break;

      case "show":
        rl.question(
          "Write the name of the file whose contents you want to see: ",
          async (showName) => {
            try {
              const data = await fs.readFile(showName, "utf8");
              console.log(data);
            } catch (err) {
              console.error("Error:", err);
            }
            workLoop();
          }
        );
        break;

      case "ls":
        rl.question("Please write your folder name: ", async (lsName) => {
          try {
            const files = await fs.readdir(lsName);
            console.log(files.join("\n"));
          } catch (error) {
            console.error("Error:", error);
            anton.error();
          }
          workLoop();
        });
        break;

      case "rewrite":
        rl.question("Write the current file name: ", (firstName) => {
          rl.question("Write the new file name: ", async (secondName) => {
            try {
              await fs.rename(firstName, secondName);
              console.log(`Renamed ${firstName} → ${secondName}`);
            } catch (error) {
              console.error("Error:", error);
              anton.error();
            }
            workLoop();
          });
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
