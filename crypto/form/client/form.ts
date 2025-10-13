const password = document.getElementById("password") as HTMLInputElement;
const form = document.getElementById("form") as HTMLFormElement;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const pwd: string | number = password.value;
  const isLongEnough = pwd.length >= 12;
  const hasUpper = /[A-Z]/.test(pwd);
  const hasLower = /[a-z]/.test(pwd);
  const hasDigit = /\d/.test(pwd);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
  const noSpaces = /^\S+$/.test(pwd);

  if (!isLongEnough)
    return alert("❌ Password is too short. Minimum 12 characters required.");
  if (!hasUpper)
    return alert("❌ Please add at least one uppercase letter (A-Z).");
  if (!hasLower)
    return alert("❌ Please add at least one lowercase letter (a-z).");
  if (!hasDigit) return alert("❌ Please add at least one digit (0-9).");
  if (!hasSpecial)
    return alert("❌ Please add at least one special character (!@#$%^&*).");
  if (!noSpaces) return alert("❌ Password must not contain spaces.");

  alert("✅ Password is valid!");

  try {
    const response = await fetch("/submit-password", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ password: pwd }),
    });
    const result = await response.text();
    alert(result);
  } catch (err: any) {
    console.error("❌ Error sending password:", err.message);
  }
});
