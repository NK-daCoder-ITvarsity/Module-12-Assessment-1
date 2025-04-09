import CONFIG from "./config.js";


document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    const tableEl = document.getElementById('table');
    const refreshBtn = document.getElementById('refresh');
    const addContactBtn = document.getElementById('addContact');
    
    // Event listeners with proper error handling
    refreshBtn.addEventListener('click', fetchContacts);
    addContactBtn.addEventListener('click', addContact);
    
    // Initial load
    fetchContacts();
});

async function fetchContacts() {
    try {
        const response = await fetch(`${CONFIG.rootPath}controller/get-contacts/`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        displayOutput(data);
    } catch (error) {
        document.getElementById('table').textContent = 'Failed to load contacts.';
        console.error('Fetch error:', error);
    }
}

function displayOutput(data) {
    if (!data || !Object.keys(data).length) {
        document.getElementById('table').innerHTML = '<p class="text-gray-500">No contacts found</p>';
        return;
    }

    const tableHTML = `
        <table class="w-full">
            <tbody>
                ${
                    Object.values(data).map(contact => `
                        <tr 
                            onclick="editContact(${contact.id})" 
                            class="cursor-pointer hover:bg-gray-50 border-b"
                        >
                            <td class="p-3">
                                <img 
                                    src="${CONFIG.rootPath}controller/uploads/${contact.avatar}" 
                                    alt="${contact.firstname}'s avatar"
                                    class="w-10 h-10 rounded-full object-cover"
                                />
                            </td>
                            <td class="p-3 font-medium">${contact.firstname}</td>
                            <td class="p-3 font-medium">${contact.lastname}</td>
                        </tr>
                    `).join('')
                }
            </tbody>
        </table>
    `;
    
    document.getElementById('table').innerHTML = tableHTML;
}

function addContact() {
    window.location.href = "./src/pages/add-contact.html";
}

function editContact(id) {
    window.location.href = `./pages/edit-contact.html?id=${id}`;
}