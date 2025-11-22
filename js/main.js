// Main application functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Main.js loaded');
    
    // Check authentication on pages other than login
    if (!window.location.pathname.includes('index.html') && 
        window.location.pathname !== '/' &&
        !window.location.pathname.endsWith('index.html')) {
        console.log('Checking authentication...');
        checkAuth();
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

// Check auth function
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = localStorage.getItem('currentUser');
    
    if (!isLoggedIn || !currentUser) {
        window.location.href = 'index.html';
        return false;
    }
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
