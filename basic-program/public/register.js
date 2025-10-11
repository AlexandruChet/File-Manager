const form = document.querySelector(".form");
const password = document.getElementById("password");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const pwd = password.value;

  const isLongEnough = pwd.length >= 8;
  const hasUpper = /[A-Z]/.test(pwd);
  const hasLower = /[a-z]/.test(pwd);
  const hasDigit = /\d/.test(pwd);
  const hasSpecial = /[!@#$%^&*]/.test(pwd);
  const noSpaces = /^\S+$/.test(pwd);

  if (!isLongEnough)
    return alert("❌ Password is too short. Minimum 8 characters required.");
  if (!hasUpper)
    return alert("❌ Please add at least one uppercase letter (A-Z).");
  if (!hasLower)
    return alert("❌ Please add at least one lowercase letter (a-z).");
  if (!hasDigit) return alert("❌ Please add at least one digit (0-9).");
  if (!hasSpecial)
    return alert("❌ Please add at least one special character (!@#$%^&*).");
  if (!noSpaces) return alert("❌ Password must not contain spaces.");

  alert("✅ Password is valid!");

  const formData = new FormData(form);

  try {
    const response = await fetch("http://localhost:3001/submit-password", {
      method: "POST",
      body: formData,
    });

    const result = await response.text();
    alert(result);
  } catch (err) {
    alert("❌ Error sending password to server: " + err.message);
  }
});
