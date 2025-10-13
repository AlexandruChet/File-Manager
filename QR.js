import readline from "node:readline";
import QRCode from "qrcode";

const road = process.cwd();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `${road}> `,
});

const generateQR = () => {
  rl.question("Please write your QR code URL: ", async (answer) => {
    const text = answer.trim();
    if (!text) {
      console.log("No input provided. Exiting.");
      rl.close();
      return;
    }

    try {
      const qr = await QRCode.toString(text, { type: "terminal", small: true });
      console.log(qr);

      await QRCode.toFile("qr.png", text);
      console.log("QR code saved as qr.png");
    } catch (error) {
      console.error("Error generating QR code:", error.message);
    } finally {
      rl.close();
    }
  });
};

generateQR();
