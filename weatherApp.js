const readline = require("node:readline");
const axios = require("axios");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const API_KEY = "aa99c2209fe9601572ce408e2236898f";

const Question = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

const Working = async () => {
  try {
    const city = await Question("Please write your city name (e.g. Berlin,de): ");
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await axios.get(url);
    const data = response.data;

    console.log(`\n🌍 Weather in ${data.name}:`);
    console.log(`🌡️ Temperature: ${data.main.temp}°C`);
    console.log(`💨 Wind speed: ${data.wind.speed} m/s`);
    console.log(`☁️ Description: ${data.weather[0].description}`);

  } catch (error) {
    console.error("\n❌ Error:", error.response?.data?.message || error.message);
  } finally {
    rl.close();
  }
};

Working();
