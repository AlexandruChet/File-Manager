const crypto = require("node:crypto");

export function randomString(len: number): string {
  const chars =
    "QqWwEeRrTtYyUuIiOoPpAaSsDdFfGgHhJjKkLlZzXxCcVvBbNnMm!@#$%^&*()_+1234567890";
  let result = "";
  for (let i = 0; i < len; i++) {
    result += chars[crypto.randomInt(chars.length)];
  }
  return result;
}

export function hashPassword(
  password: string,
  saltLength = 16
): { salt: string; hash: string } {
  const salt = randomString(saltLength);
  const passwordWithSalt = password + salt;
  const hash = crypto
    .createHash("sha256")
    .update(passwordWithSalt)
    .digest("hex");

  return { salt, hash };
}

if (require.main === module) {
  const userPassword = "123";
  const result = hashPassword(userPassword);
  console.log("Salt:", result.salt);
  console.log("Hash:", result.hash);
}
