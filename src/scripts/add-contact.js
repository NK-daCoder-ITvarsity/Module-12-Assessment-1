import CONFIG from "./config.js";


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('editForm');
    const homeLink = document.getElementById('homeLink');
    
    // Event Listeners
    form.addEventListener('submit', submitForm);
    homeLink.addEventListener('click', () => window.location.href = '/Module-12-Assessment-1/');
    
    // Functions
    async function submitForm(e) {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submitForm');
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Adding...';
        
        try {
            const formData = new FormData(form);
            formData.append('apiKey', CONFIG.apiKey)
            
            const response = await fetch(`${CONFIG.rootPath}controller/insert-contact/`, {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.text();
            
            if (data === '1') {
                alert('Contact added successfully');
                window.location.href = '/Module-12-Assessment-1/';
            } else {
                alert(data || 'Failed to add contact');
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Add Contact';
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add contact');
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Add Contact';
        }
    }
});