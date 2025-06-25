document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cor9-1-form');
    const profileKey = 'npcApplicationProfile';

    // --- 1. PRE-FILL LOGIC ---
    const loadProfileData = () => {
        const profile = JSON.parse(localStorage.getItem(profileKey)) || {};
        const elements = form.elements;

        if (profile.cipcCode) {
            elements.customer_code.value = profile.cipcCode;
        }
        // This is the person signing
        if (profile.signerName) { 
            elements.applicant_name.value = profile.signerName;
        }
        // These are the detailed fields for the box
        if (profile.applicantFullName) {
            elements.applicant_full_name_details.value = profile.applicantFullName;
        }
        if (profile.applicantId) {
            elements.applicant_id_details.value = profile.applicantId;
        }
        if (profile.applicantAddress) {
            elements.applicant_address_details.value = profile.applicantAddress;
        }
    };
    // Set today's date for the declaration
    const dateInput = document.getElementById('declaration_date');
    if(dateInput) {
        dateInput.valueAsDate = new Date();
    }

    loadProfileData();
    
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!form.checkValidity()) {
            form.reportValidity();
            alert('Please fill out all required fields.');
            return;
        }

        // A. Collect all form data into an object
        const formData = new FormData(form);
        const docData = {};
        for (const [key, value] of formData.entries()) {
            docData[key] = value;
        }

        // B. Combine the separated fields into a single string for the document preview
        const combinedDetails = 
            `${docData.applicant_full_name_details}\n` +
            `${docData.applicant_id_details}\n\n` +
            `${docData.applicant_address_details}`;
        
        // Add the combined string to the document-specific data object
        docData.applicant_details = combinedDetails;

        // C. Update the shared application profile with the new granular data
        try {
            let profile = JSON.parse(localStorage.getItem(profileKey)) || {};
            profile.cipcCode = docData.customer_code;
            profile.signerName = docData.applicant_name; // The person signing
            profile.applicantFullName = docData.applicant_full_name_details; // The full name for the box
            profile.applicantId = docData.applicant_id_details;
            profile.applicantAddress = docData.applicant_address_details;
            localStorage.setItem(profileKey, JSON.stringify(profile));
            console.log('Application Profile Updated:', profile);
        } catch (e) {
            console.error('Failed to update application profile:', e);
        }

        // D. Save the document-specific data and redirect
        try {
            localStorage.setItem('npcCor91Data', JSON.stringify(docData));
            console.log('CoR 9.1 document data saved:', docData);
            window.location.href = form.dataset.previewUrl;
        } catch (e) {
            console.error('Error saving document data to localStorage:', e);
            alert('Could not save your data. Your browser might be in private mode or has storage disabled.');
        }

    });
});