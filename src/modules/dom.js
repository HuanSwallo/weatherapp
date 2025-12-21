export function loadSuggestions(cities) {
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
            suggestionsList.innerHTML = '';

            // ADD FETCH WEATHER DATA FOR SELECTED CITY
        });

        suggestionsList.appendChild(li);
    });
}