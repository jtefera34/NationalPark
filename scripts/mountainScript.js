"use strict";
window.onload = function() {
    const mountainSelect = document.querySelector('#mountainSelect');
    const carouselInner = document.getElementById('carouselInner');

    // Populate the dropdown for mountain name
    for (let i = 0; i < mountainsArray.length; i++) {
        const option = document.createElement('option');
        option.value = mountainsArray[i].name;
        option.textContent = mountainsArray[i].name;
        mountainSelect.appendChild(option);

        // Populate the carousel with images and name
        const carouselItem = document.createElement('div');
        carouselItem.className = i === 0 ? 'carousel-item active' : 'carousel-item';

        const mountainImage = document.createElement('img');
        mountainImage.src = `images/${mountainsArray[i].img}`;
        mountainImage.alt = mountainsArray[i].name;
        mountainImage.className = 'd-block w-50';
        mountainImage.addEventListener('click', function() {
            displayMountainInfoFromCarousel(mountainsArray[i]);
        });
        carouselItem.appendChild(mountainImage);

        const carouselCaption = document.createElement('div');
        carouselCaption.className = 'carousel-caption d-none d-md-block';
        carouselItem.appendChild(carouselCaption);

        const mountainTitle = document.createElement('h5');
        mountainTitle.textContent = mountainsArray[i].name;
        carouselCaption.appendChild(mountainTitle);

        carouselInner.appendChild(carouselItem);
    }

    // onchange 
    mountainSelect.onchange = displayMountainInfo;
};

window.displayMountainInfo = function() {
    const mountainSelect = document.querySelector('#mountainSelect');
    const selectedMountainName = mountainSelect.value;
    let selectedMountain = null;

    // Find the selected mountain from the array
    for (let i = 0; i < mountainsArray.length; i++) {
        if (mountainsArray[i].name === selectedMountainName) {
            selectedMountain = mountainsArray[i];
            break;
        }
    }
    if (selectedMountain) {
    
        updateModalContent(selectedMountain);
       $('#mountainModal').modal('show');
    }
};

window.displayMountainInfoFromCarousel = function(mountain) {
    updateModalContent(mountain);
    $('#mountainModal').modal('show');
};

// dyamically update the modal.
function updateModalContent(mountain) {
    document.getElementById('mountainModalLabel').textContent = mountain.name;
    document.getElementById('mountainModalImage').src = `images/${mountain.img}`;
    document.getElementById('mountainModalDescription').textContent = mountain.desc;
    document.getElementById('mountainModalHeight').textContent = mountain.elevation + " feet";
    document.getElementById('mountainModalLocation').textContent = "Latitude: " + mountain.coords.lat + ", Longitude: " + mountain.coords.lng;
}
