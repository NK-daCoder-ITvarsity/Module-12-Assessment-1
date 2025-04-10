
import CONFIG from "./config.js"

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const homeLink = document.getElementById('homeLink');
    const editBtn = document.getElementById('editContact');
    const submitBtn = document.getElementById('submitForm');
    const deleteBtn = document.getElementById('deleteContact');
    const avatarInput = document.getElementById('avatar');
    const avatarLabel = document.getElementById('avatarLabel');
    const contactAvatar = document.getElementById('contactAvatar');
    
    // Get ID from URL
    const id = new URLSearchParams(window.location.search).get('id');
    
    // Event Listeners
    homeLink.addEventListener('click', () => window.location.href = '/index.html');
    editBtn.addEventListener('click', enableEditing);
    submitBtn.addEventListener('click', submitForm);
    deleteBtn.addEventListener('click', deleteContact);
    avatarInput.addEventListener('change', handleAvatarChange);
    
    // Initial load
    getContact();
    
    // Functions
    async function getContact() {
        try {
            const response = await fetch(`${CONFIG.rootPath}controller/get-contacts/?id=${id}`);
            if (!response.ok) throw new Error('Failed to fetch contact');
            const data = await response.json();
            displayOutput(data);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to load contact details');
        }
    }
    
    function displayOutput(data) {
        if (!data || !data.length) {
            alert('Contact not found');
            window.location.href = 'index.html';
            return;
        }
        
        const contact = data[0];
        contactAvatar.src = `${CONFIG.rootPath}controller/uploads/${contact.avatar}`;
        document.getElementById('firstname').value = contact.firstname;
        document.getElementById('lastname').value = contact.lastname;
        document.getElementById('mobile').value = contact.mobile;
        document.getElementById('email').value = contact.email;
    }
    
    function enableEditing() {
        const inputs = document.querySelectorAll('#editForm input[type="text"]');
        inputs.forEach(input => {
            input.readOnly = false;
            input.classList.remove('bg-gray-100');
            input.classList.add('bg-white');
        });
        
        avatarLabel.classList.remove('hidden');
        submitBtn.classList.remove('hidden');
        editBtn.disabled = true;
        editBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }
    
    async function submitForm(e) {
        e.preventDefault();
        
        const form = new FormData(document.getElementById('editForm'));
        form.append('apiKey', CONFIG.apiKey);
        form.append('id', id);
        
        try {
            const response = await fetch(`${rootPath}controller/edit-contact/`, {
                method: 'POST',
                body: form
            });
            
            const data = await response.text();
            if (data === '1') {
                alert('Contact updated successfully');
                window.location.href = '/index.html';
            } else {
                alert(data || 'Failed to update contact');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to update contact');
        }
    }
    
    function handleAvatarChange(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                contactAvatar.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    }
    
    async function deleteContact() {
        if (!confirm('Are you sure you want to delete this contact?')) return;
        
        try {
            const response = await fetch(`${CONFIG.rootPath}controller/delete-contact/?id=${id}`);
            const data = await response.text();
            
            if (data === '1') {
                alert('Contact deleted successfully');
                window.location.href = '/index.html';
            } else {
                alert(data || 'Failed to delete contact');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to delete contact');
        }
    }
});