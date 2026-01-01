export async function getWeather(city, unit = "metric") {
    const res = await fetch(`http://localhost:3000/weather?city=${encodeURIComponent(city)}&unit=${unit}`);
    const data = await res.json();
    return data;
}

export async function getSuggestions(query) {
    const res = await fetch(`http://localhost:3000/suggestions?query=${query}`);
    const data = await res.json();
    return data;
}

export async function getGif(query) {
    const res = await fetch(`http://localhost:3000/gif?query=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data;
}