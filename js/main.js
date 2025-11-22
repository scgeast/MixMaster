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

// Function to open applications - PATH YANG BENAR
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
        console.log('Trying to open:', appPath);
        
        // Test if file exists first dengan timeout
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), 3000)
        );
        
        const fetchPromise = fetch(appPath, { method: 'HEAD' });
        
        Promise.race([fetchPromise, timeoutPromise])
            .then(response => {
                if (response.ok) {
                    console.log('✓ File found:', appPath);
                    // File exists, open in new tab
                    const newWindow = window.open(appPath, '_blank');
                    if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
                        // Popup blocked, redirect in same window
                        if (confirm('Popup diblokir! Buka aplikasi di tab ini?')) {
                            window.location.href = appPath;
                        }
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
    
    // Check if it's GitHub Pages environment
    const isGitHubPages = window.location.hostname.includes('github.io');
    
    const errorMsg = `
File aplikasi tidak ditemukan!

Aplikasi: ${title}
Path: ${path}
Environment: ${isGitHubPages ? 'GitHub Pages' : 'Local'}

Kemungkinan masalah:
1. Folder "${getFolderName(appName)}" tidak ada
2. File "index.html" tidak ada di folder tersebut  
3. Case sensitivity (huruf besar/kecil tidak sesuai)
4. GitHub Pages belum deploy

Folder yang harus ada:
• monitoring-order-delivery/
• jadwal-pengecoran/
• utilisasi-truck/
• production-all-area/
• summary-daily-delivery/
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

// Test function untuk debugging
function testAllPaths() {
    console.log('=== TESTING ALL APPLICATION PATHS ===');
    const appPaths = {
        'monitoring-order': 'monitoring-order-delivery/index.html',
        'jadwal-pengecoran': 'jadwal-pengecoran/index.html',
        'utilisasi-truck': 'utilisasi-truck/index.html',
        'production-all-area': 'production-all-area/index.html',
        'summary-daily-delivery': 'summary-daily-delivery/index.html'
    };
    
    let foundCount = 0;
    let totalCount = Object.keys(appPaths).length;
    
    Object.entries(appPaths).forEach(([appName, path]) => {
        console.log(`Testing: ${appName} -> ${path}`);
        
        fetch(path, { method: 'HEAD' })
            .then(response => {
                const status = response.ok ? '✓ FOUND' : '✗ NOT FOUND';
                console.log(`${appName}: ${path} - ${status}`);
                
                if (response.ok) foundCount++;
                
                // Update UI jika elemen debug info ada
                const debugInfo = document.getElementById('debugInfo');
                if (debugInfo) {
                    debugInfo.innerHTML = `Tested: ${foundCount}/${totalCount} apps found`;
                }
                
                if (foundCount === totalCount) {
                    console.log('🎉 All applications found!');
                    if (debugInfo) {
                        debugInfo.innerHTML += ' 🎉 All apps available!';
                    }
                }
            })
            .catch(error => {
                console.log(`${appName}: ${path} - ✗ ERROR: ${error.message}`);
            });
    });
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

// Export functions for global access
window.openApp = openApp;
window.logout = logout;
window.checkAuth = checkAuth;
window.testAllPaths = testAllPaths;
