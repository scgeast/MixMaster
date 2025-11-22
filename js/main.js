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
        console.log('Current user:', user.name);
    }
});

// Function to open applications - SESUAI STRUKTUR GITHUB
function openApp(appName) {
    console.log('Opening app:', appName);
    
    const appPaths = {
        'monitoring-order': 'monitoring-order-delivery/index.html',
        'jadwal-pengecoran': 'jadwal-pengecoran/index.html',
        'utilisasi-truck': 'utilisasi-truck/index.html',
        'production-all-area': 'production-all-area/index.html',
        'summary-daily-delivery': 'summary-daily-delivery/index.html'
    };
    
    const appPath = appPaths[appName];
    if (appPath) {
        console.log('Full path:', appPath);
        
        // Test if file exists first
        fetch(appPath, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    // File exists, open in new tab
                    window.open(appPath, '_blank');
                } else {
                    alert('File aplikasi tidak ditemukan: ' + appPath);
                    console.error('File not found:', appPath);
                }
            })
            .catch(error => {
                alert('Error mengakses aplikasi: ' + appPath);
                console.error('Error:', error);
            });
    } else {
        alert('Aplikasi tidak dikonfigurasi dengan benar!');
    }
}

// Check auth function
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = localStorage.getItem('currentUser');
    
    console.log('Auth check - isLoggedIn:', isLoggedIn, 'currentUser:', currentUser);
    
    if (!isLoggedIn || !currentUser) {
        console.log('Not authenticated, redirecting to login');
        window.location.href = 'index.html';
        return false;
    }
    console.log('User is authenticated');
    return true;
}

// Logout function
function logout() {
    console.log('Logging out...');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Utility function to test all paths
function testAllPaths() {
    console.log('=== TESTING ALL APPLICATION PATHS ===');
    const appPaths = {
        'monitoring-order': 'monitoring-order-delivery/index.html',
        'jadwal-pengecoran': 'jadwal-pengecoran/index.html',
        'utilisasi-truck': 'utilisasi-truck/index.html',
        'production-all-area': 'production-all-area/index.html',
        'summary-daily-delivery': 'summary-daily-delivery/index.html'
    };
    
    for (const [appName, path] of Object.entries(appPaths)) {
        fetch(path, { method: 'HEAD' })
            .then(response => {
                console.log(`${appName}: ${path} - ${response.ok ? '✓ FOUND' : '✗ NOT FOUND'}`);
            })
            .catch(error => {
                console.log(`${appName}: ${path} - ✗ ERROR: ${error.message}`);
            });
    }
}

// Export functions for global access
window.openApp = openApp;
window.logout = logout;
window.checkAuth = checkAuth;
window.testAllPaths = testAllPaths;
