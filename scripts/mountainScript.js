window.onload = function() {
    const mountainSelect = document.querySelector('#mountainSelect');

    for (let i = 0; i < mountainsArray.length; i++) {
        const option = document.createElement('option');
        option.value = mountainsArray[i].name;
        option.textContent = mountainsArray[i].name;
        mountainSelect.appendChild(option);
    }
};
 
    window.displayMountainInfo = function() {
        let selectedMountain = null;

        
        for (let i = 0; i < mountainsArray.length; i++) {
            if (mountainsArray[i].name === mountainSelect.value) {
                selectedMountain = mountainsArray[i];
                break; 
            }
        }
        
               if (selectedMountain) {
            
            const existingModal = document.getElementById('dynamicModal');
            if (existingModal) {
                existingModal.remove();
            }

        
            const modal = document.createElement('div');
            modal.className = 'modal modal-dialog modal-sm fade';
            modal.id = 'dynamicModal';
            modal.tabIndex = '-1';
            // modal.setAttribute('tabIndex','-1')
            modal.setAttribute('aria-labelledby', 'modalLabel');
            modal.setAttribute('aria-hidden', 'true');
            
            document.body.appendChild(modal);
            
            const modalDialog = document.createElement('div');
            modalDialog.className = 'modal-dialog modal-dialog-centered modal-lg';
            modal.appendChild(modalDialog);
            
            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content bg-dark text-white';
            modalDialog.appendChild(modalContent);
            
            const modalHeader = document.createElement('div');
            modalHeader.className = 'modal-header';
            modalContent.appendChild(modalHeader);
            
            const modalTitle = document.createElement('h5');
            modalTitle.className = 'modal-title';
            modalTitle.id = 'modalLabel';
            modalTitle.textContent = selectedMountain.name;
            modalHeader.appendChild(modalTitle);
            
            const modalCloseButton = document.createElement('button');
            modalCloseButton.className = 'close';
            modalCloseButton.type = 'button';
            modalCloseButton.setAttribute('data-dismiss', 'modal');
            modalCloseButton.setAttribute('aria-label', 'Close');
            modalHeader.appendChild(modalCloseButton);
            
            const closeSpan = document.createElement('span');
            closeSpan.setAttribute('aria-hidden', 'true');
            closeSpan.innerHTML = '&times;';
            modalCloseButton.appendChild(closeSpan);
            
            const modalBody = document.createElement('div');
            modalBody.className = 'modal-body p-0';
            modalContent.appendChild(modalBody);
            
            const mountainImage = document.createElement('img');
            mountainImage.src = `images/${selectedMountain.img}`;
            mountainImage.alt = selectedMountain.name;
            mountainImage.className = 'img-fluid w-100';
            modalBody.appendChild(mountainImage);
            
            const modalTextContainer = document.createElement('div');
            modalTextContainer.className = 'p-3 bg-dark-transparent';
            modalBody.appendChild(modalTextContainer);
            
            const mountainDescription = document.createElement('p');
            mountainDescription.textContent = selectedMountain.desc;
            modalTextContainer.appendChild(mountainDescription);
            
   
            const bootstrapModal = new bootstrap.Modal(modal);
            bootstrapModal.show();
        }
    }
