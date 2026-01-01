import { mapIconToWeatherIcon } from "./icons.js";

export function loadWeatherData(payload, unit) {
     console.log("payload:", payload);

  const { currentData, daily } = payload;

  const cod = Number(currentData?.cod);
  if (!currentData || (cod && cod >= 400)) {
    document.querySelector("main h2").textContent = currentData?.message ?? "City not found.";
    return;
  }
    document.querySelector("main").style.display = 'block';
    
     // Title + location
  document.querySelector("main h2").textContent = `${currentData.name}, ${currentData.sys.country}`;
  document.querySelector(".location").textContent = `${currentData.name}, ${currentData.sys.country}`;
    // Icon
    const mainIconEl = document.querySelector(".main-bottom i");
    const iconCode = currentData.weather[0].icon; // e.g. "01d"
    const iconClass = mapIconToWeatherIcon(iconCode);

mainIconEl.className = `wi ${iconClass}`;

  // Current temps
  document.querySelector(".temp").textContent = `${Math.round(currentData.main.temp)}°`;
  document.querySelector(".highlowtemp").textContent =
    `${Math.round(currentData.main.temp_max)}° / ${Math.round(currentData.main.temp_min)}°`;
  document.querySelector(".desc").textContent = currentData.weather[0].description;
  // Date/time (local browser time)
  const now = new Date();
  document.querySelector(".date").textContent = now.toLocaleDateString();
  document.querySelector(".time").textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Details
  document.getElementById("humidity-output").textContent = `${currentData.main.humidity}%`;
  document.getElementById("pressure-output").textContent = `${currentData.main.pressure} hPa`;
  document.getElementById("windspeed-output").textContent =
    `${currentData.wind.speed} ${unit === "metric" ? "m/s" : "mph"}`;

  // Sunrise/sunset from current endpoint
  document.getElementById("sunrise-output").textContent =
    new Date(currentData.sys.sunrise * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  document.getElementById("sunset-output").textContent =
    new Date(currentData.sys.sunset * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Rain probability: use today's max PoP from daily summary if available
  const today = daily?.[0];
  document.getElementById("rain-output").textContent =
    today ? `${Math.round(today.pop * 100)}%` : "N/A";

  

  // Next days cards (limited by free forecast)
  renderNextDays(daily, unit);  
}

function renderNextDays(daily) {
  const items = document.querySelectorAll("#nextdays li");

  // daily includes today + next days. Usually show tomorrow.. up to 7 tiles.
  const next = (daily ?? []).slice(0, 7);

  items.forEach((li, i) => {
    const d = next[i];

    const dateEl = li.querySelector(".nextdays-date");
    const dayEl = li.querySelector(".nextdays-day");
    const highEl = li.querySelector(".nextdays-high");
    const lowEl = li.querySelector(".nextdays-low");
    const iconEl = li.querySelector("i");

    if (!d) {
      dateEl.textContent = "--";
      dayEl.textContent = "--";
      highEl.textContent = "--";
      lowEl.textContent = "--";
      if (iconEl) iconEl.className = "wi wi-na";
      return;
    }

    const dateObj = new Date(d.date + "T00:00:00");
    dateEl.textContent = dateObj.toLocaleDateString([], { month: "short", day: "numeric" });
    dayEl.textContent = dateObj.toLocaleDateString([], { weekday: "short" });

    highEl.textContent = `${Math.round(d.max)}°`;
    lowEl.textContent = `${Math.round(d.min)}°`;

    if (iconEl) {
        const iconClass = mapIconToWeatherIcon(d.icon);
        iconEl.className = `wi ${iconClass}`;
}
  });
}

export function loadSuggestions(cities, fetchAndDisplayWeather) {
    const locationInput = document.getElementById('location');
    const suggestionsList = document.getElementById('suggestions');
    suggestionsList.innerHTML = '';
    suggestionsList.style.display = 'block';

    cities.forEach(city => {
        const li = document.createElement('li');
        const locationItem = document.createElement('span');
        const cityName = document.createElement('span');
        const regionName = document.createElement('span');
        
        cityName.textContent = `${city.name} `;
        regionName.textContent = `${city.state}, ${city.country}`;
        locationItem.appendChild(cityName);
        locationItem.appendChild(regionName);
        li.appendChild(locationItem);

        li.addEventListener('click', () => {
            locationInput.value = city.name;
            suggestionsList.style.display = 'none';
            fetchAndDisplayWeather(city.name);
        });

        suggestionsList.appendChild(li);
    });
}

export function setGifBackground(gifUrl) {
  console.log("Setting GIF background:", gifUrl);
  const bg = document.querySelector(".gif-background");

  if (!bg) return;

  if (!gifUrl) {
    bg.style.backgroundImage = "";
    return;
  }

  bg.style.backgroundImage = `url("${gifUrl}")`;
  bg.style.backgroundSize = "cover";
  bg.style.backgroundPosition = "center";
}