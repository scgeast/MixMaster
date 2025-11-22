// Simple authentication system
const users = [
    { username: 'admin', password: 'admin123', name: 'Administrator' },
    { username: 'user', password: 'user123', name: 'Regular User' },
    { username: 'operator', password: 'operator123', name: 'Operator' }
];

// Check if user is logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = localStorage.getItem('currentUser');
    
    console.log('Auth check - isLoggedIn:', isLoggedIn, 'currentUser:', currentUser);
    
    if (!isLoggedIn || !currentUser) {
        console.log('User not authenticated, redirecting to login');
        if (!window.location.pathname.includes('index.html')) {
            window.location.href = 'index.html';
        }
        return false;
    }
    
    console.log('User authenticated successfully');
    return true;
}

// Login function
function handleLogin(event) {
    if (event) event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    console.log('Login attempt:', username);
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Login successful
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        console.log('Login successful for user:', user.name);
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        // Login failed
        console.log('Login failed for user:', username);
        alert('Username atau password salah! Silakan coba lagi.');
        
        // Clear password field
        document.getElementById('password').value = '';
        document.getElementById('username').focus();
    }
}

// Initialize auth system
document.addEventListener('DOMContentLoaded', function() {
    console.log('Auth.js initialized');
    
    const loginForm = document.getElementById('loginForm');
    const currentUserElement = document.getElementById('currentUser');
    
    // Setup login form
    if (loginForm) {
        console.log('Login form found, setting up event listener');
        loginForm.addEventListener('submit', handleLogin);
        
        // Set focus to username field
        document.getElementById('username').focus();
    }
    
    // Display current user if element exists
    if (currentUserElement) {
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        currentUserElement.textContent = user.name || 'User';
        console.log('Current user displayed:', user.name);
    }
    
    // Auto-redirect to dashboard if already logged in and on login page
    if (window.location.pathname.includes('index.html') || 
        window.location.pathname.endsWith('/')) {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const currentUser = localStorage.getItem('currentUser');
        
        if (isLoggedIn && currentUser) {
            console.log('User already logged in, redirecting to dashboard');
            window.location.href = 'dashboard.html';
        }
    }
});

// Logout function
function logout() {
    console.log('Logging out user');
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    
    console.log('User logged out:', user.name);
    alert('Anda telah logout!');
    
    window.location.href = 'index.html';
}

// Export functions for global access
window.handleLogin = handleLogin;
window.logout = logout;
window.checkAuth = checkAuth;
window.users = users;
