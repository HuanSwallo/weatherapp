import { loadSuggestions } from './dom.js';

export async function getWeather(city) {
    const res = await fetch(`http://localhost:3000/weather?city=${city}`);
    const data = await res.json();
    console.log(data);
}

export async function getSuggestions(query) {
    try {
        const res = await fetch(`http://localhost:3000/suggestions?query=${query}`);
        const data = await res.json();
        loadSuggestions(data);
    } catch (err) {
        console.error(err);
    }
}