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
        anton.basic();
        workLoop();
        break;

      case "createFile":
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
                anton.basic();
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

      case "serverFile":
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
        console.log(
          "The file itself is a list of commands and a simulation AI that helps you.\n" +
            anton.greeting()
        );
        break;

      case "cd":
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
        rl.question("Please write your password: ", (password) => {
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

            const encrypt = (pas) => {
              const algorithm = "aes-256-cbc";
              const key = crypto.randomBytes(32);
              const iv = crypto.randomBytes(16);

              const cipher = crypto.createCipheriv(algorithm, key, iv);
              let encrypted = cipher.update(pas, "utf-8", "hex");
              encrypted += cipher.final("hex");

              console.log(chalk.greenBright("Encrypted password:"), encrypted);
              console.log(
                chalk.blueBright("Key (keep it safe!):"),
                key.toString("hex")
              );
              console.log(
                chalk.blueBright("IV (keep it safe!):"),
                iv.toString("hex")
              );
            };

            const errors = validation(password);
            console.log(errors.join("\n"));
            if (errors[0] === "Password successfully validated!") {
              encrypt(password);
            }
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
