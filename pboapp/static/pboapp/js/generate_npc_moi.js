// pboapp/static/pboapp/js/generate_npc_moi.js

document.addEventListener('DOMContentLoaded', () => {
    const moiForm = document.getElementById('moi-form');
    const incorporatorsContainer = document.getElementById('incorporators-container');
    const addIncorporatorBtn = document.getElementById('add-incorporator-btn');
    const template = document.getElementById('incorporator-template');

    if (!moiForm || !incorporatorsContainer || !addIncorporatorBtn || !template) {
        console.error('A required element for the MOI form generator is missing.');
        return;
    }

    // --- Dynamic Incorporator Functions ---

    const createIncorporatorElement = () => {
        const clone = template.content.firstElementChild.cloneNode(true);
        const dateInput = clone.querySelector('input[type="date"]');
        // Set default date to today for convenience
        dateInput.valueAsDate = new Date();
        
        const removeBtn = clone.querySelector('.remove-incorporator-btn');
        removeBtn.addEventListener('click', () => {
            // Don't allow removing if it's one of the last 3 required
            if (incorporatorsContainer.children.length > 3) {
                clone.remove();
            } else {
                alert('A minimum of 3 incorporators is required.');
            }
        });
        return clone;
    };

    const addIncorporator = () => {
        const newIncorporator = createIncorporatorElement();
        incorporatorsContainer.appendChild(newIncorporator);
    };

    addIncorporatorBtn.addEventListener('click', addIncorporator);
    
    // Initialize with the minimum 3 incorporators
    for (let i = 0; i < 3; i++) {
        addIncorporator();
    }


    // --- Form Submission Logic ---

    moiForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!moiForm.checkValidity()) {
            moiForm.reportValidity();
            alert('Please fill out all required fields, including all incorporator details.');
            return;
        }

        // Collect standard form data
        const formData = new FormData(moiForm);
        const data = {};
        for (const [key, value] of formData.entries()) {
            // Exclude incorporator fields from this initial collection
            if (!key.startsWith('incorporator_')) {
                data[key] = value;
            }
        }

        // Collect dynamic incorporator data
        data.incorporators = [];
        const incorporatorCards = incorporatorsContainer.querySelectorAll('.incorporator-card');
        
        incorporatorCards.forEach(card => {
            const incorporatorData = {
                name_address: card.querySelector('[name="incorporator_name_address"]').value,
                id_number: card.querySelector('[name="incorporator_id"]').value,
                date: card.querySelector('[name="incorporator_date"]').value,
            };
            data.incorporators.push(incorporatorData);
        });

        // Store and redirect
        try {
            localStorage.setItem('npcMoiData', JSON.stringify(data));
            console.log('MOI data saved to localStorage:', data);

            const previewUrl = moiForm.dataset.previewUrl;
            if (previewUrl) {
                window.location.href = previewUrl;
            } else {
                console.error('Preview URL not found on form element.');
            }
        } catch (e) {
            console.error('Error saving data to localStorage:', e);
            alert('Could not save your data. Your browser might be in private mode or has storage disabled.');
        }
    });
});