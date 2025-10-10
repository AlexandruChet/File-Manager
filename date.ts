const readline = require("node:readline");
const path = require("node:path");

const currentPath = process.cwd();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `${currentPath}> `,
});

function Timer() {
  rl.question("Please write one timer command: ", (a: any) => {
    const [cmd, ...args] = a.trim().split(" ");

    switch (cmd) {
      case "timer":
        rl.question("Seconds: ", (sec: any) => {
          rl.question("Minutes: ", (min: any) => {
            rl.question("Hours: ", (hour: any) => {
              try {
                let seconds = parseInt(sec) || 0;
                let minutes = parseInt(min) || 0;
                let hours = parseInt(hour) || 0;

                let total = seconds + minutes * 60 + hours * 3600;

                console.log(`⏳ Timer started for ${total} seconds!`);

                const interval = setInterval(() => {
                  if (total <= 0) {
                    clearInterval(interval);
                    console.log("✅ Time's up!");
                    Timer();
                  } else {
                    console.clear();
                    console.log(`⏰ Time left: ${total} seconds`);
                    total--;
                  }
                }, 1000);
              } catch (error) {
                console.error(error);
              }
              Timer();
            });
          });
        });
        break;
    }
  });
}

Timer();
