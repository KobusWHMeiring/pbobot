document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Get references to all DOM elements ---
    const explainerScreen = document.getElementById('explainer-screen');
    const qualifierScreen = document.getElementById('qualifier-screen');
    const resultsScreen = document.getElementById('results-screen');

    const proceedButton = document.getElementById('proceed-to-qualifier-button');
    const qualifierForm = document.getElementById('structure-qualifier-form');
    const startOverButton = document.getElementById('start-over-button');

    // Result display elements
    const resultTitle = document.getElementById('result-title');
    const resultDescription = document.getElementById('result-description');
    const resultPros = document.getElementById('result-pros');
    const resultCons = document.getElementById('result-cons');
    const resultChecklistLink = document.getElementById('result-checklist-link');


    // --- 2. Define functions for screen transitions and logic ---

    function showScreen(screenToShow) {
        explainerScreen.style.display = 'none';
        qualifierScreen.style.display = 'none';
        resultsScreen.style.display = 'none';
        screenToShow.style.display = 'block';
    }

    function calculateRecommendation(data) {
        const scores = { 'NPC': 0, 'Trust': 0, 'VA': 0 };

        // Apply our decision tree logic
        if (data.liability === 'yes') scores['NPC'] += 10;
        
        if (data.purpose === 'assets') scores['Trust'] += 10;
        else {
            scores['NPC'] += 2;
            scores['VA'] += 2;
        }

        if (data.membership === 'yes') scores['VA'] += 10;
        else {
            scores['NPC'] += 2;
            scores['Trust'] += 2;
        }
        
        if (data.simplicity === 'very') scores['VA'] += 5;
        else if (data.simplicity === 'not') scores['NPC'] += 3;

        // Determine the winner
        return Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    }

    function displayResults(recommendationKey) {
        const details = window.APP_CONFIG.details[recommendationKey];
        if (!details) {
            console.error('No details found for recommendation:', recommendationKey);
            return;
        }
        
        // Populate the results screen
        resultTitle.textContent = details.fullName;
        resultDescription.textContent = details.description;
        
        // Clear previous list items
        resultPros.innerHTML = '';
        resultCons.innerHTML = '';

        details.pros.forEach(pro => {
            const li = document.createElement('li');
            li.className = 'results-item'; // Use a class for styling
    
            const icon = document.createElement('span');
            icon.className = 'material-icons-outlined results-item-icon';
            icon.textContent = 'fiber_manual_record';
    
            li.appendChild(icon);
            li.appendChild(document.createTextNode(` ${pro}`)); // Add space before text
            resultPros.appendChild(li);
        });

        details.cons.forEach(con => {
            const li = document.createElement('li');
            li.className = 'results-item'; // Use a class for styling
            
            const icon = document.createElement('span');
            icon.className = 'material-icons-outlined results-item-icon';
            icon.textContent = 'fiber_manual_record';
    
            li.appendChild(icon);
            li.appendChild(document.createTextNode(` ${con}`)); // Add space before text
            resultCons.appendChild(li);
        });
        
        // Update the checklist link (you will build these pages later)
        resultChecklistLink.href = `/tools/checklists/${recommendationKey.toLowerCase()}/`;

        resultChecklistLink.querySelector('.truncate').textContent = `View ${recommendationKey} Registration Checklist`;
    
        showScreen(resultsScreen);
    }


    // --- 3. Set up event listeners ---

    proceedButton.addEventListener('click', () => {
        console.log('Proceeding to qualifier screen');
        showScreen(qualifierScreen);
    });

    qualifierForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const formData = new FormData(qualifierForm);
        const answers = {
            liability: formData.get('liability'),
            purpose: formData.get('purpose'),
            simplicity: formData.get('simplicity'),
            membership: formData.get('membership'),
        };

        const recommendation = calculateRecommendation(answers);
        displayResults(recommendation);
    });

    startOverButton.addEventListener('click', () => {
        qualifierForm.reset();
        showScreen(explainerScreen);
    });

});