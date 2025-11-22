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

// Function to open applications - FIXED PATHS
function openApp(appName) {
    console.log('Opening app:', appName);
    
    const appPaths = {
        'monitoring-order': './monitoring-order-delivery/index.html',
        'jadwal-pengecoran': './jadwal-pengecoran/index.html',
        'utilisasi-truck': './utilisasi-truck/index.html',
        'production-all-area': './production-all-area/index.html',
        'summary-daily-delivery': './summary-daily-delivery/index.html'
    };
    
    const appPath = appPaths[appName];
    if (appPath) {
        console.log('Trying to open:', appPath);
        
        // Test if file exists first
        fetch(appPath, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    console.log('✓ File found:', appPath);
                    // File exists, open in new tab
                    const newWindow = window.open(appPath, '_blank');
                    if (!newWindow) {
                        alert('Popup blocked! Please allow popups for this site.');
                    }
                } else {
                    console.error('✗ File not found:', appPath);
                    showFileError(appName, appPath);
                }
            })
            .catch(error => {
                console.error('✗ Error accessing:', appPath, error);
                showFileError(appName, appPath);
            });
    } else {
        alert('Aplikasi tidak dikonfigurasi dengan benar!');
    }
}

// Show detailed error message
function showFileError(appName, path) {
    const appTitles = {
        'monitoring-order': 'Daily Monitoring Order & Delivery',
        'jadwal-pengecoran': 'Jadwal Pengecoran',
        'utilisasi-truck': 'Utilisasi Truck Mixer',
        'production-all-area': 'Production All Area',
        'summary-daily-delivery': 'Summary Daily Delivery'
    };
    
    const title = appTitles[appName] || appName;
    
    const errorMsg = `
File aplikasi tidak ditemukan!

Aplikasi: ${title}
Path: ${path}

Pastikan:
1. Folder "${getFolderName(appName)}" ada di root directory
2. File "index.html" ada di dalam folder tersebut
3. Nama folder sesuai dengan yang terdaftar
    `;
    
    alert(errorMsg);
}

// Get folder name from app name
function getFolderName(appName) {
    const folders = {
        'monitoring-order': 'monitoring-order-delivery',
        'jadwal-pengecoran': 'jadwal-pengecoran',
        'utilisasi-truck': 'utilisasi-truck',
        'production-all-area': 'production-all-area',
        'summary-daily-delivery': 'summary-daily-delivery'
    };
    return folders[appName] || appName;
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

// Utility function to test all paths
function testAllPaths() {
    console.log('=== TESTING ALL APPLICATION PATHS ===');
    const appPaths = {
        'monitoring-order': './monitoring-order-delivery/index.html',
        'jadwal-pengecoran': './jadwal-pengecoran/index.html',
        'utilisasi-truck': './utilisasi-truck/index.html',
        'production-all-area': './production-all-area/index.html',
        'summary-daily-delivery': './summary-daily-delivery/index.html'
    };
    
    let results = [];
    
    Object.entries(appPaths).forEach(([appName, path]) => {
        fetch(path, { method: 'HEAD' })
            .then(response => {
                const status = response.ok ? '✓ FOUND' : '✗ NOT FOUND';
                console.log(`${appName}: ${path} - ${status}`);
                results.push(`${appName}: ${status}`);
                
                // Update debug info
                if (results.length === Object.keys(appPaths).length) {
                    document.getElementById('debugInfo').textContent = 
                        'Test selesai. Lihat console untuk detail.';
                }
            })
            .catch(error => {
                console.log(`${appName}: ${path} - ✗ ERROR: ${error.message}`);
                results.push(`${appName}: ERROR`);
            });
    });
}

// Export functions for global access
window.openApp = openApp;
window.logout = logout;
window.checkAuth = checkAuth;
window.testAllPaths = testAllPaths;
