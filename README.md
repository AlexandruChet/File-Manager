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