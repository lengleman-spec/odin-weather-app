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

fetchWeather("London");
