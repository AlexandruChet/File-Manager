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