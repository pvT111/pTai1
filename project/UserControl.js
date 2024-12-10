// DOM Elements
const addUserBtn = document.getElementById('addUserBtn');
const userModal = document.getElementById('userModal');
const userForm = document.getElementById('userForm');
const searchBtn = document.getElementById('searchBtn');

// User Management
let users = [
    { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active' },
    { id: 2, name: 'Regular User', email: 'user@example.com', role: 'user', status: 'active' }
];

function renderUsers(userList = users) {
    const tbody = document.getElementById('userTableBody');
    tbody.innerHTML = '';
    
    userList.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${user.status}</td>
            <td class="action-buttons">
                <button class="btn-edit" onclick="editUser(${user.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-delete" onclick="deleteUser(${user.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Search functionality
searchBtn.addEventListener('click', () => {
    const searchId = document.getElementById('searchId').value;
    const searchName = document.getElementById('searchName').value.toLowerCase();
    const searchRole = document.getElementById('searchRole').value;

    const filteredUsers = users.filter(user => {
        const matchId = !searchId || user.id.toString().includes(searchId);
        const matchName = !searchName || user.name.toLowerCase().includes(searchName);
        const matchRole = !searchRole || user.role === searchRole;
        return matchId && matchName && matchRole;
    });

    renderUsers(filteredUsers);
});

// Add User
addUserBtn.addEventListener('click', () => {
    userModal.style.display = 'block';
    userForm.reset();
    document.querySelector('#userModal h2').textContent = 'Thêm tài khoản mới';
});

// Close modal
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        closeBtn.closest('.modal').style.display = 'none';
    });
});

// Form submission
userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {
        id: users.length + 1,
        name: document.getElementById('userName').value,
        email: document.getElementById('userEmail').value,
        role: document.getElementById('userRole').value,
        status: document.getElementById('userStatus').value
    };
    
    users.push(formData);
    renderUsers();
    userModal.style.display = 'none';
    userForm.reset();
});

// Edit User
function editUser(id) {
    const user = users.find(u => u.id === id);
    if (user) {
        document.getElementById('userName').value = user.name;
        document.getElementById('userEmail').value = user.email;
        document.getElementById('userRole').value = user.role;
        document.getElementById('userStatus').value = user.status;
        
        userModal.style.display = 'block';
        document.querySelector('#userModal h2').textContent = 'Chỉnh sửa tài khoản';
    }
}

// Delete User
function deleteUser(id) {
    if (confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) {
        users = users.filter(user => user.id !== id);
        renderUsers();
    }
}

// Initial render
renderUsers();