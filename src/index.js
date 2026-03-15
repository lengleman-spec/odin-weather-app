import "./style.css";

const apiKey = "c588243f8658e3f6dcd9287218bf1708";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

function processWeatherData(data) {
  return {
    city: data.name,
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    description: data.weather[0].description,
  };
}

async function fetchWeather(location) {
  try {
    const response = await fetch(
      `${baseUrl}?q=${location}&appid=${apiKey}&units=metric`,
    );

    if (!response.ok) throw new Error("Location not found");
    const data = await response.json();
    const weather = processWeatherData(data);

    console.log(weather);

    return weather;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const form = document.getElementById("location-form");
const input = document.getElementById("location-input");
const output = document.getElementById("weather-output");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const location = input.value;
  const weather = await fetchWeather(location);

  if (weather) {
    displayWeather(weather);
  }
});

function displayWeather(weather) {
  output.innerHTML = `<h2>${weather.city}</h2>
  <p>Temperature: ${weather.temperature}°C</p>
  <p>Feels like: ${weather.feelsLike}°C</p>
  <p>Humidity: ${weather.humidity}%</p>
  <p>Conditions: ${weather.description}</p>`;
}
