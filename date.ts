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

      case "stopwatch":
        rl.question(
          "Start the stopwatch with the 'start' command: ",
          (start: string) => {
            if (start.trim().toLowerCase() === "start") {
              let time: number = 0;
              let isRunning = true;

              console.log("⏱ Stopwatch started! Type 'stop' to stop.");

              const interval: NodeJS.Timeout = setInterval(() => {
                if (isRunning) {
                  time++;
                  console.clear();
                  console.log(`⏱ Time: ${time} seconds`);
                }
              }, 1000);

              rl.question(
                "Type 'stop' to stop the stopwatch: ",
                (stop: string) => {
                  if (stop.trim().toLowerCase() === "stop") {
                    isRunning = false;
                    clearInterval(interval);
                    console.log(`🛑 Stopwatch stopped at ${time} seconds.`);
                    Timer();
                  }
                }
              );
            } else {
              console.log("❌ You must type 'start' to begin the stopwatch.");
              Timer();
            }
          }
        );
        break;

      default:
        console.log("Unknown command.");
        Timer();
    }
  });
}

Timer();
