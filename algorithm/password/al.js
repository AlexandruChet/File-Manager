"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomString = randomString;
exports.hashPassword = hashPassword;
var crypto = require("node:crypto");
function randomString(len) {
  var chars =
    "QqWwEeRrTtYyUuIiOoPpAaSsDdFfGgHhJjKkLlZzXxCcVvBbNnMm!@#$%^&*()_+1234567890";
  var result = "";
  for (var i = 0; i < len; i++) {
    result += chars[crypto.randomInt(chars.length)];
  }
  return result;
}
function hashPassword(password, saltLength) {
  if (saltLength === void 0) {
    saltLength = 16;
  }
  var salt = randomString(saltLength);
  var passwordWithSalt = password + salt;
  var hash = crypto.createHash("sha256").update(passwordWithSalt).digest("hex");
  return { salt: salt, hash: hash };
}
if (require.main === module) {
  var userPassword = "123";
  var result = hashPassword(userPassword);
  console.log("Salt:", result.salt);
  console.log("Hash:", result.hash);
}
