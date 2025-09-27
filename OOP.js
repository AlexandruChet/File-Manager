const readline = require("node:readline");
const crypto = require("node:crypto");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function cl(text) {
  console.log(text);
}

class User {
  #name;
  #age;
  #password;
  #encryptedPassword;

  constructor(name = "", age = 0, password = "") {
    this.#name = name;
    this.#age = age;
    this.#password = password;
    this.#encryptedPassword = this.#encryptedPassword;
  }

  getName() {
    return new Promise((resolve) => {
      rl.question("Write your name: ", (a) => {
        if (typeof a === "string" && a.trim() !== "") {
          this.#name = a[0].toUpperCase() + a.slice(1).toLowerCase();
          cl(`${this.#name} this is your name`);
        } else {
          cl("Write a correct name");
        }
        resolve();
      });
    });
  }

  getAge() {
    return new Promise((resolve) => {
      rl.question("Write your age: ", (a) => {
        const ageNum = Number(a);
        if (!isNaN(ageNum) && ageNum > 0) {
          this.#age = ageNum;
          cl(`${ageNum} is your age`);
        } else {
          cl("Write a correct age");
        }
        resolve();
      });
    });
  }

  getPas() {
    return new Promise((resolve) => {
      rl.question("Write your password: ", (a) => {
        if (typeof a === "string" && a.trim() !== "") {
          this.#password = a;
          cl(`Password saved`);
        } else {
          cl("Write a correct password");
        }
        resolve();
      });
    });
  }

  cipher() {
    const algorithm = "aes-256-cbc";
    const key = crypto.randomBytes(32);
    if (!this.#password) return;

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(this.#password, "utf-8", "hex");
    encrypted += cipher.final("hex");

    this.#encryptedPassword = encrypted;
    this.#password = null;
  }

  Info() {
    cl(
      `Name: ${this.#name}, Age: ${this.#age}, Encrypted Password: 
      ${this.#encryptedPassword}`
    );

    const content = this.check();
    cl(`Allowed content: ${content.join(", ")}`);
  }

  check() {
    if (this.#age > 14) {
      return ["kinds", "content"];
    } else {
      return ["adult", "content"];
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

  user.cipher();

  user.Info();

  rl.close();
};

asyncFunc();
