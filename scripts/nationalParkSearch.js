window.onload = function() {
  const locationSelect = document.getElementById('locationSelect');
  const parkTypeSelect = document.getElementById('parkTypeSelect');
  const resultsList = document.getElementById('resultsList');
  const viewAllBtn = document.getElementById('viewAllBtn');
  const searchBtn = document.getElementById('searchBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const filterOptionsBtn = document.getElementById('filterOptionsBtn');
  const locationContainer = document.getElementById('locationContainer');
  const parkTypeContainer = document.getElementById('parkTypeContainer');

  let currentPage = 1;
  const itemsPerPage = 10;
  let currentResults = [];

  // Populate location checkboxes
  for (let i = 0; i < locationsArray.length; i++) {
      const div = document.createElement('div');
      div.classList.add('form-check');
      div.innerHTML = `
          <input class="form-check-input" type="checkbox" value="${locationsArray[i]}" id="location${i}">
          <label class="form-check-label" for="location${i}">
              ${locationsArray[i]}
          </label>
      `;
      locationSelect.appendChild(div);
  }

  // Populate park type checkboxes
  for (let i = 0; i < parkTypesArray.length; i++) {
      const div = document.createElement('div');
      div.classList.add('form-check');
      div.innerHTML = `
          <input class="form-check-input" type="checkbox" value="${parkTypesArray[i]}" id="parkType${i}">
          <label class="form-check-label" for="parkType${i}">
              ${parkTypesArray[i]}
          </label>
      `;
      parkTypeSelect.appendChild(div);
  }

  // Function to display results with pagination
  function displayResults(parks) {
      resultsList.innerHTML = '';
      const totalPages = Math.ceil(parks.length / itemsPerPage);
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage, parks.length);
      const pageResults = parks.slice(startIndex, endIndex);

      if (pageResults.length === 0) {
          const li = document.createElement('li');
          li.classList.add('list-group-item');
          li.textContent = 'No results found.';
          resultsList.appendChild(li);
      } else {
          for (let i = 0; i < pageResults.length; i++) {
              const park = pageResults[i];
              const li = document.createElement('li');
              li.classList.add('list-group-item');
              li.innerHTML = `
                  <h5>${park.LocationName}</h5>
                  <p>${park.Address ? park.Address + ', ' : ''}${park.City ? park.City + ', ' : ''}${park.State ? park.State + ' ' : ''}${park.ZipCode ? park.ZipCode : ''}</p>
                  ${park.Phone ? `<p>Phone: ${park.Phone}</p>` : ''}
                  ${park.Fax ? `<p>Fax: ${park.Fax}</p>` : ''}
                  ${park.Visit ? `<p><a href="${park.Visit}" target="_blank">Visit Website</a></p>` : ''}
              `;
              resultsList.appendChild(li);
          }
      }

      prevBtn.classList.toggle('hidden', currentPage === 1);
      nextBtn.classList.toggle('hidden', currentPage === totalPages);
  }

  // Function to get selected values from checkboxes
  function getSelectedValues(containerId) {
      const checkboxes = document.querySelectorAll(`#${containerId} input[type="checkbox"]:checked`);
      return Array.from(checkboxes).map(checkbox => checkbox.value);
  }

  // Filter Options button click event
  filterOptionsBtn.onclick = function() {
      locationContainer.classList.toggle('hidden');
      parkTypeContainer.classList.toggle('hidden');
  };

  // Search button click event
  searchBtn.onclick = function() {
      const selectedLocations = getSelectedValues('locationSelect');
      const selectedParkTypes = getSelectedValues('parkTypeSelect');

      currentResults = nationalParksArray.filter(park => {
          const locationMatch = selectedLocations.length === 0 || selectedLocations.includes(park.State);
          const parkTypeMatch = selectedParkTypes.length === 0 || selectedParkTypes.some(type => park.LocationName.includes(type));
          return locationMatch && parkTypeMatch;
      });

      currentPage = 1;
      displayResults(currentResults);
  };

  // View All button click event
  viewAllBtn.onclick = function() {
      currentResults = nationalParksArray;
      currentPage = 1;
      displayResults(currentResults);
  };

  // Pagination buttons click events
  prevBtn.onclick = function() {
      if (currentPage > 1) {
          currentPage--;
          displayResults(currentResults);
      }
  };

  nextBtn.onclick = function() {
      const totalPages = Math.ceil(currentResults.length / itemsPerPage);
      if (currentPage < totalPages) {
          currentPage++;
          displayResults(currentResults);
      }
  };
};
