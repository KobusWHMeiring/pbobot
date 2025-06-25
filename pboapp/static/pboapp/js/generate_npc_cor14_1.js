document.addEventListener('DOMContentLoaded', () => {
    // --- Get DOM Elements ---
    const form = document.getElementById('cor14-1-form');
    const incorporatorsContainer = document.getElementById('incorporators-container');
    const addIncorporatorBtn = document.getElementById('add-incorporator-btn');
    const template = document.getElementById('incorporator-template');
    
    if (!form || !incorporatorsContainer || !addIncorporatorBtn || !template) {
        console.error('A required element for the CoR 14.1 form generator is missing.');
        return;
    }

    // --- Dynamic Incorporator Functions ---
    const createIncorporatorElement = () => {
        const clone = template.content.firstElementChild.cloneNode(true);
        const removeBtn = clone.querySelector('.remove-incorporator-btn');
        removeBtn.addEventListener('click', () => {
            // Allow removing any incorporator, as there's no strict minimum on this form.
            clone.remove();
        });
        return clone;
    };

    const addIncorporator = () => {
        const newIncorporator = createIncorporatorElement();
        incorporatorsContainer.appendChild(newIncorporator);
    };

    addIncorporatorBtn.addEventListener('click', addIncorporator);
    
    // Initialize with one incorporator, as the form requires at least one.
    addIncorporator();

    // --- Form Submission Logic ---
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            alert('Please fill out all required fields.');
            return;
        }

        // Collect all form data
        const formData = new FormData(form);
        const data = {};
        // Use .getAll() for fields that could have multiple values (like radio buttons)
        for (const [key, value] of formData.entries()) {
            // For radio buttons, we only want the single selected value
            if (form.querySelector(`[name="${key}"]`) && form.querySelector(`[name="${key}"]`).type === 'radio') {
                if(form.querySelector(`[name="${key}"]:checked`)){
                   data[key] = form.querySelector(`[name="${key}"]:checked`).value;
                }
            } else if (!key.startsWith('incorporator_')) {
                 data[key] = value;
            }
        }

        // Collect dynamic incorporator data into an array
        data.incorporators = [];
        const incorporatorCards = incorporatorsContainer.querySelectorAll('.incorporator-card');
        
        incorporatorCards.forEach(card => {
            const incorporatorData = {
                name: card.querySelector('[name="incorporator_name"]').value,
                address: card.querySelector('[name="incorporator_address"]').value,
                id_number: card.querySelector('[name="incorporator_id"]').value,
            };
            data.incorporators.push(incorporatorData);
        });

        // Store data in localStorage with a unique key
        try {
            // Use a specific key to avoid conflicts with other forms
            localStorage.setItem('npcCor141Data', JSON.stringify(data));
            console.log('CoR 14.1 data saved to localStorage:', data);

            // Redirect to the preview page
            const previewUrl = form.dataset.previewUrl;
            console.log('Preview URL:', previewUrl);
            if (previewUrl && previewUrl !== '#') {
                window.location.href = previewUrl;
            } else {
                console.error('Preview URL not set. Implement the preview page and update the form\'s data-preview-url attribute.');
                alert('The preview page is not yet linked.');
            }
        } catch (e) {
            console.error('Error saving data to localStorage:', e);
            alert('Could not save your data. Your browser might be in private mode or has storage disabled.');
        }
    });
});