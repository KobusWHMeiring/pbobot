document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cor9-1-form');
    const profileKey = 'npcApplicationProfile';

    // --- 1. PRE-FILL LOGIC ---
    const loadProfileData = () => {
        const profile = JSON.parse(localStorage.getItem(profileKey)) || {};
        if (profile.cipcCode) {
            form.elements.customer_code.value = profile.cipcCode;
        }
        if (profile.applicantName) {
            form.elements.applicant_name.value = profile.applicantName;
        }
        if (profile.applicantDetails) {
            form.elements.applicant_details.value = profile.applicantDetails;
        }
    };
    loadProfileData();
    // Set today's date for the declaration
    const dateInput = document.getElementById('declaration_date');
    if(dateInput) {
        dateInput.valueAsDate = new Date();
    }
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!form.checkValidity()) {
            form.reportValidity();
            alert('Please fill out all required fields.');
            return;
        }

        const formData = new FormData(form);
        const data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }

        let profile = JSON.parse(localStorage.getItem(profileKey)) || {};
        profile.cipcCode = data.customer_code;
        profile.applicantName = data.applicant_name;
        profile.applicantDetails = data.applicant_details;
        localStorage.setItem(profileKey, JSON.stringify(profile));

        try {
            localStorage.setItem('npcCor91Data', JSON.stringify(data));
            console.log('CoR 9.1 data saved to localStorage:', data);
            window.location.href = form.dataset.previewUrl;
        } catch (e) {
            console.error('Error saving data to localStorage:', e);
            alert('Could not save your data. Your browser might be in private mode or has storage disabled.');
        }
    });
});