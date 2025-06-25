// pboapp/static/pboapp/js/preview_npc_cor9_1.js

document.addEventListener('DOMContentLoaded', () => {
    const dataKey = 'npcCor91Data';
    const setData = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.innerText = value || '';
    };
    const setCheckbox = (id, shouldBeChecked) => {
        const el = document.getElementById(id);
        if (el) {
            // Re-using the class from CoR 14.1 styling
            el.className = 'checkbox-placeholder';
            el.innerText = shouldBeChecked ? 'X' : '';
        }
    };

    const dataString = localStorage.getItem(dataKey);
    if (!dataString) {
        console.error('No CoR 9.1 data found');
        alert('Could not load your data. Please go back and fill out the form again.');
        window.history.back();
        return;
    }
    const data = JSON.parse(dataString);

    // Populate Applicant Details
    setData('preview-applicant-name', data.applicant_name);
    setData('preview-customer-code', data.customer_code);
    setData('preview-applicant-details', data.applicant_details);

    // Populate Proposed Names
    setData('preview-name-1', data.proposed_name_1);
    setData('preview-name-2', data.proposed_name_2);
    setData('preview-name-3', data.proposed_name_3);
    setData('preview-name-4', data.proposed_name_4);

    // Populate Compliance Questions
    setCheckbox('check-q_a_yes', data.q_a === 'yes');
    setCheckbox('check-q_a_no', data.q_a === 'no');
    setCheckbox('check-q_b_yes', data.q_b === 'yes');
    setCheckbox('check-q_b_no', data.q_b === 'no');
    setCheckbox('check-q_c_yes', data.q_c === 'yes');
    setCheckbox('check-q_c_no', data.q_c === 'no');
    setCheckbox('check-q_d_yes', data.q_d === 'yes');
    setCheckbox('check-q_d_no', data.q_d === 'no');

    // Populate Declaration Date
    setData('preview-declaration-date', data.declaration_date);

    // --- Event Listeners for action buttons ---
    document.getElementById('edit-btn').addEventListener('click', () => window.history.back());
    document.getElementById('print-btn').addEventListener('click', () => window.print());
    document.getElementById('confirm-btn').addEventListener('click', () => {
        const checklistId = 'npcChecklistStatus';
        const taskId = 'npc-name-reservation'; // Must match the ID in views.py
        
        try {
            let status = JSON.parse(localStorage.getItem(checklistId)) || {};
            status[taskId] = 'completed';
            localStorage.setItem(checklistId, JSON.stringify(status));
            window.location.href = document.getElementById('confirm-btn').dataset.checklistUrl;
        } catch (e) {
            console.error('Failed to update checklist status:', e);
        }
    });
});