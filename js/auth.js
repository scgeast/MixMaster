// Simple authentication system
const users = [
    { username: 'admin', password: 'admin123', name: 'Kim Jong Un' },
    { username: 'user', password: 'user123', name: 'Regular User' },
    { username: 'operator', password: 'operator123', name: 'Operator' },
    { username: 'cdc', password: 'cdc2024', name: 'CDC Operator' }
];

// Check if user is logged in - PERBAIKAN: Tambahkan logic redirect
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = localStorage.getItem('currentUser');
    
    console.log('Auth check - isLoggedIn:', isLoggedIn, 'currentUser:', currentUser);
    
    if (!isLoggedIn || !currentUser) {
        console.log('User not authenticated, redirecting to login');
        // Redirect to login page
        if (!window.location.pathname.includes('index.html')) {
            window.location.href = 'index.html';
        }
        return false;
    }
    
    console.log('User authenticated successfully');
    return true;
}

// Login function - TIDAK ADA PERUBAHAN
function handleLogin(event) {
    if (event) event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    console.log('Login attempt:', username);
    
    // Show loading state
    const loginBtn = document.querySelector('.btn-login');
    const originalText = loginBtn.innerHTML;
    loginBtn.innerHTML = '<span>Processing...</span>';
    loginBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            // Login successful
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            console.log('Login successful for user:', user.name);
            
            // Show success message
            loginBtn.innerHTML = '<span>✓ Success!</span>';
            loginBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
            
            // Redirect to dashboard after short delay
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
            
        } else {
            // Login failed
            console.log('Login failed for user:', username);
            
            // Reset button
            loginBtn.innerHTML = originalText;
            loginBtn.disabled = false;
            
            // Shake animation for error
            loginBtn.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                loginBtn.style.animation = '';
            }, 500);
            
            alert('Invalid username or password! Please try again.');
            
            // Clear password field
            document.getElementById('password').value = '';
            document.getElementById('username').focus();
        }
    }, 1000);
}

// Initialize auth system - PERBAIKAN: Auto-redirect jika sudah login
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
        
        // Auto-redirect to dashboard if already logged in and on login page
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const currentUser = localStorage.getItem('currentUser');
        
        if (isLoggedIn && currentUser) {
            console.log('User already logged in, redirecting to dashboard');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 500);
        }
    }
    
    // Display current user if element exists
    if (currentUserElement) {
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        currentUserElement.textContent = user.name || 'User';
        console.log('Current user displayed:', user.name);
    }
});

// Logout function - TIDAK ADA PERUBAHAN
function logout() {
    console.log('Logging out user');
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    
    console.log('User logged out:', user.name);
    
    window.location.href = 'index.html';
}

// Add shake animation for login error
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Export functions for global access
window.handleLogin = handleLogin;
window.logout = logout;
window.checkAuth = checkAuth;
