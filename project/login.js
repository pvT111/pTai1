// Handle form submission for login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get entered username and password
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if the user exists in localStorage
    const storedUser = JSON.parse(localStorage.getItem('users')) || [];

    // Find user with matching credentials
    const user = storedUser.find(u => u.username === username && u.password === password);

    if (user) {
        // User is found, store login status in localStorage
        localStorage.setItem('loggedIn', 'true');
        window.location.href = 'dashboard.html'; // Redirect to dashboard
    } else {
        // Show error message if credentials are wrong
        document.getElementById('loginError').style.display = 'block';
    }
});
