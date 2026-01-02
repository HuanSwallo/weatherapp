const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://weatherapp-y5ue.onrender.com"
    : "http://localhost:3000";

export async function getWeather(city, unit = "metric") {
  const res = await fetch(
    `${API_BASE}/weather?city=${encodeURIComponent(
      city
    )}&unit=${unit}`
  );
  const data = await res.json();
  return data;
}

export async function getSuggestions(query) {
  const res = await fetch(`
    ${API_BASE}/suggestions?query=${query}`
  );
  const data = await res.json();
  return data;
}

export async function getGif(query) {
  const res = await fetch(
    `${API_BASE}/gif?query=${encodeURIComponent(query)}`
  );
  const data = await res.json();
  return data;
}
