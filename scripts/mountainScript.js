window.onload = () => {
    const mountainSelect = document.getElementById('mountainSelect');

    for (let i = 0; i < mountainsArray.length; i++) {
        const option = document.createElement('option');
        option.value = mountainsArray[i].name;
        option.textContent = mountainsArray[i].name;
        mountainSelect.appendChild(option);

        
    }

    // Function to display mountain information in a dynamically created modal
    window.displayMountainInfo = function() {
        const selectedMountain = mountainsArray.find(mountain => mountain.name === mountainSelect.value);
        if (selectedMountain) {
            // Clear any existing modal content
            const existingModal = document.getElementById('dynamicModal');
            if (existingModal) {
                existingModal.remove();
            }

            // Create modal elements
            const modal = document.createElement('div');
            modal.className = 'modal fade';
            modal.id = 'dynamicModal';
            modal.tabIndex = '-1';
            modal.setAttribute('aria-labelledby', 'modalLabel');
            modal.setAttribute('aria-hidden', 'true');

            const modalDialog = document.createElement('div');
            modalDialog.className = 'modal-dialog modal-dialog-centered modal-lg';

            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content bg-dark text-white';

            const modalHeader = document.createElement('div');
            modalHeader.className = 'modal-header';

            const modalTitle = document.createElement('h5');
            modalTitle.className = 'modal-title';
            modalTitle.id = 'modalLabel';
            modalTitle.textContent = selectedMountain.name;

            const modalCloseButton = document.createElement('button');
            modalCloseButton.className = 'close';
            modalCloseButton.type = 'button';
            modalCloseButton.setAttribute('data-dismiss', 'modal');
            modalCloseButton.setAttribute('aria-label', 'Close');

            const closeSpan = document.createElement('span');
            closeSpan.setAttribute('aria-hidden', 'true');
            closeSpan.innerHTML = '&times;';

            const modalBody = document.createElement('div');
            modalBody.className = 'modal-body p-0';

            const mountainImage = document.createElement('img');
            mountainImage.src = `images/${selectedMountain.img}`;
            mountainImage.alt = selectedMountain.name;
            mountainImage.className = 'img-fluid w-100';

            const modalTextContainer = document.createElement('div');
            modalTextContainer.className = 'p-3 bg-dark-transparent';

            const mountainDescription = document.createElement('p');
            mountainDescription.textContent = selectedMountain.desc;

            // Append elements to the modal
            modalCloseButton.appendChild(closeSpan);
            modalHeader.appendChild(modalTitle);
            modalHeader.appendChild(modalCloseButton);
            modalTextContainer.appendChild(mountainDescription);
            modalBody.appendChild(mountainImage);
            modalBody.appendChild(modalTextContainer);
            modalContent.appendChild(modalHeader);
            modalContent.appendChild(modalBody);
            modalDialog.appendChild(modalContent);
            modal.appendChild(modalDialog);
            document.body.appendChild(modal);

            // Show the modal using Bootstrap's modal method
            const bootstrapModal = new bootstrap.Modal(modal);
            bootstrapModal.show();
        }
    }
};