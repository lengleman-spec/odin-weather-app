import "./style.css";

const apiKey = "c588243f8658e3f6dcd9287218bf1708";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

async function fetchWeather(location) {
  try {
    const response = await fetch(
      `${baseUrl}?q=${location}&appid=${apiKey}&units=metric`,
    );

    if (!response.ok) throw new Error("Location not found");
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

fetchWeather("London");
