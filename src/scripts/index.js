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
    const table = document.getElementById('table');

    if (!data || !Object.keys(data).length) {
        table.innerHTML = '<p class="text-gray-500">No contacts found</p>';
        return;
    }

    const tbody = document.createElement('tbody');

    Object.values(data).forEach(contact => {
        const tr = document.createElement('tr');
        tr.className = "cursor-pointer hover:bg-gray-50 border-b";

        tr.innerHTML = `
            <td class="p-3">
                <img 
                    src="${CONFIG.rootPath}controller/uploads/${contact.avatar}" 
                    alt="${contact.firstname}'s avatar"
                    class="w-10 h-10 rounded-full object-cover"
                />
            </td>
            <td class="p-3 font-medium">${contact.firstname}</td>
            <td class="p-3 font-medium">${contact.lastname}</td>
        `;

        tr.addEventListener('click', () => editContact(contact.id));
        tbody.appendChild(tr);
    });

    const tableEl = document.createElement('table');
    tableEl.className = "w-full";
    tableEl.appendChild(tbody);

    table.innerHTML = '';
    table.appendChild(tableEl);
}


function addContact() {
    window.location.href = "./src/pages/add-contact.html";
}

function editContact(id) {
    window.location.href = `./src/pages/edit-contact.html?id=${id}`;
}