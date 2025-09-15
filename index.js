const fs = require("node:fs");
const path = require("node:path");
const readline = require("node:readline");

let road = process.cwd();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showPrompt() {
  rl.setPrompt(`${road}> `);
  rl.prompt();
}

function fileManager() {
  rl.question(`${road}> Enter a command: `, (answer) => {
    const [cmd, ...args] = answer.trim().split(" ");

    switch (cmd) {
      case "help":
        console.log(`
                    Available commands:
                    create file.name         -> create an empty file
                    create_dir dir.name      -> create a directory
                    write_end file.name text -> append text to file
                    show file.name           -> display file content
                    ls                       -> list files and folders
                    cd dir.name              -> change directory
                    rm file_or_dir.name      -> delete file or folder
                    exit                     -> close program
                `);
        break;

      case "create":
        if (!args[0]) {
          console.log("Error");
          break;
        }
        fs.writeFile(path.join(road, args[0]), "", (err) => {
          if (err) return console.error("Error", err);
          console.log("✅ File created");
        });
        break;

      case "create_dir":
        if (!args[0]) {
          console.log("Error");
          break;
        }
        fs.mkdir(path.join(road, args[0]), { recursive: true }, (err) => {
          if (err) return console.error("Error", err);
          console.log("📁 Directory created");
        });
        break;

      case "ls":
        fs.readdir(road, (err, files) => {
          if (err) return console.error("Error", err);
          console.log(files.join("\n") || "(empty)");
        });
        break;

      case "rm":
        if (!args[0]) {
          console.log("Error");
          break;
        }
        fs.rm(
          path.join(road, args[0]),
          { recursive: true, force: true },
          (err) => {
            if (err) return console.error("Error", err);
            console.log("🗑️ Deleted");
          }
        );
        break;

      case "write_end":
        if (args.length < 2) {
          console.log("Error");
          break;
        }
        fs.appendFile(
          path.join(road, args[0]),
          args.slice(1).join(" "),
          (err) => {
            if (err) return console.error("Error", err);
            console.log("✏️ Text appended");
          }
        );
        break;

      case "cd":
        if (!args[0]) {
          console.log("Error");
          break;
        }
        const newPath = path.resolve(road, args[0]);
        if (fs.existsSync(newPath) && fs.lstatSync(newPath).isDirectory()) {
          road = newPath;
        } else {
          console.log("Error");
        }
        break;

      case "show":
        if (!args[0]) {
          console.log("Error");
          break;
        }
        fs.readFile(path.join(road, args[0]), "utf8", (err, data) => {
          if (err) return console.error("Erro", err);
          console.log(data || "(empty file)");
        });
        break;

      case "exit":
        rl.close();
        return;

      default:
        console.log("Unknown command.");
    }

    showPrompt();
    fileManager();
  });
}

showPrompt();
fileManager();