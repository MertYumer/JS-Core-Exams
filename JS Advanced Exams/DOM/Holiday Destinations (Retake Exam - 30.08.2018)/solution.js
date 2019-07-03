function addDestination() {
    const cityInput = document.getElementsByTagName('input')[0];
    const city = cityInput.value;

    const countryInput = document.getElementsByTagName('input')[1];
    const country = countryInput.value;

    const seasonInput = document.getElementsByTagName('select')[0];
    const season = seasonInput.value.charAt(0).toUpperCase() + seasonInput.value.slice(1);

    const table = document.getElementById('destinationsList');

    const summerDestinations = document.getElementById('summer');
    const autumnDestinations = document.getElementById('autumn');
    const winterDestinations = document.getElementById('winter');
    const springDestinations = document.getElementById('spring');

    if (city && country) {
        const tdOne = document.createElement('td');
        tdOne.textContent = `${city}, ${country}`;

        const tdTwo = document.createElement('td');
        tdTwo.textContent = season;

        const tr = document.createElement('tr');
        tr.appendChild(tdOne);
        tr.appendChild(tdTwo);
        table.appendChild(tr);

        switch (season) {
            case 'Summer':
                summerDestinations.value = +summerDestinations.value + 1;
                break;

            case 'Autumn':
                autumnDestinations.value = +autumnDestinations.value + 1;
                break;

            case 'Winter':
                winterDestinations.value = +winterDestinations.value + 1;
                break;

            case 'Spring':
                springDestinations.value = +springDestinations.value + 1;
                break;
        }
    }

    cityInput.value = '';
    countryInput.value = '';
}