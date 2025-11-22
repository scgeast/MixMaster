// Main application functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Main.js loaded');
    
    // Check authentication on pages other than login
    if (!window.location.pathname.includes('index.html') && 
        window.location.pathname !== '/' &&
        !window.location.pathname.endsWith('index.html')) {
        checkAuth();
    }
    
    // Display current user in dashboard
    const currentUserElement = document.getElementById('currentUser');
    if (currentUserElement) {
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        currentUserElement.textContent = user.name || 'User';
    }
});

// GitHub Pages configuration
const GITHUB_PAGES_CONFIG = {
    basePath: '/MixMaster/',
    isGitHubPages: window.location.hostname.includes('github.io')
};

// Function to open applications
function openApp(appName) {
    const basePath = GITHUB_PAGES_CONFIG.isGitHubPages ? GITHUB_PAGES_CONFIG.basePath : '';
    
    const appPaths = {
        'monitoring-order': `${basePath}monitoring-order-delivery/index.html`,
        'jadwal-pengecoran': `${basePath}jadwal-pengecoran/index.html`,
        'utilisasi-truck': `${basePath}utilisasi-truck/index.html`,
        'production-all-area': `${basePath}production-all-area/index.html`,
        'summary-daily-delivery': `${basePath}summary-daily-delivery/index.html`
    };
    
    const appPath = appPaths[appName];
    if (appPath) {
        // Open aplikasi di tab baru
        const newWindow = window.open(appPath, '_blank');
        
        // Handle popup blocker
        if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
            if (confirm('Popup diblokir! Buka aplikasi di tab ini?')) {
                window.location.href = appPath;
            }
        }
    }
}

// Silent test function (no UI output)
function testAllPathsSilent() {
    const basePath = GITHUB_PAGES_CONFIG.isGitHubPages ? GITHUB_PAGES_CONFIG.basePath : '';
    
    const appPaths = {
        'monitoring-order': `${basePath}monitoring-order-delivery/index.html`,
        'jadwal-pengecoran': `${basePath}jadwal-pengecoran/index.html`,
        'utilisasi-truck': `${basePath}utilisasi-truck/index.html`,
        'production-all-area': `${basePath}production-all-area/index.html`,
        'summary-daily-delivery': `${basePath}summary-daily-delivery/index.html`
    };
    
    // Test semua path di background
    Object.entries(appPaths).forEach(([appName, path]) => {
        fetch(path, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    console.log(`✅ ${appName}: Ready`);
                } else {
                    console.log(`❌ ${appName}: Not found`);
                }
            })
            .catch(error => {
                console.log(`❌ ${appName}: Error - ${error.message}`);
            });
    });
}

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
window.openApp = openApp;
window.logout = logout;
window.checkAuth = checkAuth;
window.testAllPathsSilent = testAllPathsSilent;
