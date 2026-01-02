import { getSuggestions, getWeather } from "./api.js";
import { loadSuggestions } from "./dom.js";

let debounceTimer; // For debouncing search input and delaying API calls

export function initSearchEvents(fetchAndDisplayWeather) {
  const input = document.getElementById("location");
  const form = document.getElementById("weather-form");
  const suggestions = document.getElementById("suggestions");

  input.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    const query = input.value.trim();

    if (query.length < 2) {
      suggestions.innerHTML = "";
      suggestions.style.display = "none";
      return;
    }

    // Debounce API calls by 300ms
    debounceTimer = setTimeout(async () => {
      const cities = await getSuggestions(query);
      loadSuggestions(cities, fetchAndDisplayWeather);
    }, 300);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetchAndDisplayWeather(input.value);
    suggestions.style.display = "none";
  });
}

export function initUnitToggle(
  getUnit,
  setUnit,
  getCurrentCity,
  fetchAndDisplayWeather
) {
  const btn = document.getElementById("unit-toggle");

  btn.addEventListener("click", async () => {
    const newUnit = getUnit() === "metric" ? "imperial" : "metric"; // Toggle unit metric(C) and imperial(F)
    setUnit(newUnit);

    btn.textContent = newUnit === "metric" ? "Switch to °F" : "Switch to °C";

    const city = getCurrentCity();
    // Refetch weather if current city is set
    if (city) {
      await fetchAndDisplayWeather(city);
    }
  });
}
