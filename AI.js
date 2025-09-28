const fs = require("node:fs").promises;
const { mkdir } = require("node:fs");
const path = require("node:path");
const readline = require("node:readline");

let road = process.cwd();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `${road}`,
});

class Anton {
  basicText() {
    console.log(
      "✅ Your command was successful! 🎉\n👉 You can type another command or exit with 'exit'. 🚪"
    );
  }

  errorText() {
    console.log(
      "⚠️ Oops! Unknown command... 🤔\n💡 Type 'help' 📖 to see available commands.\n✍️ Please try again!"
    );
  }

  greeting() {
    console.log(
      "👋 Hello, I'm Anton — your friendly CLI assistant! 🤖\n✨ Let's make something awesome together!"
    );
  }

  farewell() {
    console.log(
      "👋 Goodbye! Thanks for using me. 🌟\n💻 Keep coding and see you next time! 🚀"
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
        workLoop();
        break;

      case "create":
        if (!args[0]) {
          console.log("Error");
          break;
        }

        rl.question("please write your file name: ", async (fileName) => {
          try {
            const filePath = path.join(road, fileName);
            await fs.writeFile(filePath, "");
            console.log(`File created: ${filePath}`);
            anton.basicText();
          } catch (err) {
            console.error("Error creating file:", err);
          }
          workLoop();
        });
        break;

      case "createDirectory":
        if (!args[0]) {
          console.log("Error");
          break;
        }

        rl.question("Please write your directory name: ", async (dirName) => {
          try {
            const dirPath = path.join(road, dirName);
            await fs.mkdir(dirPath, { recursive: true });
            console.log(`📂 Directory created: ${dirPath}`);
            anton.basicText();
          } catch (err) {
            console.error("❌ Error creating directory:", err.message);
          }
          workLoop();
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
