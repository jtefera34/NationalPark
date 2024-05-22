window.onload = function() {
    const locationSelect = document.getElementById('locationSelect');
    const parkTypeSelect = document.getElementById('parkTypeSelect');
    const resultsList = document.getElementById('resultsList');
    const viewAllBtn = document.getElementById('viewAllBtn');
    const searchBtn = document.getElementById('searchBtn');
    const filterOptionsBtn = document.getElementById('filterOptionsBtn');
    const locationContainer = document.getElementById('locationContainer');
    const parkTypeContainer = document.getElementById('parkTypeContainer');

    // Function to populate location checkboxes
    function populateLocationSelect() {
        for (let i = 0; i < locationsArray.length; i++) {
            const location = locationsArray[i];
            const div = document.createElement('div');
            div.classList.add('form-check');
            
            const input = document.createElement('input');
            input.classList.add('form-check-input');
            input.type = 'checkbox';
            input.value = location;
            input.id = 'location' + i;
            
            const label = document.createElement('label');
            label.classList.add('form-check-label');
            label.htmlFor = 'location' + i;
            label.textContent = location;
            
            div.appendChild(input);
            div.appendChild(label);
            locationSelect.appendChild(div);
        }
    }

    // Function to populate park type checkboxes
    function populateParkTypeSelect() {
        for (let i = 0; i < parkTypesArray.length; i++) {
            const parkType = parkTypesArray[i];
            const div = document.createElement('div');
            div.classList.add('form-check');
            
            const input = document.createElement('input');
            input.classList.add('form-check-input');
            input.type = 'checkbox';
            input.value = parkType;
            input.id = 'parkType' + i;
            
            const label = document.createElement('label');
            label.classList.add('form-check-label');
            label.htmlFor = 'parkType' + i;
            label.textContent = parkType;
            
            div.appendChild(input);
            div.appendChild(label);
            parkTypeSelect.appendChild(div);
        }
    }

    // Populate the select elements with data
    populateLocationSelect();
    populateParkTypeSelect();

    // Function to display results
    function displayResults(parks) {
        resultsList.innerHTML = '';
        if (parks.length === 0) {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = 'No results found.';
            resultsList.appendChild(li);
        } else {
            for (let i = 0; i < parks.length; i++) {
                const park = parks[i];
                const li = document.createElement('li');
                li.classList.add('list-group-item');

                const h5 = document.createElement('h5');
                h5.classList.add('location-name');
                h5.textContent = park.LocationName;
                li.appendChild(h5);

                const address = document.createElement('p');
                address.classList.add('address');
                address.textContent = `${park.Address ? park.Address + ', ' : ''}${park.City ? park.City + ', ' : ''}${park.State ? park.State + ' ' : ''}${park.ZipCode ? park.ZipCode : ''}`;
                li.appendChild(address);

                if (park.Phone) {
                    const phone = document.createElement('p');
                    phone.classList.add('phone');
                    phone.textContent = `Phone: ${park.Phone}`;
                    li.appendChild(phone);
                }

                if (park.Fax) {
                    const fax = document.createElement('p');
                    fax.classList.add('fax');
                    fax.textContent = `Fax: ${park.Fax}`;
                    li.appendChild(fax);
                }

                if (park.Visit) {
                    const visit = document.createElement('p');
                    visit.classList.add('visit');
                    const visitLink = document.createElement('a');
                    visitLink.href = park.Visit;
                    visitLink.textContent = 'Visit Website';
                    visitLink.target = '_blank';
                    visit.appendChild(visitLink);
                    li.appendChild(visit);
                }

                resultsList.appendChild(li);
            }
        }
    }

    //  to get selected values
    function getSelectedValues(containerId) {
        const checkboxes = document.querySelectorAll(`#${containerId} input[type="checkbox"]:checked`);
        const selectedValues = [];
        for (let i = 0; i < checkboxes.length; i++) {
            selectedValues.push(checkboxes[i].value);
        }
        return selectedValues;
    }

    // Toggle 
    filterOptionsBtn.onclick = function() {
        locationContainer.classList.toggle('hidden');
        parkTypeContainer.classList.toggle('hidden');
    };

    // Search button
    searchBtn.onclick = function() {
        const selectedLocations = getSelectedValues('locationSelect');
        const selectedParkTypes = getSelectedValues('parkTypeSelect');

        const filteredParks = nationalParksArray.filter(function(park) {
            const locationMatch = selectedLocations.length === 0 || selectedLocations.includes(park.State);
            const parkTypeMatch = selectedParkTypes.length === 0 || selectedParkTypes.some(function(type) {
                return park.LocationName.includes(type);
            });
            return locationMatch && parkTypeMatch;
        });

        displayResults(filteredParks);
    };

    // View All button 
    viewAllBtn.onclick = function() {
        displayResults(nationalParksArray);
    };
};
