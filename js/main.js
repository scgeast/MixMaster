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

// Function to open applications
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
        window.open(appPath, '_blank');
    }
}

// Deep diagnostic function
function deepDiagnostic() {
    console.log('=== DEEP DIAGNOSTIC ===');
    
    const tests = [
        // Test folder existence
        { type: 'folder', path: 'monitoring-order-delivery/', name: 'Monitoring Order' },
        { type: 'folder', path: 'jadwal-pengecoran/', name: 'Jadwal Pengecoran' },
        { type: 'folder', path: 'utilisasi-truck/', name: 'Utilisasi Truck' },
        { type: 'folder', path: 'production-all-area/', name: 'Production Area' },
        { type: 'folder', path: 'summary-daily-delivery/', name: 'Summary Delivery' },
        
        // Test index.html files
        { type: 'file', path: 'monitoring-order-delivery/index.html', name: 'Monitoring Index' },
        { type: 'file', path: 'jadwal-pengecoran/index.html', name: 'Jadwal Index' },
        { type: 'file', path: 'utilisasi-truck/index.html', name: 'Truck Index' },
        { type: 'file', path: 'production-all-area/index.html', name: 'Production Index' },
        { type: 'file', path: 'summary-daily-delivery/index.html', name: 'Summary Index' },
        
        // Test root files
        { type: 'file', path: 'index.html', name: 'Main Index' },
        { type: 'file', path: 'dashboard.html', name: 'Dashboard' },
        { type: 'file', path: 'css/style.css', name: 'CSS File' },
        { type: 'file', path: 'js/auth.js', name: 'Auth JS' },
        { type: 'file', path: 'js/main.js', name: 'Main JS' }
    ];
    
    let results = [];
    let completed = 0;
    
    const debugInfo = document.getElementById('debugInfo');
    if (debugInfo) {
        debugInfo.innerHTML = 'Running deep diagnostic...';
    }
    
    tests.forEach(test => {
        fetch(test.path, { method: 'HEAD' })
            .then(response => {
                completed++;
                const status = response.ok ? '✅' : '❌';
                results.push(`${status} ${test.name}: ${test.path}`);
                
                if (debugInfo) {
                    debugInfo.innerHTML = `
                        <strong>Deep Diagnostic (${completed}/${tests.length}):</strong><br>
                        ${results.join('<br>')}
                    `;
                }
                
                if (completed === tests.length) {
                    showDiagnosticSummary(results);
                }
            })
            .catch(error => {
                completed++;
                results.push(`❌ ${test.name}: ${test.path} (ERROR)`);
                
                if (debugInfo) {
                    debugInfo.innerHTML = `
                        <strong>Deep Diagnostic (${completed}/${tests.length}):</strong><br>
                        ${results.join('<br>')}
                    `;
                }
                
                if (completed === tests.length) {
                    showDiagnosticSummary(results);
                }
            });
    });
}

function showDiagnosticSummary(results) {
    const folderResults = results.filter(r => r.includes('/') && !r.includes('.html'));
    const fileResults = results.filter(r => r.includes('.html'));
    
    const missingFolders = folderResults.filter(r => r.includes('❌'));
    const missingFiles = fileResults.filter(r => r.includes('❌'));
    
    let summary = `
<strong>📊 DIAGNOSTIC SUMMARY</strong><br><br>
<strong>Folder Status:</strong><br>
${folderResults.join('<br>')}<br><br>
<strong>File Status:</strong><br>
${fileResults.join('<br>')}<br><br>
`;

    if (missingFolders.length > 0) {
        summary += `<strong>🚨 MASALAH UTAMA:</strong><br>`;
        summary += `Folder berikut TIDAK DITEMUKAN:<br>`;
        missingFolders.forEach(folder => {
            const folderName = folder.split(':')[1].trim();
            summary += `• ${folderName}<br>`;
        });
        summary += `<br><strong>SOLUSI:</strong><br>`;
        summary += `1. Pastikan folder aplikasi ada di root<br>`;
        summary += `2. Upload folder aplikasi ke GitHub<br>`;
        summary += `3. Nama folder harus sama persis<br>`;
    }
    
    const debugInfo = document.getElementById('debugInfo');
    if (debugInfo) {
        debugInfo.innerHTML = summary;
    }
}

// Check what actually exists
function scanDirectory() {
    console.log('=== DIRECTORY SCAN ===');
    
    // Common possible folder names
    const possiblePaths = [
        'app/',
        'apps/',
        'applications/',
        'monitoring/',
        'delivery/',
        'order/',
        'production/',
        'schedule/',
        'truck/',
        'utilization/',
        'summary/',
        'jadwal/',
        'pengecoran/'
    ];
    
    let foundItems = [];
    
    possiblePaths.forEach(path => {
        fetch(path, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    console.log('✅ Found:', path);
                    foundItems.push(path);
                }
            })
            .catch(() => {});
    });
    
    // Check after all requests
    setTimeout(() => {
        const debugInfo = document.getElementById('debugInfo');
        if (debugInfo) {
            if (foundItems.length > 0) {
                debugInfo.innerHTML = `
                    <strong>📁 Found Directories:</strong><br>
                    ${foundItems.join('<br>')}<br><br>
                    <strong>💡 Solution:</strong><br>
                    Update app paths in main.js to match these directories
                `;
            } else {
                debugInfo.innerHTML = `
                    <strong>❌ No directories found!</strong><br><br>
                    <strong>Problem:</strong> Application folders missing<br>
                    <strong>Solution:</strong> Upload application folders to root directory
                `;
            }
        }
    }, 2000);
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
    
    let results = [];
    let tested = 0;
    const total = Object.keys(appPaths).length;
    
    const debugInfo = document.getElementById('debugInfo');
    if (debugInfo) {
        debugInfo.innerHTML = 'Testing application paths...';
    }
    
    Object.entries(appPaths).forEach(([appName, path]) => {
        fetch(path, { method: 'HEAD' })
            .then(response => {
                tested++;
                const status = response.ok ? '✅' : '❌';
                results.push(`${status} ${appName}`);
                
                if (debugInfo) {
                    debugInfo.innerHTML = `
                        <strong>Application Status (${tested}/${total}):</strong><br>
                        ${results.join('<br>')}
                        ${tested === total ? '<br><br>🎉 Testing completed!' : ''}
                    `;
                }
            })
            .catch(error => {
                tested++;
                results.push(`❌ ${appName}`);
                
                if (debugInfo) {
                    debugInfo.innerHTML = `
                        <strong>Application Status (${tested}/${total}):</strong><br>
                        ${results.join('<br>')}
                    `;
                }
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
window.testAllPaths = testAllPaths;
window.deepDiagnostic = deepDiagnostic;
window.scanDirectory = scanDirectory;
