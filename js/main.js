// Main application functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Main.js loaded');
    
    // Check authentication on ALL pages including login page
    // Hanya izinkan akses ke login page tanpa auth
    if (!window.location.pathname.includes('index.html') && 
        window.location.pathname !== '/' &&
        !window.location.pathname.endsWith('index.html')) {
        console.log('Checking authentication...');
        if (!checkAuth()) {
            return;
        }
    } else {
        // Jika di halaman login, redirect ke dashboard jika sudah login
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const currentUser = localStorage.getItem('currentUser');
        
        if (isLoggedIn && currentUser) {
            console.log('User already logged in, redirecting to dashboard');
            window.location.href = 'dashboard.html';
            return;
        }
    }
    
    // Display current user in dashboard
    const currentUserElement = document.getElementById('currentUser');
    if (currentUserElement) {
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        currentUserElement.textContent = user.name || 'User';
    }
});

// GitHub Pages configuration dengan folder app/
const GITHUB_PAGES_CONFIG = {
    basePath: '/MixMaster/',
    appFolder: 'app/',
    isGitHubPages: window.location.hostname.includes('github.io')
};

// Export config untuk digunakan di dashboard
window.GITHUB_PAGES_CONFIG = GITHUB_PAGES_CONFIG;

// Check auth function - PERBAIKAN: return false dan redirect
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = localStorage.getItem('currentUser');
    
    console.log('Auth check - isLoggedIn:', isLoggedIn, 'currentUser:', currentUser);
    
    if (!isLoggedIn || !currentUser) {
        console.log('User not authenticated, redirecting to login');
        window.location.href = 'index.html';
        return false;
    }
    
    console.log('User authenticated successfully');
    return true;
}

// Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Export functions for global access
window.logout = logout;
window.checkAuth = checkAuth;
