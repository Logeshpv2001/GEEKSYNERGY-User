// API Base URL
const apiUrl = 'http://localhost:3000'; // Update this if needed

// Register User
if (document.getElementById('registerForm')) {
  document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const userData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      phoneNo: document.getElementById('phoneNo').value,
      profession: document.getElementById('profession').value,
    };

    try {
      const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const result = await response.json();
      document.getElementById('notification').innerText = result.message || 'User registered successfully!';
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('notification').innerText = 'Error registering user.';
    }
  });
}

// Login User
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const loginData = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    };

    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const result = await response.json();
      if (result.success) {
        window.location.href = 'index.html';
      } else {
        document.getElementById('notification').innerText = result.message || 'Login failed.';
      }
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('notification').innerText = 'Error logging in.';
    }
  });
}

// Fetch All Users
if (document.getElementById('usersTable')) {
  async function fetchUsers() {
    try {
      const response = await fetch(`${apiUrl}/users`);
      const users = await response.json();
      const tbody = document.querySelector('#usersTable tbody');
      tbody.innerHTML = '';
      users.forEach(user => {
        const row = `<tr>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.phoneNo}</td>
          <td>${user.profession}</td>
          <td>
            <button class="btn btn-warning" onclick="editUser('${user._id}')">Edit</button>
            <button class="btn btn-danger" onclick="deleteUser('${user._id}')">Delete</button>
          </td>
        </tr>`;
        tbody.innerHTML += row;
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  fetchUsers();
}

// Delete User
async function deleteUser(userId) {
  try {
    await fetch(`${apiUrl}/users/${userId}`, { method: 'DELETE' });
    alert('User deleted successfully.');
    fetchUsers();
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}

// Edit User (to be implemented based on your logic)
function editUser(userId) {
  // You can populate a form with the user data and submit changes using an API call.
}
