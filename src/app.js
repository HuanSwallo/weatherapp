import "./css/styles.css";

import { initSearchEvents, initUnitToggle } from "./modules/events.js";
import { getWeather, getGif } from "./modules/api.js";
import { loadWeatherData, setGifBackground } from "./modules/dom.js";
import { weatherToGif } from "./modules/gif.js";

document.addEventListener("DOMContentLoaded", () => {
  let unit = "metric";
  let currentCity = null;

  // Fetch and display weather for a given city (can be used anywhere)
  async function fetchAndDisplayWeather(city) {
    console.log("fetchAndDisplayWeather called with:", city);
    if (!city) return;

    currentCity = city;

    const payload = await getWeather(city, unit);
    loadWeatherData(payload, unit);

    // Build keyword from weather condition
    // ? means optional chaining where objects may be null or undefined
    const main = payload.currentData?.weather?.[0]?.main;
    const icon = payload.currentData?.weather?.[0]?.icon; // "01d" or "01n"
    const isDay = icon?.endsWith("d");

    // Get GIF URL and set background
    const gifQuery = weatherToGif(main, isDay);

    const { gifUrl } = await getGif(gifQuery);
    setGifBackground(gifUrl);
  }

  // Initialize event listeners
  initSearchEvents(fetchAndDisplayWeather);
  // Initialize unit toggle (getter, setter, current city getter, fetch function)
  initUnitToggle(
    () => unit,
    (newUnit) => (unit = newUnit),
    () => currentCity,
    fetchAndDisplayWeather
  );
});
