const readline = require("node:readline");
const crypto = require("node:crypto");
const fs = require("node:fs");
const { randomUUID } = require("crypto");
const chalk = require("chalk");

const prompt = process.cwd();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `> ${prompt}`,
});

function cl(text, color = "white") {
  if (chalk[color]) {
    console.log(chalk[color](text));
  } else {
    console.log(text);
  }
}

class User {
  #name;
  #age;
  #password;
  #encryptedPassword;
  #createdDate;
  #boolPassword;
  #boolAge;
  #boolName;
  #id;
  #key;
  #iv;

  constructor(
    name = "",
    age = 0,
    password = "",
    encryptedPassword = "",
    boolPassword = false,
    boolAge = false,
    boolName = false,
    id = 0,
    key = "",
    iv = ""
  ) {
    this.#name = name;
    this.#age = age;
    this.#password = password;
    this.#encryptedPassword = encryptedPassword;
    this.#createdDate = new Date();
    this.#boolPassword = boolPassword;
    this.#boolAge = boolAge;
    this.#boolName = boolName;
    this.#id = id;
    (this.#key = key), (this.#iv = iv);
  }

  async getName() {
    while (true) {
      const name = await new Promise((resolve) =>
        rl.question("What's your name? ", resolve)
      );

      if (typeof name === "string" && name.trim()) {
        this.#name = name[0].toUpperCase() + name.slice(1).toLowerCase();
        cl(`Okay, got it. Your name is ${this.#name}`, "red");
        this.#boolName = true;
        break;
      }

      cl("Hmm, that doesn't seem right. Try again.", "red");
    }
  }

  async getAge() {
    while (true) {
      const a = await new Promise((resolve) =>
        rl.question("Write your age: ", resolve)
      );
      const ageNum = Number(a);
      if (!isNaN(ageNum) && ageNum > 0) {
        this.#age = ageNum;
        cl(`${ageNum} is your age`, "blue");
        this.#boolAge = true;
        break;
      }
      cl("Write a correct age", "red");
    }
  }

  async getPas() {
    while (true) {
      const a = await new Promise((resolve) =>
        rl.question("Write your password: ", resolve)
      );
      if (typeof a === "string" && a.trim() !== "") {
        this.#password = a;
        cl(`Password saved`, "yellow");
        this.#boolPassword = true;
        break;
      }
      cl("Write a correct password", "red");
    }
  }

  cipher() {
    const algorithm = "aes-256-cbc";
    if (!this.#password) return;

    this.#key = crypto.randomBytes(32);
    this.#iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, this.#key, this.#iv);

    let encrypted = cipher.update(this.#password, "utf-8", "hex");
    encrypted += cipher.final("hex");

    this.#encryptedPassword = encrypted;
    this.#password = null;
  }

  decipher() {
    const algorithm = "aes-256-cbc";
    if (!this.#encryptedPassword || !this.#key || !this.#iv) return;

    const decipher = crypto.createDecipheriv(algorithm, this.#key, this.#iv);
    let decrypted = decipher.update(this.#encryptedPassword, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
  }

  Info() {
    cl(
      `Name: ${this.#name}, Age: ${this.#age}, Encrypted Password: 
      ${this.#encryptedPassword}`
    );

    const content = this.check();
    cl(`Allowed content: ${content}`, "yellow");
  }

  check() {
    if (this.#age < 14) {
      return "child";
    } else if (this.#age < 18) {
      return "teenager";
    } else if (this.#age <= 100) {
      return "adult";
    } else {
      return "error";
    }
  }

  validation() {
    const pas = this.#password;
    const errors = [];
    const minLength = 12;

    if (!pas) return ["Password is empty"];

    if (pas.length < minLength) {
      errors.push("Password is too short");
    }
    if (!/[A-Z]/.test(pas)) {
      errors.push("Password must contain at least one uppercase letter");
    }
    if (!/[a-z]/.test(pas)) {
      errors.push("Password must contain at least one lowercase letter");
    }
    if (!/[0-9]/.test(pas)) {
      errors.push("Password must contain at least one digit");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pas)) {
      errors.push("Password must contain at least one special character");
    }

    return errors.length ? errors : ["Password successfully validated!"];
  }

  saveUserInFile() {
    const savedInfoUser = {
      name: this.#name,
      age: this.#age,
      encryptedPassword: this.#encryptedPassword,
      id: this.#id,
      createdDate: this.#createdDate.toLocaleString(),
    };

    const filePath = "userInformationSaved.json";

    let users = [];
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      if (data) {
        try {
          users = JSON.parse(data);
        } catch (err) {
          console.error("Error");
        }
      }
    }

    users.push(savedInfoUser);

    fs.writeFile(filePath, JSON.stringify(users, null, 3), (err) => {
      if (err) {
        console.error(`Error: ${err}`);
      } else {
        cl("This User Saved", "yellow");
        console.table(savedInfoUser);
      }
    });
  }

  createdDate() {
    if (this.#boolName && this.#boolAge && this.#boolPassword) {
      this.#createdDate = new Date();
      this.#id = randomUUID();

      const dateInfo = {
        "Created Date": this.#createdDate.toLocaleString(),
      };
      console.table(dateInfo);
    }
  }

  set userName(value) {
    const firstLatter = value[0].toUpperCase();
    const fromSecondLetter = value.slice(1).toLowerCase();
    this.#name = `${firstLatter}${fromSecondLetter}`;
  }

  get userName() {
    return this.#name;
  }
}

const asyncFunc = async () => {
  const user = new User();

  await user.getName();
  await user.getAge();
  await user.getPas();

  cl(user.validation().join("\n"));

  user.cipher();
  user.createdDate();
  user.Info();
  user.saveUserInFile();

  rl.close();
};

asyncFunc();
