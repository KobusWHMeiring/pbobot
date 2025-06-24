document.addEventListener('DOMContentLoaded', () => {
    const checklistId = 'npcChecklistStatus'; // A unique key for this specific checklist
    const tasks = document.querySelectorAll('.checklist-item-card');
    const compileBtn = document.getElementById('compile-btn');

    // --- Main Functions ---

    /**
     * Loads the saved state from localStorage and updates the UI for each task.
     */
    const loadChecklistState = () => {
        const status = JSON.parse(localStorage.getItem(checklistId)) || {};
        tasks.forEach(task => {
            const taskId = task.dataset.taskId;
            const isComplete = status[taskId] === 'completed';
            updateTaskUI(task, isComplete);
        });
        checkOverallCompletion();
    };

    /**
     * Toggles the completion state for a given task.
     * @param {string} taskId - The unique ID of the task to toggle.
     */
    const toggleTaskState = (taskId) => {
        const status = JSON.parse(localStorage.getItem(checklistId)) || {};
        const isComplete = status[taskId] === 'completed';

        if (isComplete) {
            delete status[taskId]; // Set back to pending
        } else {
            status[taskId] = 'completed';
        }
        
        localStorage.setItem(checklistId, JSON.stringify(status));
        return !isComplete; // Return the new completion state
    };

    /**
     * Checks if all *required* tasks are complete and enables/disables the final button.
     */
    const checkOverallCompletion = () => {
        const status = JSON.parse(localStorage.getItem(checklistId)) || {};
        const requiredTasks = document.querySelectorAll('.checklist-item-card[data-required="True"]');
        
        const allComplete = Array.from(requiredTasks).every(task => {
            const taskId = task.dataset.taskId;
            return status[taskId] === 'completed';
        });

        compileBtn.disabled = !allComplete;
    };


    // --- UI Update Function ---

    /**
     * Updates the visual representation of a single task based on its completion state.
     * @param {HTMLElement} taskElement - The task card element.
     * @param {boolean} isComplete - Whether the task is complete.
     */
    const updateTaskUI = (taskElement, isComplete) => {
        const icon = taskElement.querySelector('.checklist-item-icon');
        const actionLink = taskElement.querySelector('.checklist-item-action-link');

        if (isComplete) {
            taskElement.classList.add('is-complete');
            icon.textContent = 'check_circle';
            if (actionLink) {
                actionLink.textContent = 'View / Edit';
                // TODO: In the future, this could link to the PREVIEW page instead.
                // actionLink.href = actionLink.dataset.previewUrl; 
            }
        } else {
            taskElement.classList.remove('is-complete');
            icon.textContent = 'radio_button_unchecked';
            if (actionLink) {
                actionLink.textContent = 'Generate Your MOI'; // Or original text
                actionLink.href = actionLink.dataset.generatorUrl;
            }
        }
    };


    // --- Event Listeners ---

    // Add click listener to each toggle button
    tasks.forEach(task => {
        const toggleBtn = task.querySelector('.checklist-toggle-btn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const taskId = task.dataset.taskId;
                const newState = toggleTaskState(taskId);
                updateTaskUI(task, newState);
                checkOverallCompletion();
            });
        }
    });

    // Add listener for the final compile button (for future use)
    compileBtn.addEventListener('click', () => {
        if (!compileBtn.disabled) {
            alert('Next step: Compile all completed documents and prepare the email to CIPC!');
            // Here you would trigger the logic to gather all generated docs
        }
    });


    // --- Initial Load ---
    loadChecklistState();
});