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
    }
  });
}
Timer();
