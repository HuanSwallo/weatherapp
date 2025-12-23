import './css/styles.css';

import { initSearchEvents, initUnitToggle } from './modules/events.js';
import { getWeather } from './modules/api.js';
import { loadWeatherData } from './modules/dom.js';

document.addEventListener('DOMContentLoaded', () => {
    let unit = 'metric';
    let currentCity = null;

    async function fetchAndDisplayWeather(city) {
        if (!city) return;

        currentCity = city;
        const data = await getWeather(city, unit);
        loadWeatherData(data, unit);
    }

    initSearchEvents(fetchAndDisplayWeather);
    initUnitToggle(
        () => unit,
        newUnit => unit = newUnit,
        () => currentCity,
        fetchAndDisplayWeather
    );
});
