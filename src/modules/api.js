export async function getWeather(city, unit = "metric") {
    const res = await fetch(`http://localhost:3000/weather?city=${city}&units=${unit}`);
    const data = await res.json();
    return data;
}

export async function getSuggestions(query) {
    const res = await fetch(`http://localhost:3000/suggestions?query=${query}`);
    const data = await res.json();
    return data;
}