import './css/styles.css';

async function getWeather(city) {
    const res = await fetch(`http://localhost:3000/weather?city=${city}`);
    const data = await res.json();
    console.log(data);
}

getWeather('Paris');