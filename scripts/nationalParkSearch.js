"use strict";
// all the button/input/output
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
        locationSelect.innerHTML = ''; // Clear existing options
        locationsArray.forEach((location, i) => {
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
        });
    }

    // Function to populate park type checkboxes
    function populateParkTypeSelect() {
        parkTypeSelect.innerHTML = ''; // Clear existing options
        parkTypesArray.forEach((parkType, i) => {
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
        });
    }

    populateLocationSelect();
    populateParkTypeSelect();

    // Function for results
    function displayResults(parks) {
        resultsList.innerHTML = '';
        if (parks.length === 0) {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = 'No results found.';
            resultsList.appendChild(li);
        } else {
            parks.forEach((park) => {
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

                const contactInfo = document.createElement('div');
                contactInfo.classList.add('contact-info');

                if (park.Phone) {
                    const phone = document.createElement('p');
                    phone.classList.add('phone');
                    phone.textContent = `Phone: ${park.Phone}`;
                    contactInfo.appendChild(phone);
                }

                if (park.Fax) {
                    const fax = document.createElement('p');
                    fax.classList.add('fax');
                    fax.textContent = `Fax: ${park.Fax}`;
                    contactInfo.appendChild(fax);
                }

                li.appendChild(contactInfo);

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
            });
        }
    }

    // Function to get selected values
    function getSelectedValues(containerId) {
        const checkboxes = document.querySelectorAll(`#${containerId} input[type="checkbox"]:checked`);
        return Array.from(checkboxes).map(checkbox => checkbox.value);
    }

    // Toggle  options
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
            const parkTypeMatch = selectedParkTypes.length === 0 || selectedParkTypes.some(type => park.LocationName.includes(type));
            return locationMatch && parkTypeMatch;
        });

        displayResults(filteredParks);
    };

    // View All button 
    viewAllBtn.onclick = function() {
        displayResults(nationalParksArray);
    };
};
