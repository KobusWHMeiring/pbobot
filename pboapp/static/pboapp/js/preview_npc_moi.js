// pboapp/static/pboapp/js/preview_npc_moi.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Get DOM Elements ---
    const editBtn = document.getElementById('edit-btn');
    const printBtn = document.getElementById('print-btn');
    const confirmBtn = document.getElementById('confirm-btn');
    
    // --- Data Population Function ---
    const populateDocument = () => {
        const dataString = localStorage.getItem('npcMoiData');
        
        if (!dataString) {
            console.error('No MOI data found in localStorage.');
            alert('Could not load your data. Please go back and fill out the form again.');
            // This URL logic assumes the generator is at a fixed relative path to the checklist
            const formUrl = confirmBtn.dataset.checklistUrl.replace('/checklists/npc/', '/generate/npc-moi/');
            window.location.href = formUrl;
            return;
        }
        
        const data = JSON.parse(dataString);
        
        // Helper to set text content, handling line breaks for textareas
        const setData = (id, value) => {
            const el = document.getElementById(id);
            if (el) {
                el.innerText = value || '[Not Provided]';
            } else {
                console.warn(`Element with ID '${id}' not found.`);
            }
        };
        
        // Populate Page 1 fields
        setData('preview-company-name', data.company_name);
        setData('preview-company-objects', data.company_objects);
        setData('preview-director-count', data.director_count);
        setData('preview-alternate-director-count', data.alternate_director_count);
        setData('preview-director-appointment-manner', data.director_appointment_manner);

        // Populate the incorporators table
        const tableBody = document.getElementById('incorporators-table-body');
        if (tableBody && data.incorporators && Array.isArray(data.incorporators)) {
            tableBody.innerHTML = ''; // Clear any placeholder rows
            data.incorporators.forEach(inc => {
                const row = tableBody.insertRow();
                // Use innerText to correctly handle multi-line addresses
                const cell1 = row.insertCell(0);
                cell1.innerText = inc.name_address;

                const cell2 = row.insertCell(1);
                cell2.innerText = inc.id_number;

                // Signature cell is intentionally left blank
                row.insertCell(2).innerHTML = ' '; 

                const cell4 = row.insertCell(3);
                cell4.innerText = inc.date;
            });
        }
    };
    
    // --- Event Listeners ---
    editBtn.addEventListener('click', () => window.history.back());
    printBtn.addEventListener('click', () => window.print());
    confirmBtn.addEventListener('click', () => {
        const checklistId = 'npcChecklistStatus';
        const taskId = 'npc-moi';
        try {
            let status = JSON.parse(localStorage.getItem(checklistId)) || {};
            status[taskId] = 'completed';
            localStorage.setItem(checklistId, JSON.stringify(status));
            
            const checklistUrl = confirmBtn.dataset.checklistUrl;
            if (checklistUrl) {
                window.location.href = checklistUrl;
            } else {
                alert('Error: Cannot return to the checklist.');
            }
        } catch (e) {
            console.error('Failed to update checklist status:', e);
            alert('An error occurred while saving your progress.');
        }
    });
    
    // --- Initial Load ---
    populateDocument();
});