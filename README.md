# 🗂️ File Manager CLI

A simple **Node.js** file manager for working with files and directories from the console.

---

## 🚀 Installation & Run

1. Install [Node.js](https://nodejs.org/).
2. Clone the repository or copy the file with the code.
3. Run in terminal:

```bash
node index.js
index.js – the name of your file with the code.

📌 Commands
Command Description
help Show the list of available commands
create file.name Create an empty file
create_dir dir.name Create a directory
write_end file.name text Append text to a file
show file.name Display the content of a file
ls List files and folders in the current directory
cd dir.name Change directory
rm file_or_dir.name Delete a file or folder (recursive)
exit Exit the program

📖 Examples
Create a file
bash
Copy
Edit
> create notes.txt
✅ File created
Create a folder
bash
Copy
Edit
> create_dir projects
📁 Directory created
Write to a file
bash
Copy
Edit
> write_end notes.txt Hello world!
✏️ Text appended
Show file content
bash
Copy
Edit
> show notes.txt
Hello world!
List files and folders
bash
Copy
Edit
> ls
notes.txt
projects
Change directory
bash
Copy
Edit
> cd projects
Delete a file or folder
bash
Copy
Edit
> rm notes.txt
🗑️ Deleted
⚠️ Notes
The rm command works recursively, so be careful — entire folders with files can be deleted.

Use cd .. to move up one directory level.

🏗️ Technologies
Node.js

Built-in modules: fs, path, readline

## 📘 calculator on Node.js

### 🔹 Description

This code implements a simple **console calculator** on Node.js using the `readline` module.
The program allows the user to:

1. Enter two numbers.
2. Choose an arithmetic operation (`+`, `-`, `*`, `/`, `^`).
3. Get the result in the console.

---

### 🔹 Modules used

* **`readline`** — a built-in Node.js module for working with input/output in the terminal.
* **`console.log` (wrapped in `cl`)** — is used to output the result.

---

### 🔹 Code structure

```js
const readline = require("node:readline");
```

Importing the `readline` module.

```js
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
prompt: "> ",
});
```

An interface is created for interacting with the user via the console.

```js
function cl(name) {
console.log(name);
}
```

A wrapper function for output to the console (analog of `console.log`).

---

### 🔹 Program logic

1. The program starts with a question:

```js
rl.question("Write first num: ", (first) => { ... })
```

The user enters the first number.

2. After that, the program asks for the second number:

```js
rl.question("Write second num: ", (second) => { ... })
```

The value is converted to `Number(second)`.

3. Next, the user enters the command (operation):

```js
rl.question("Write command (+ - * / ^ (exponentiation)): ", (command) => { ... })
```

4. `switch` is executed:

* `+` → addition
* `-` → subtraction
* `*` → multiplication
* `/` → division (with division by zero check)
* `^` → exponentiation (`**`)
* `default` → if the command is unknown

5. The result of the calculation is displayed in the console:

```js
cl(`Result: ${result}`);
rl.close();
```

---

### 🔹 Work examples

#### Case 1: addition

```
Write first num: 10
Write second num: 5
Write command (+ - * / ^ (exponentiation)): +
Result: 15
```

#### Case 2: exponent

```
Write first num: 2
Write second num: 3
Write command (+ - * / ^ (exponentiation)): ^
Result: 8
```

#### Case 3: division by zero

```
Write first num: 7
Write second num: 0
Write command (+ - * / ^ (exponentiation)): /
Result: Error: division zero
```

## 📘 "Speed ​​Typing Game" on Node.js

### 🔹 Description

This program tests how fast the user can type a random text.

The user:

1. Gets a random string.
2. Presses `Enter` to start the timer.
3. Must type the string without errors.
4. The program calculates the typing time and reports whether the text is correct.
5. The entered text is saved to the `text.txt` file.

---

### 🔹 Modules used

* **`fs`** — working with the file system (saving text to a file).
* **`readline`** — interacting with the user via the console.
* **`path`** — used to work with paths (this code only uses `process.cwd()` for the current directory).

---

### 🔹 Code structure

```js
const fs = require("node:fs");
const readline = require("node:readline");
const path = require("node:path");
```

Importing the required modules.

```js
function cl(name) {
console.log(name);
}
```

Convenience wrapper, similar to `console.log`.

```js
const currentPath = process.cwd();
```

Gets the current working directory to display it in the console.

```js
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
prompt: `> ${currentPath} `,
});
```

Creating an interface for working with the console.

---

### 🔹 Texts for printing

```js
const list = {
first: `Fat son how smiling mrs natural expense anxious friends.`,
second: `Same an quit most an. Admitting an mr disposing sportsmen.`,
third: `Must you with him from him her were more.`,
fourth: `Oh he decisively impression attachment friendship so if everything.`,
fifth: `Ever man are put down his very. And marry may table him avoid.`,
};
```

Collection of texts, one of which will be chosen randomly.

```js
const keys = Object.keys(list);
const randomKey = keys[Math.floor(Math.random() * keys.length)];
const randomValue = list[randomKey];
```

Random selection of one line for the game.

---

### 🔹 Start the game

```js
cl("now you will need to type fast");
cl(`Your text:\n${randomValue}`);
cl("press enter to begin");
```

The user sees the text and prepares to type it.

```js
let startTime;
```

The timer will start after the first press of Enter.

---

### 🔹 Basic logic

```js
rl.on("line", (input) => {
if (!startTime) {
startTime = Date.now();
cl("timer started! Type the text now.");
rl.prompt();
return;
}
```

* If the timer is not started yet → pressing `Enter` starts the countdown.
* Then the user enters the text.

---

### 🔹 Input validation

```js
const endTime = Date.now();
const timeTaken = ((endTime - startTime) / 1000).toFixed(2);

if (input.trim() === randomValue.trim()) {
cl(`Your text is correct! Time taken: ${timeTaken} seconds`);
} else {
cl(`Your text is incorrect! Time taken: ${timeTaken} seconds`);
}
```

* The time in seconds is calculated.
* The correctness is checked entered text.

---

### 🔹 Saving to file

```js
fs.writeFile("text.txt", input.trim(), (err) => {
if (err) {
console.error("Error writing file:", err);
} else {
cl("Your text has been saved to text.txt");
}
});
```

The entered text is saved to the `text.txt` file in the current directory.

---

### 🔹 Closing

```js
rl.close();
```

After the game is finished, the program closes the interface.

---

## ✅ Example of work

```
now you will need to type fast
Your text:
Same an quit most an. Admitting an mr disposing sportsmen.
press enter to begin
>
timer started! Type the text now.
> Same an quit most an. Admitting an mr disposing sportsmen.
Your text is correct! Time taken: 8.35 seconds
Your text has been saved to text.txt
```

# Express.js Simple Website

This project is a simple server on **Node.js** using **Express.js** that serves HTML pages (with Bootstrap) and handles `404 Not Found` errors.

---

## 🚀 Starting the project

1. Clone or copy this repository.
2. Install dependencies (if Express is not already installed):
```bash
npm install express
````

3. Start the server:

```bash
node express.js
```

or, if you are using nodemon:

```bash
npx nodemon index.js
```
4. Open in browser:

```
http://localhost:3000
```

---

## 📂 Routes

### `/`

Displays a simple HTML page saying **Hello, world!**.

### `/header`

Displays an HTML page with **Bootstrap navigation** (a header with a menu and a *Sign Up* button).

### `/*` (any other path)

Displays a **404 page** with the message:

```
Oops! The page you are looking for does not exist.
```

and a button to return to the main page.

---

## 🛠 Technologies used

* [Node.js](https://nodejs.org/) — a JavaScript runtime.
* [Express.js](https://expressjs.com/) — a minimalist web framework for Node.js.
* [Bootstrap 5](https://getbootstrap.com/) — for fast page layout and styling.

---

## 📸 Example pages

### Home (`/`)

* Displays "Hello, world!"

### Header (`/header`)

* Contains a menu with links: Home, About, Services, Contact and a Sign Up button.

### 404

* Big numbers `404`
* Text: *Oops! The page you are looking for does not exist.*
* **Go Home** button

---

## 📌 Notes

* The server runs on port **3000**.
* Bootstrap CDN is used for styles.
* All HTML pages are stored in variables in the code (`htmlContent`, `htmlHeader`, `error404html`).

# 🖥 Anton CLI — your console assistant

This project is an interactive CLI (Command Line Interface) on **Node.js**, which simulates an "artificial intelligence" named **Anton** 🤖.
It allows you to work with files, folders, run JS files, search, encrypt passwords and even create a server on Express.

---

## 🚀 Launch the project

1. Clone or copy the repository.
2. Install the necessary packages:
```bash
npm install chalk
````

(other modules — `fs`, `path`, `crypto`, `readline` — are built into Node.js).
3. Run the script:

```bash
node anton.js
```

---

## 🤖 Greetings

When launched, Anton will show a friendly message:

```
👋 Hey there! I'm Anton, your friendly CLI assistant 🤖
```

---

## 📜 Command list

### 🔑 Basic

* **help** — shows a list of commands
* **exit** — exits the program

### 📄 Working with files

* **createFile** — creates a file
* **createDirectory** — creates a folder
* **copyFile** — copies a file
* **delete** — deletes a file
* **rewrite** — renames a file
* **show** — shows the contents of a file
* **ls** — shows a list of files in a folder
* **stat** — shows information about a file (size, dates, whether it is a file/folder)

### ✍️ Writing to files

* **write** — overwrites the contents of a file
* **writeAppend** — appends text to the end of a file

### 🔍 Search

* **search** — searches for a word in a file

### ⚡ Execution

* **launch** — launches a `.js` file via Node.js
* **serverFile** — adds code for a simple Express server to the file

### 📂 Navigation

* **cd** — changes the working directory
* **tree** — shows the absolute path to the file

### 🔐 Security

* **encrypt** — checks the password and its SHA-256 hash
* **admin** — attempts to obtain administrator status (demo function, password: `123`)

### ℹ️ Additional

* **about** — information about the program

---

## 🎨 Features

* **chalk** is used for color formatting of messages.
* Anton has "emotional" responses (success, error, warning).
* There is a basic password check (length, upper/lower case, numbers, special characters).
* The **serverFile** command allows you to quickly create a file with a ready-made Node.js server.

---

## 📌 Usage example

```
$ node anton.js
/home/user> Hello please write your command: help

📜 List of Commands:

help → shows all commands
createFile → creates a file
createDirectory → creates a folder
copyFile → copy file
search → searches for a word in files
write → overwrites the contents of the file
writeAppend → written at the end of the file
launch → launch file
delete → deleted file
show → show file content
ls → list files and folders
rewrite → rewrite the name
serverFile → automatically starts a server on Node.js
about → the file itself is a list of commands and a simulation AI that helps you
cd → change directory
admin → attempt to obtain admin status
encrypt → encrypt your password
tree → path to file
stat → stats your file
exit → close program
```