var readline = require("node:readline");
var path = require("node:path");
var currentPath = process.cwd();
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "".concat(currentPath, "> "),
});
function Timer() {
  rl.question("Please write one timer command: ", function (a) {
    var _a = a.trim().split(" "),
      cmd = _a[0],
      args = _a.slice(1);
    switch (cmd) {
      case "timer":
        rl.question("Seconds: ", function (sec) {
          rl.question("Minutes: ", function (min) {
            rl.question("Hours: ", function (hour) {
              try {
                var seconds = parseInt(sec) || 0;
                var minutes = parseInt(min) || 0;
                var hours = parseInt(hour) || 0;
                var total_1 = seconds + minutes * 60 + hours * 3600;
                console.log(
                  "\u23F3 Timer started for ".concat(total_1, " seconds!")
                );
                var interval_1 = setInterval(function () {
                  if (total_1 <= 0) {
                    clearInterval(interval_1);
                    console.log("✅ Time's up!");
                    Timer();
                  } else {
                    console.clear();
                    console.log(
                      "\u23F0 Time left: ".concat(total_1, " seconds")
                    );
                    total_1--;
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
          function (start) {
            if (start.trim().toLowerCase() === "start") {
              var time_1 = 0;
              var isRunning_1 = true;
              console.log("⏱ Stopwatch started! Type 'stop' to stop.");
              var interval_2 = setInterval(function () {
                if (isRunning_1) {
                  time_1++;
                  console.clear();
                  console.log("\u23F1 Time: ".concat(time_1, " seconds"));
                }
              }, 1000);
              rl.question(
                "Type 'stop' to stop the stopwatch: ",
                function (stop) {
                  if (stop.trim().toLowerCase() === "stop") {
                    isRunning_1 = false;
                    clearInterval(interval_2);
                    console.log(
                      "\uD83D\uDED1 Stopwatch stopped at ".concat(
                        time_1,
                        " seconds."
                      )
                    );
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
