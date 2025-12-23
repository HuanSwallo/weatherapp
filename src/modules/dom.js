export function loadWeatherData(data, unit) {
    document.querySelector('main').style.display = 'block';
    document.querySelector('main h2').textContent = `${data.name}, ${data.sys.country}`;
    document.querySelector('.location').textContent = `${data.name}, ${data.sys.country}`;
    document.querySelector('.temp').textContent = `${Math.round(data.main.temp)}°`;
    document.querySelector('.highlowtemp').textContent = `${Math.round(data.main.temp_max)}° / ${Math.round(data.main.temp_min)}°`;
    document.querySelector('.desc').textContent = data.weather[0].description;
    const now = new Date();
    document.querySelector('.date').textContent =
        now.toLocaleDateString();
    document.querySelector('.time').textContent =
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    document.getElementById('humidity-output').textContent = `${data.main.humidity}%`;
    document.getElementById('windspeed-output').textContent = `${data.wind.speed} ${unit === 'metric' ? 'm/s' : 'mph'}`;
    document.getElementById('rain-output').textContent = `${data.rain ? data.rain['1h'] : 0} mm`;
    document.getElementById('sunrise-output').textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('sunset-output').textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
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