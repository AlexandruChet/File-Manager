const fs = require("node:fs").promises;
const path = require("node:path");
const readline = require("node:readline");
const crypto = require("crypto");
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

  success() {
    const messages = [
      "✅ Success! Everything went smoothly. 🚀",
      "🎉 Great job, the command completed successfully.",
      "👌 No errors found, task finished perfectly.",
    ];
    messages.forEach((msg) => Anton.logMessage("✅", chalk.greenBright, msg));
  }

  error() {
    const messages = [
      "⚠️ Oops! Command not recognized. Try 'help' 📖",
      "❌ Something went wrong. Maybe a typo?",
      "🤔 I'm not sure what you mean, please check the command.",
    ];
    messages.forEach((msg) => Anton.logMessage("⚠️", chalk.redBright, msg));
  }

  greeting() {
    const messages = [
      "👋 Hey there! I'm Anton, your friendly CLI assistant 🤖",
      "😊 Ready to help you with your coding journey.",
      "💡 Type 'help' to see what I can do.",
    ];
    messages.forEach((msg) => Anton.logMessage("👋", chalk.cyanBright, msg));
  }

  farewell() {
    const messages = [
      "👋 Goodbye! Keep coding and have fun! 🎉",
      "🛑 Session ended, but I'll be here when you return.",
      "✨ Don’t forget to take breaks and stay hydrated!",
    ];
    messages.forEach((msg) => Anton.logMessage("👋", chalk.cyanBright, msg));
  }

  info() {
    const messages = [
      "ℹ️ Information mode activated.",
      "📌 Here’s a useful tip for you.",
      "💬 Remember: learning comes step by step.",
    ];
    messages.forEach((msg) => Anton.logMessage("ℹ️", chalk.blueBright, msg));
  }

  warning() {
    const messages = [
      "⚡ Warning: proceed with caution.",
      "⚠️ Something may not be safe here.",
      "👀 Double-check before continuing.",
    ];
    messages.forEach((msg) => Anton.logMessage("⚡", chalk.yellowBright, msg));
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
          help: "shows all commands",
          createFile: "creates a file",
          createDirectory: "creates a folder",
          copyFile: "copy file",
          search: "searches for a word in files",
          write: "overwrites the contents of the file",
          writeAppendFile: "written at the end of the file",
          launch: "launch file",
          delete: "deleted file",
          show: "show file content",
          ls: "list files and folders",
          rewrite: "rewrite the name",
          serverFile: "automatically starts a server on Node.js",
          about:
            "the file itself is a list of commands and a simulation AI that helps you",
          cd: "change directory",
          admin: "attempt to obtain admin status",
          encrypt: "encrypt your password",
          tree: "path to file",
          stat: "stats your file",
          exit: "close program",
        };

        console.log("\n📜 " + chalk.yellowBright.bold("List of Commands:\n"));
        for (const [cmd, desc] of Object.entries(commandList)) {
          console.log(
            `${chalk.cyanBright(cmd.padEnd(15))} ${chalk.greenBright(
              "→"
            )} ${chalk.whiteBright(desc)}`
          );
        }
        console.log("");

        workLoop();
        break;

      case "createFile":
        anton.info();
        rl.question("📄 Please enter file name: ", async (fileName) => {
          try {
            const filePath = path.join(road, fileName);
            await fs.writeFile(filePath, "");
            anton.info(`File created at ${filePath}`);
            anton.farewell();
          } catch (err) {
            anton.error();
          }
          workLoop();
        });
        break;

      case "createDirectory":
        anton.info();
        rl.question("📂 Please enter directory name: ", async (dirName) => {
          try {
            const dirPath = path.join(road, dirName);
            await fs.mkdir(dirPath, { recursive: true });
            anton.info(`Directory created at ${dirPath}`);
            anton.farewell();
          } catch (error) {
            console.error(error);
            anton.error();
          }
          workLoop();
        });
        break;

      case "copyFile":
        anton.info();
        rl.question("Enter source file path: ", (sourcePath) => {
          rl.question(
            "Enter destination file path: ",
            async (destinationPath) => {
              try {
                await fs.copyFile(sourcePath, destinationPath);
                anton.info(`File successfully copied to ${destinationPath}`);
                anton.farewell();
              } catch (error) {
                anton.error();
              }
              workLoop();
            }
          );
        });
        break;

      case "search":
        anton.info();
        rl.question("write the name / path of the file: ", (filePath) => {
          rl.question(
            "write the word that you need to find: ",
            async (wordToFind) => {
              try {
                const data = await fs.readFile(filePath, "utf8");
                const lines = data.split("\n");
                const found = lines.some((line) => line.includes(wordToFind));

                if (found) {
                  anton.info(`Word "${wordToFind}" found in: ${filePath}`);
                } else {
                  anton.info(`Word "${wordToFind}" not found in: ${filePath}`);
                }
              } catch (error) {
                anton.error();
              }
              workLoop();
            }
          );
        });
        break;

      case "write":
        anton.info();
        rl.question("write the path to the file: ", (filePath) => {
          rl.question(
            "write the information you want to write: ",
            async (content) => {
              try {
                await fs.writeFile(filePath, content, "utf8");
                anton.info(`All content written to file ${filePath}`);
                anton.farewell();
              } catch (error) {
                anton.error();
              }
              workLoop();
            }
          );
        });
        break;

      case "writeAppend":
        anton.info();
        rl.question("write the path to the file: ", (fileToPath) => {
          rl.question(
            "write the information you want to write: ",
            async (content) => {
              try {
                await fs.appendFile(fileToPath, content, "utf8");
                anton.info(
                  `The data was successfully added to the file: ${fileToPath}`
                );
                anton.farewell();
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
        anton.info();
        rl.question("Write file name (only .js): ", async (url) => {
          if (url.endsWith(".js")) {
            try {
              exec(`node ${url}`, (error, stdout) => {
                if (error) {
                  anton.error();
                  console.error(`Error: ${error.message}`);
                } else {
                  anton.info(`File "${url}" executed successfully`);
                  console.log(`Output:\n${stdout}`);
                  anton.info();
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
            anton.info("You can only launch .js files");
            workLoop();
          }
        });
        break;

      case "delete":
        anton.warning();
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
        anton.info();
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
        anton.info();
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
        anton.info();
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

      case "serverFile":
        anton.info();
        rl.question("Please write file name: ", async (path) => {
          try {
            await fs.appendFile(
              path,
              `const express = require('express');
                const app = express();
                const port = 3000;

                app.get('/', (req, res) => {
                  res.send('hello world!');
                });

                app.listen(port, () => { 
                  console.log('Server created on PORT', port);
                });`,
              "utf8"
            );
            if (anton.success) anton.success();
          } catch (error) {
            console.error("Error:", error);
            if (anton?.error) anton.error();
          }
          workLoop();
        });
        break;

      case "about":
        anton.greeting();
        console.log(
          "The file itself is a list of commands and a simulation AI that helps you.\n" +
            anton.greeting()
        );
        break;

      case "cd":
        anton.info();
        rl.question("Please cd to file or folder name: ", async (newPath) => {
          try {
            const stat = await fs.lstat(newPath);
            if (stat.isDirectory()) {
              road = newPath;
            } else {
              anton.error("Not a directory");
            }
          } catch {
            anton.error("Path does not exist");
          }
          workLoop();
        });
        break;

      case "admin":
        anton.warning();
        rl.question("Please write your password: ", async (pas) => {
          try {
            let boolAdmin = false;
            if ((pas = 123)) {
              console.log("Your Status is Admin");
              boolAdmin = true;
            }
          } catch (error) {
            console.error(error);
          }
          workLoop();
        });
        break;

      case "encrypt":
        anton.info();
        rl.question("Please write your password: ", async (password) => {
          try {
            const validation = (pas) => {
              const errors = [];
              const minLength = 12;

              if (!pas) return ["Password is empty"];
              if (pas.length < minLength) errors.push("Password is too short");
              if (!/[A-Z]/.test(pas))
                errors.push(
                  "Password must contain at least one uppercase letter"
                );
              if (!/[a-z]/.test(pas))
                errors.push(
                  "Password must contain at least one lowercase letter"
                );
              if (!/[0-9]/.test(pas))
                errors.push("Password must contain at least one digit");
              if (!/[!@#$%^&*(),.?":{}|<>]/.test(pas))
                errors.push(
                  "Password must contain at least one special character"
                );

              return errors.length
                ? errors
                : ["Password successfully validated!"];
            };

            const validationResult = validation(password);
            validationResult.forEach((msg) =>
              Anton.logMessage("ℹ️", chalk.yellowBright, msg)
            );

            if (
              validationResult.length === 1 &&
              validationResult[0] === "Password successfully validated!"
            ) {
              const hash = crypto
                .createHash("sha256")
                .update(password)
                .digest("hex");
              Anton.logMessage(
                "🔒",
                chalk.greenBright,
                `Encrypted password: ${hash}`
              );
            }
          } catch (error) {
            anton.error();
            console.error(error);
          }
          workLoop();
        });
        break;

      case "tree":
        anton.info();
        rl.question("write file name", async (path) => {
          try {
            const pathFile = path.join(__dirname, path);
            console.log(pathFile);
          } catch (error) {
            console.error(error);
          }
          workLoop();
        });
        break;

      case "stat":
        anton.info();
        rl.question("write your file name: ", async (fileName) => {
          try {
            const stats = await fs.stat(fileName);
            console.log("Is file:", stats.isFile());
            console.log("Is directory:", stats.isDirectory());
            console.log("File size:", stats.size, "bytes");
            console.log("Created at:", stats.birthtime);
            console.log("Last modified:", stats.mtime);
          } catch (error) {
            console.error(error);
          }
          workLoop();
        });
        break;

      case "exit":
        anton.farewell();
        rl.close();
        break;

      default:
        anton.error();
        workLoop();
    }
  });
};

workLoop();
