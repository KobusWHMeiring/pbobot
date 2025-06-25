// pboapp/static/pboapp/js/preview_npc_cor14_1.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Get DOM Elements ---
    const editBtn = document.getElementById('edit-btn');
    const printBtn = document.getElementById('print-btn');
    const confirmBtn = document.getElementById('confirm-btn');
    const dataKey = 'npcCor141Data'; // Unique key for this form's data

    // --- Helper Functions ---
    const setData = (id, value) => {
        const el = document.getElementById(id);
        if (el) {
            el.innerText = value || '';
        }
    };

    const setCheckbox = (id, shouldBeChecked) => {
        const el = document.getElementById(id);
        if (el) {
            el.innerText = shouldBeChecked ? 'X' : '';
        }
    };

    // --- Main Data Population Function ---
    const populateDocument = () => {
        const dataString = localStorage.getItem(dataKey);
        if (!dataString) {
            console.error('No CoR 14.1 data found in localStorage.');
            alert('Could not load your data. Please go back and fill out the form again.');
            // Ideally, find the generator URL to redirect back to
            // For now, history.back() is a safe fallback.
            window.history.back();
            return;
        }
        
        const data = JSON.parse(dataString);
        console.log('Populating preview with data:', data);

        // Populate Incorporator Box (only the first one as per form instructions)
        setData('preview-customer-code', data.customer_code);
        if (data.incorporators && data.incorporators.length > 0) {
            const firstIncorporator = data.incorporators[0];
            setData('preview-inc-name', firstIncorporator.name);
            setData('preview-inc-address', firstIncorporator.address);
            setData('preview-inc-id', firstIncorporator.id_number);
        }

        // 1. Company Type
        setCheckbox('check-type-soc', data.company_type === 'soc');
        setCheckbox('check-type-pub', data.company_type === 'pub');
        setCheckbox('check-type-plc', data.company_type === 'plc');
        setCheckbox('check-type-pvt', data.company_type === 'pvt');
        setCheckbox('check-type-npc', data.company_type === 'npc');

        // 2. Effective Date
        setCheckbox('check-eff-date-cert', data.effective_date_option === 'certificate');
        setCheckbox('check-eff-date-later', data.effective_date_option === 'later');
        setData('preview-later-date', data.effective_date_option === 'later' ? data.later_date : '_________');

        // 3-5. Company Details
        setData('preview-financial-year-end', data.financial_year_end);
        setData('preview-registered-address', data.registered_address);
        setData('preview-director-count', data.director_count);

        // 6. Company Name
        setCheckbox('check-name-reg-num', data.name_option === 'reg_num');
        setCheckbox('check-name-reserved', data.name_option === 'reserved');
        setCheckbox('check-name-annex-b', data.name_option === 'annex_b');
        setData('preview-reservation-number', data.name_option === 'reserved' ? data.reservation_number : '_________');
        setData('preview-reserved-for', data.name_option === 'reserved' ? data.reserved_for : '_________');

        // 7. MOI Details
        setData('preview-moi-form-number', data.moi_form_number);
        setCheckbox('check-moi-unique', data.moi_is_unique === 'on');
        setCheckbox('check-moi-no-prov', data.moi_provision === 'no_provision');
        setCheckbox('check-moi-has-prov', data.moi_provision === 'has_provision');

        // Declaration
        setData('preview-declaration-date', data.declaration_date);
    };
    
    // --- Event Listeners ---
    editBtn.addEventListener('click', () => window.history.back());
    printBtn.addEventListener('click', () => window.print());
    confirmBtn.addEventListener('click', () => {
        const checklistId = 'npcChecklistStatus';
        const taskId = 'npc-notice-of-incorporation'; // This must match the task ID
        
        try {
            let status = JSON.parse(localStorage.getItem(checklistId)) || {};
            status[taskId] = 'completed';
            localStorage.setItem(checklistId, JSON.stringify(status));
            
            const checklistUrl = confirmBtn.dataset.checklistUrl;
            // Need to update the template to pass the correct checklist URL
            // For now, this is a placeholder.
            window.location.href = checklistUrl || '/'; 
        } catch (e) {
            console.error('Failed to update checklist status:', e);
            alert('An error occurred while saving your progress.');
        }
    });
    
    // --- Initial Load ---
    populateDocument();
});