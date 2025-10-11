"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_readline_1 = require("node:readline");
var chalk_1 = require("chalk");
var currentPath = process.cwd();
var rl = node_readline_1.default.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: chalk_1.default.cyan.bold("".concat(currentPath, "> ")),
});
function Timer() {
  rl.question(
    chalk_1.default.yellow("🕹 Please write one command (timer / stopwatch): "),
    function (a) {
      var _a = a.trim().split(" "),
        cmd = _a[0],
        args = _a.slice(1);
      switch (cmd.toLowerCase()) {
        case "timer":
          rl.question(chalk_1.default.green("⏱ Seconds: "), function (sec) {
            rl.question(chalk_1.default.green("⏱ Minutes: "), function (min) {
              rl.question(chalk_1.default.green("⏱ Hours: "), function (hour) {
                try {
                  var seconds = parseInt(sec) || 0;
                  var minutes = parseInt(min) || 0;
                  var hours = parseInt(hour) || 0;
                  var total_1 = seconds + minutes * 60 + hours * 3600;
                  console.log(
                    chalk_1.default.blueBright(
                      "\u23F3 Timer started for ".concat(
                        chalk_1.default.bold(total_1),
                        " seconds!"
                      )
                    )
                  );
                  var interval_1 = setInterval(function () {
                    if (total_1 <= 0) {
                      clearInterval(interval_1);
                      console.log(
                        chalk_1.default.greenBright.bold("✅ Time's up!")
                      );
                      Timer();
                    } else {
                      console.clear();
                      console.log(
                        chalk_1.default.cyanBright(
                          "\u23F0 Time left: ".concat(
                            chalk_1.default.yellowBright.bold(total_1),
                            " seconds"
                          )
                        )
                      );
                      total_1--;
                    }
                  }, 1000);
                } catch (error) {
                  console.error(chalk_1.default.redBright("❌ Error:"), error);
                }
              });
            });
          });
          break;
        case "stopwatch":
          rl.question(
            chalk_1.default.green("▶️  Type 'start' to begin the stopwatch: "),
            function (start) {
              if (start.trim().toLowerCase() === "start") {
                var time_1 = 0;
                var isRunning_1 = true;
                console.log(
                  chalk_1.default.blueBright(
                    "⏱ Stopwatch started! Type 'stop' to stop."
                  )
                );
                var interval_2 = setInterval(function () {
                  if (isRunning_1) {
                    time_1++;
                    console.clear();
                    console.log(
                      chalk_1.default.magentaBright(
                        "\u23F1 Time: ".concat(
                          chalk_1.default.bold(time_1),
                          " seconds"
                        )
                      )
                    );
                  }
                }, 1000);
                rl.question(
                  chalk_1.default.yellow(
                    "⛔ Type 'stop' to stop the stopwatch: "
                  ),
                  function (stop) {
                    if (stop.trim().toLowerCase() === "stop") {
                      isRunning_1 = false;
                      clearInterval(interval_2);
                      console.log(
                        chalk_1.default.redBright(
                          "\uD83D\uDED1 Stopwatch stopped at ".concat(
                            chalk_1.default.bold(time_1),
                            " seconds."
                          )
                        )
                      );
                      Timer();
                    }
                  }
                );
              } else {
                console.log(
                  chalk_1.default.red(
                    "❌ You must type 'start' to begin the stopwatch."
                  )
                );
                Timer();
              }
            }
          );
          break;
        default:
          console.log(
            chalk_1.default.redBright(
              "❓ Unknown command. Try 'timer' or 'stopwatch'."
            )
          );
          Timer();
      }
    }
  );
}
console.clear();
console.log(chalk_1.default.bold.cyanBright("🕒 Welcome to Time CLI!"));
console.log(chalk_1.default.dim("Commands available: timer, stopwatch"));
Timer();
