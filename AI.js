const fs = require("node:fs").promises;
const path = require("node:path");
const readline = require("node:readline");
const crypto = require("crypto");
const chalk = require("chalk");
const { exec } = require("child_process");
const { execSync } = require("node:child_process");
const { isUtf8 } = require("node:buffer");
const { pipeline } = require("node:stream");
const { promisify } = require("node:util");
const { createGzip } = require("node:zlib");

let road = process.cwd();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `${chalk.greenBright(road)}> `,
});

class Anton {
  static logMessage(type, colorFn, message, width = 60) {
    const lines = message.split("\n");
    const maxMessageLength = Math.max(...lines.map((line) => line.length));
    const finalWidth = Math.max(width, maxMessageLength + 4);

    const topLeft = "╭";
    const topRight = "╮";
    const bottomLeft = "╰";
    const bottomRight = "╯";
    const horizontal = "─";
    const vertical = "│";

    console.log(colorFn(topLeft + horizontal.repeat(finalWidth) + topRight));

    const header = type
      .padStart(Math.floor((finalWidth + type.length) / 2))
      .padEnd(finalWidth);
    console.log(colorFn.bgBlackBright.white(`${vertical}${header}${vertical}`));

    console.log(colorFn(vertical + horizontal.repeat(finalWidth) + vertical));

    lines.forEach((line) => {
      const paddedLine = line
        .padStart(Math.floor((finalWidth + line.length) / 2))
        .padEnd(finalWidth);
      console.log(colorFn(`${vertical}${paddedLine}${vertical}`));
    });

    console.log(
      colorFn(bottomLeft + horizontal.repeat(finalWidth) + bottomRight)
    );

    console.log(chalk.blackBright(" ".repeat(finalWidth + 2) + "▗"));
  }

  success() {
    const messages = [
      "Everything went smoothly. Keep up the great work! 🚀",
      "Task completed successfully. Well done! 🎯",
      "All systems go! You're on fire. 🔥",
    ];
    messages.forEach((msg) =>
      Anton.logMessage("[ SUCCESS ]", chalk.greenBright, msg)
    );
  }

  error() {
    const messages = [
      "Command failed! Check your input. ❌",
      "Oops! Something went wrong. ⚠️",
      "Error detected. Review your syntax. 🛑",
    ];
    messages.forEach((msg) =>
      Anton.logMessage("[ ERROR ]", chalk.redBright, msg)
    );
  }

  info() {
    const messages = [
      "Information mode activated. ℹ️",
      "Tip: Stay curious and explore new features.",
      "Reminder: small steps lead to big progress.",
    ];
    messages.forEach((msg) =>
      Anton.logMessage("[ INFO ]", chalk.blueBright, msg)
    );
  }

  warning() {
    const messages = [
      "Warning! Proceed with caution. ⚡",
      "Heads up! This may need your attention. 🚧",
      "Alert! Unexpected behavior possible. ⚠️",
    ];
    messages.forEach((msg) =>
      Anton.logMessage("[ WARNING ]", chalk.yellowBright, msg)
    );
  }

  greeting() {
    const messages = [
      "Hey there! I'm Anton, your friendly CLI assistant. 🤖",
      "Type 'help' to see available commands. 💡",
      "Ready to make your coding journey fun! 🚀",
    ];
    messages.forEach((msg) =>
      Anton.logMessage("[ GREETING ]", chalk.cyanBright, msg)
    );
  }

  farewell() {
    const messages = [
      "Goodbye! Keep coding and have fun! 🎉",
      "See you soon! Your coding companion is waiting. 🌟",
      "Remember: each line of code counts. 💡",
    ];
    messages.forEach((msg) =>
      Anton.logMessage("[ FAREWELL ]", chalk.magentaBright, msg)
    );
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
          copyAllInDirectory: "copy directory recursive",
          search: "searches for a word in files",
          searchFile: "searches your file",
          write: "overwrites the contents of the file",
          writeAppendFile: "written at the end of the file",
          readLines: "show a number of lines from a file",
          launch: "launch file",
          delete: "deleted file",
          deleteDir: "delete dir",
          show: "show file content",
          move: "move a file to another folder",
          ls: "list files and folders",
          rewrite: "rewrite the name",
          serverFile: "automatically starts a server on Node.js",
          basicServer: "Basic server on node js",
          about:
            "the file itself is a list of commands and a simulation AI that helps you",
          cd: "change directory",
          admin: "attempt to obtain admin status",
          encrypt: "encrypt your password",
          tree: "path to file",
          stat: "stats your file",
          rPas: "random password",
          clear: "clear console",
          time: "time Date",
          open: "open your file in vs code or another program",
          fileWeight: "show file weight",
          compress: "compress file",
          renameExt: "renaming ext file",
          git: "push new update",
          exit: "close program",
        };

        const width = 80;
        const horizontalLine = "═".repeat(width);

        console.log(chalk.magentaBright(`\n╔${horizontalLine}╗`));
        console.log(
          chalk.magentaBright(
            `║${" Anton CLI - Commands "
              .padStart((width + 22) / 2)
              .padEnd(width)}║`
          )
        );
        console.log(chalk.magentaBright(`╠${horizontalLine}╣`));

        for (const [cmd, desc] of Object.entries(commandList)) {
          const line = `${chalk.cyanBright(cmd.padEnd(20))} ${chalk.greenBright(
            "→"
          )} ${chalk.whiteBright(desc)}`;
          console.log(chalk.magentaBright(`║ ${line.padEnd(width - 2)}║`));
        }

        console.log(chalk.magentaBright(`╚${horizontalLine}╝\n`));

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

      case "copyAllInDirectory":
        anton.info();
        rl.question(
          "write your original folder road to you need copy: ",
          (folder) => {
            rl.question("write your new folder road: ", async (destination) => {
              try {
                const copyFolderRecursive = async (original, dest) => {
                  await fs.mkdir(dest, { recursive: true });
                  const elements = await fs.readdir(original, {
                    withFileTypes: true,
                  });

                  for (const e of elements) {
                    const folderPath = path.join(original, e.name);
                    const destPath = path.join(dest, e.name);

                    if (e.isDirectory()) {
                      await copyFolderRecursive(folderPath, destPath);
                    } else if (e.isFile()) {
                      await fs.copyFile(folderPath, destPath);
                    }
                  }
                };

                await copyFolderRecursive(folder, destination);
                anton.success();
              } catch (error) {
                anton.error();
                console.error(error);
              }
              workLoop();
            });
          }
        );
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

      case "searchFile":
        rl.question("Please write folder name to search in: ", (folder) => {
          rl.question("Enter extension (like .js): ", async (ext) => {
            try {
              const files = await fs.readdir(folder);
              const filteredFiles = files.filter((file) => file.endsWith(ext));

              anton.success();
              console.log(filteredFiles);
            } catch (error) {
              console.error(error);
            }
            workLoop();
          });
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

      case "writeAppendFile":
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

      case "readLines":
        anton.info("Read specific number of lines from file");
        rl.question("Enter file path: ", (filePath) => {
          rl.question(
            "How many lines to read? (press Enter for all): ",
            async (count) => {
              try {
                const data = await fs.readFile(filePath, "utf-8");
                const lines = data.split("\n");
                const numberOfLines = lines.length;

                console.log(`📄 Total lines in file: ${numberOfLines}`);

                if (count && !isNaN(count)) {
                  const limit = Math.min(Number(count), numberOfLines);
                  console.log(`\n🧾 Showing first ${limit} lines:\n`);
                  console.log(lines.slice(0, limit).join("\n"));
                } else {
                  console.log("\n🧾 File content:\n");
                  console.log(data);
                }

                anton.success("✅ Reading completed successfully!");
              } catch (error) {
                anton.error("❌ Failed to read file");
                console.error(error.message);
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

      case "deleteDir":
        rl.question(
          "Please write your folder to delete name(road): ",
          async (path) => {
            try {
              await fs.rm(path, { recursive: true });
              console.log("Folder deleted");
              anton.success();
            } catch (error) {
              console.error(error);
              anton.error();
            }
            workLoop();
          }
        );
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

      case "move":
        anton.info();
        rl.question("Enter path to source file/folder: ", (source) => {
          rl.question("Enter new destination path: ", async (destination) => {
            try {
              await fs.access(source);

              const destDir = path.dirname(destination);
              await fs.mkdir(destDir, { recursive: true });

              await fs.rename(source, destination);

              anton.success(
                `✅ Moved successfully:\nFrom: ${source}\nTo:   ${destination}`
              );
            } catch (error) {
              anton.error();
              console.log("❌ Failed to move file or directory");
              console.error(error.message);
            }
            workLoop();
          });
        });
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

      case "basicServer":
        anton.info();
        rl.question("Write your file name: ", (fileNamePath) => {
          rl.question(
            "Write your static folder name: ",
            async (staticFolder) => {
              try {
                await fs.promises.writeFile(
                  fileNamePath,
                  `
const http = require("node:http");
const path = require("node:path");
const fs = require("node:fs");

const PORT = 8000;

const STATIC_PATH = path.join(process.cwd(), "./${staticFolder}");

const MIME_TYPES = {
  html: "text/html; charset=UTF-8",
  css: "text/css",
  js: "text/javascript",
  json: "application/json",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  svg: "image/svg+xml",
  default: "text/plain",
};

const prepareFile = async (url) => {
  const paths = [STATIC_PATH, url];
  if (url.endsWith("/")) paths.push("index.html");
  const filePath = path.join(...paths);

  const pathTraversal = !filePath.startsWith(STATIC_PATH);
  const exists = await fs.promises.access(filePath)
    .then(() => true)
    .catch(() => false);

  const found = !pathTraversal && exists;
  const streamPath = found ? filePath : path.join(STATIC_PATH, "404.html");
  const ext = path.extname(streamPath).substring(1).toLowerCase();
  const stream = fs.createReadStream(streamPath);

  return { found, ext, stream };
};

http.createServer(async (req, res) => {
  const file = await prepareFile(req.url);
  const statusCode = file.found ? 200 : 404;
  const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;

  res.writeHead(statusCode, { "Content-Type": mimeType });
  file.stream.pipe(res);

  console.log(\`\${req.method} \${req.url} \${statusCode}\`);
}).listen(PORT);

console.log(\`Server running at http://127.0.0.1:\${PORT}\`);
          `
                );
                anton.success();
              } catch (error) {
                anton.error();
                console.error(error);
              }
              workLoop();
            }
          );
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
            if (pas === "123") {
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

      case "rPas":
        const randomPasswordLoop = (length) => {
          const symbols =
            "QqWwEeRrTtYyUuIiOoPpAaSsDdFfGgHhJjKkLlZzXxCcVvBbNnMm1234567890!@#$%^&*()_+|=-";
          let randomPassword = "";

          for (let i = 0; i < length; i++) {
            randomPassword += symbols[crypto.randomInt(symbols.length)];
          }

          return randomPassword;
        };

        const password = randomPasswordLoop(12);
        console.log(chalk.greenBright(`🔐 Your random password: ${password}`));
        workLoop();
        break;

      case "clear":
        console.clear();
        anton.info();
        workLoop();
        break;

      case "time":
        anton.info();

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
        workLoop();
        break;

      case "open":
        anton.info();
        rl.question("Write your file name: ", async (file) => {
          try {
            const filePath = path.isAbsolute(file)
              ? file
              : path.join(road, file);

            exec(`start "" "${filePath}"`, (error) => {
              if (error) {
                anton.error();
                console.error(`❌ Error opening file: ${error.message}`);
              } else {
                anton.success();
                console.log(
                  chalk.greenBright(`✅ File "${file}" opened successfully.`)
                );
              }
              workLoop();
            });
          } catch (error) {
            anton.error();
            console.error(error);
            workLoop();
          }
        });
        break;

      case "move":
        anton.info();
        rl.question("Enter source path: ", (src) => {
          rl.question("Enter destination path: ", async (destination) => {
            try {
              const sourcePath = path.isAbsolute(src)
                ? src
                : path.join(road, src);
              const destinationPath = path.isAbsolute(destination)
                ? destination
                : path.join(road, destination);

              await fs.rename(sourcePath, destinationPath);

              anton.success();
              console.log(
                chalk.greenBright(
                  `📦 Moved: ${sourcePath} → ${destinationPath}`
                )
              );
            } catch (error) {
              anton.error();
              console.error(chalk.redBright(`❌ ${error.message}`));
            }

            workLoop();
          });
        });
        break;

      case "fileWeight":
        anton.info();
        rl.question(
          "Enter file or folder name (path): ",
          async (fileTarget) => {
            try {
              const targetPath = path.isAbsolute(fileTarget)
                ? fileTarget
                : path.join(road, fileTarget);

              const getSize = async (e) => {
                const stats = await fs.stat(e);

                if (stats.isFile()) {
                  return stats.size;
                } else if (stats.isDirectory()) {
                  const files = await fs.readdir(e);
                  const sizes = await Promise.all(
                    files.map(async (file) => getSize(path.join(e, file)))
                  );
                  return sizes.reduce((a, b) => a + b, 0);
                }
                return 0;
              };

              const totalSize = await getSize(targetPath);
              anton.success();

              const formatSize = (bytes) => {
                const units = ["B", "KB", "MB", "GB", "TB"];
                let size = bytes;
                let unitIndex = 0;

                while (size >= 1024 && unitIndex < units.length - 1) {
                  size /= 1024;
                  unitIndex++;
                }

                return `${size.toFixed(2)} ${units[unitIndex]}`;
              };

              console.log(
                chalk.greenBright(
                  `📦 Total size of "${fileTarget}": ${formatSize(totalSize)}`
                )
              );
            } catch (error) {
              anton.error();
              console.error(chalk.redBright(`❌ ${error.message}`));
            }

            workLoop();
          }
        );
        break;

      case "compress":
        anton.info();
        rl.question("write road to file: ", (road) => {
          rl.question("write your compressed file", async (folder) => {
            try {
              const compress = async (toCompress, afterCompress) => {
                const gzip = createGzip();

                const source = createReadStream(toCompress);
                const destination = createWriteStream(afterCompress);

                await pipe(source, gzip, destination);

                if (!compressedPath.endsWith(".gz")) {
                  compressedPath += ".gz";
                }

                console.log(
                  `✅ File "${toCompress}" compressed into "${afterCompress}"`
                );
              };
              compress(road, folder);
            } catch (error) {
              anton.error();
              console.error(error);
            }
            workLoop();
          });
        });
        break;

      case "renameExt":
        rl.question("Write your file name (with extension): ", (fileName) => {
          rl.question(
            "Write your new extension (for example: .js or js): ",
            async (newExt) => {
              try {
                if (!newExt.startsWith(".")) newExt = "." + newExt;

                const baseName = path.basename(
                  fileName,
                  path.extname(fileName)
                );
                const dirName = path.dirname(fileName);

                const newFilePath = path.join(dirName, baseName + newExt);
                await fs.promises.access(fileName);

                await fs.promises.rename(fileName, newFilePath);
                anton.success();
                console.log(`File renamed: ${fileName} → ${newFilePath}`);
              } catch (error) {
                anton.error();
                console.error(error);
              }
              workLoop();
            }
          );
        });
        break;

      case "git":
        anton.info();
        rl.question("Write a commit message: ", (commit) => {
          rl.question(
            'Type "push" (for default) or "push main" (to push to main branch): ',
            async (push) => {
              try {
                if (!fs.existsSync(".git")) {
                  anton.error();
                  console.error("❌ This folder is not a Git repository.");
                  return workLoop();
                }

                console.log("🟡 Adding files...");
                execSync("git add .", { stdio: "inherit" });

                console.log("🟡 Committing...");
                execSync(`git commit -m "${commit}"`, { stdio: "inherit" });

                if (push === "push") {
                  console.log("🟢 Pushing to default branch...");
                  execSync("git push", { stdio: "inherit" });
                } else if (push === "push main" || push === "push to main") {
                  console.log("🟢 Pushing to origin/main...");
                  execSync("git push origin main", { stdio: "inherit" });
                } else {
                  anton.error();
                  console.error(
                    "❌ Unknown push option. Use 'push' or 'push main'."
                  );
                }

                anton.success();
                console.log("✅ Git update complete!");
              } catch (error) {
                anton.error();
                console.error("❌ Git error:", error.message);
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
        anton.error();
        workLoop();
    }
  });
};

workLoop();
