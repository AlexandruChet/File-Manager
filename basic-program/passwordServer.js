const express = require("express");
const multer = require("multer");
const fs = require("node:fs").promises;
const path = require("node:path");
const crypto = require("node:crypto");
const cors = require("cors");

const app = express();
const upload = multer();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "users.json");

function cryptography(len) {
  const chars =
    "QqWwEeRrTtYyUuIiOoPpAaSsDdFfGgHhJjKkLlZzXxCcVvBbNnMm1234567890!@#$%^&*()_+|}{:>?<~";
  let encryptedCode = "";
  for (let i = 0; i < len; i++) {
    encryptedCode += chars[crypto.randomInt(chars.length)];
  }
  return encryptedCode;
}

app.post("/submit-password", upload.none(), async (req, res) => {
  try {
    const password = req.body.password;
    if (!password) return res.status(400).send("❌ No password received.");

    const isLongEnough = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);
    const noSpaces = /^\S+$/.test(password);

    if (!isLongEnough)
      return res.send("❌ Password too short. Minimum 8 characters required.");
    if (!hasUpper)
      return res.send("❌ Add at least one uppercase letter (A-Z).");
    if (!hasLower)
      return res.send("❌ Add at least one lowercase letter (a-z).");
    if (!hasDigit) return res.send("❌ Add at least one digit (0-9).");
    if (!hasSpecial)
      return res.send("❌ Add at least one special character (!@#$%^&*).");
    if (!noSpaces) return res.send("❌ Password must not contain spaces.");

    const salt = cryptography(8);
    const encryptedPassword = cryptography(password.length) + salt;

    console.log("✅ Password received:", password);
    console.log("🔒 Encrypted password:", encryptedPassword);

    await fs.mkdir(DATA_DIR, { recursive: true });

    let users = [];
    try {
      const data = await fs.readFile(DATA_FILE, "utf-8");
      users = JSON.parse(data);
    } catch {
      users = [];
    }

    users.push({
      originalLength: password.length,
      encryptedPassword,
      createdAt: new Date().toISOString(),
    });

    await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2));

    res.send("✅ Password successfully received and encrypted on server!");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Server error: " + err.message);
  }
});

app.listen(3001, () => {
  console.log("✅ Server is running on http://localhost:3001");
});
