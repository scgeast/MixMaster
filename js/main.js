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
    
    // Mapping yang sesuai dengan struktur GitHub
    const appMappings = {
        'monitoring-order': {
            folder: 'monitoring-order-delivery',
            title: 'Daily Monitoring Order & Delivery'
        },
        'jadwal-pengecoran': {
            folder: 'jadwal-pengecoran', 
            title: 'Jadwal Pengecoran'
        },
        'utilisasi-truck': {
            folder: 'utilisasi-truck',
            title: 'Utilisasi Truck Mixer'
        },
        'production-all-area': {
            folder: 'production-all-area',
            title: 'Production All Area'
        },
        'summary-daily-delivery': {
            folder: 'summary-daily-delivery',
            title: 'Summary Daily Delivery'
        }
    };
    
    const appConfig = appMappings[appName];
    
    if (appConfig) {
        const appPath = `${appConfig.folder}/index.html`;
        console.log('Opening:', appPath);
        console.log('App Title:', appConfig.title);
        
        // Direct open - lebih simple
        try {
            const newWindow = window.open(appPath, '_blank');
            
            if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
                // Popup blocked
                if (confirm(`Popup diblokir. Buka "${appConfig.title}" di tab ini?`)) {
                    window.location.href = appPath;
                }
            } else {
                console.log('✓ Successfully opened:', appPath);
            }
        } catch (error) {
            console.error('Error opening app:', error);
            alert(`Error membuka aplikasi: ${appConfig.title}\n\nPath: ${appPath}\nError: ${error.message}`);
        }
    } else {
        alert('Aplikasi tidak ditemukan!');
    }
}

// Test function untuk debugging
function testAllPaths() {
    console.log('=== TESTING ALL APPLICATION PATHS ===');
    
    const apps = {
        'monitoring-order': 'monitoring-order-delivery/index.html',
        'jadwal-pengecoran': 'jadwal-pengecoran/index.html',
        'utilisasi-truck': 'utilisasi-truck/index.html', 
        'production-all-area': 'production-all-area/index.html',
        'summary-daily-delivery': 'summary-daily-delivery/index.html'
    };
    
    let results = [];
    let tested = 0;
    const total = Object.keys(apps).length;
    
    const debugInfo = document.getElementById('debugInfo');
    if (debugInfo) {
        debugInfo.innerHTML = 'Testing application paths...';
    }
    
    Object.entries(apps).forEach(([appName, path]) => {
        console.log(`Testing: ${appName} -> ${path}`);
        
        fetch(path, { method: 'HEAD' })
            .then(response => {
                tested++;
                const status = response.ok ? '✅' : '❌';
                const message = response.ok ? 'FOUND' : 'NOT FOUND';
                
                console.log(`${status} ${appName}: ${path} - ${message}`);
                results.push(`${status} ${appName}`);
                
                // Update UI
                if (debugInfo) {
                    const progress = `(${tested}/${total})`;
                    debugInfo.innerHTML = `
                        <strong>Application Status ${progress}:</strong><br>
                        ${results.join('<br>')}
                        ${tested === total ? '<br><br>🎉 Testing completed!' : ''}
                    `;
                }
            })
            .catch(error => {
                tested++;
                console.log(`❌ ${appName}: ${path} - ERROR: ${error.message}`);
                results.push(`❌ ${appName} (ERROR)`);
                
                if (debugInfo) {
                    const progress = `(${tested}/${total})`;
                    debugInfo.innerHTML = `
                        <strong>Application Status ${progress}:</strong><br>
                        ${results.join('<br>')}
                    `;
                }
            });
    });
}

// Quick test single app
function testApp(appName) {
    const apps = {
        'monitoring-order': 'monitoring-order-delivery/index.html',
        'jadwal-pengecoran': 'jadwal-pengecoran/index.html',
        'utilisasi-truck': 'utilisasi-truck/index.html',
        'production-all-area': 'production-all-area/index.html',
        'summary-daily-delivery': 'summary-daily-delivery/index.html'
    };
    
    const path = apps[appName];
    if (path) {
        console.log(`Testing single app: ${appName} -> ${path}`);
        
        fetch(path, { method: 'HEAD' })
            .then(response => {
                const status = response.ok ? '✅ FOUND' : '❌ NOT FOUND';
                alert(`${appName}\nPath: ${path}\nStatus: ${status}`);
            })
            .catch(error => {
                alert(`${appName}\nPath: ${path}\nStatus: ❌ ERROR\n${error.message}`);
            });
    }
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
window.testAllPaths = testAllPaths;
window.testApp = testApp;
