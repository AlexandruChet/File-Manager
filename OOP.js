const readline = require("node:readline");

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

  constructor(name = "", age = 0, password = "") {
    this.#name = name;
    this.#age = age;
    this.#password = password;
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

  Info() {
    cl(`Name: ${this.#name}, Age: ${this.#age}, Password: ${this.#password}`);
  }

  set userName(value) {
    this.#name = value[0].toUpperCase() + value.slice(1).toLowerCase();
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

  user.Info();

  rl.close();
};

asyncFunc();
