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
