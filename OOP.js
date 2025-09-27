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
          this.#name = a;
          cl(`${a} this is your name`);
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
      rl.question("Write your password (numbers only): ", (a) => {
        const passNum = Number(a);
        if (!isNaN(passNum)) {
          this.#password = passNum;
          cl(`${passNum} this is your password`);
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
    const firstLatter = value[0].toUpperCase();
    const fromSecondLetter = value.slice(1).toLowerCase();
    this._userName = `${firstLatter}${fromSecondLetter}`;
  }
  get userName() {
    return this._userName;
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
