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

// Function to open applications - AUTO DETECT ENVIRONMENT
function openApp(appName) {
    console.log('Opening app:', appName);
    
    // Auto-detect if we're on GitHub Pages
    const isGitHubPages = window.location.hostname.includes('github.io');
    const basePath = isGitHubPages ? '' : './';
    
    const appPaths = {
        'monitoring-order': `${basePath}monitoring-order-delivery/index.html`,
        'jadwal-pengecoran': `${basePath}jadwal-pengecoran/index.html`,
        'utilisasi-truck': `${basePath}utilisasi-truck/index.html`,
        'production-all-area': `${basePath}production-all-area/index.html`,
        'summary-daily-delivery': `${basePath}summary-daily-delivery/index.html`
    };
    
    const appPath = appPaths[appName];
    if (appPath) {
        console.log('Environment:', isGitHubPages ? 'GitHub Pages' : 'Local');
        console.log('Trying to open:', appPath);
        
        // Direct open tanpa test fetch dulu (lebih cepat)
        console.log('✓ Opening application directly:', appPath);
        const newWindow = window.open(appPath, '_blank');
        
        if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
            // Popup blocked, redirect in same window after confirmation
            if (confirm('Popup mungkin diblokir browser. Buka aplikasi di tab yang sama?')) {
                window.location.href = appPath;
            }
        }
    } else {
        alert('Aplikasi tidak dikonfigurasi dengan benar!');
    }
}

// Test function untuk debugging
function testAllPaths() {
    console.log('=== TESTING ALL APPLICATION PATHS ===');
    const isGitHubPages = window.location.hostname.includes('github.io');
    const basePath = isGitHubPages ? '' : './';
    
    const appPaths = {
        'monitoring-order': `${basePath}monitoring-order-delivery/index.html`,
        'jadwal-pengecoran': `${basePath}jadwal-pengecoran/index.html`,
        'utilisasi-truck': `${basePath}utilisasi-truck/index.html`,
        'production-all-area': `${basePath}production-all-area/index.html`,
        'summary-daily-delivery': `${basePath}summary-daily-delivery/index.html`
    };
    
    let foundCount = 0;
    let totalCount = Object.keys(appPaths).length;
    
    // Clear previous results
    const debugInfo = document.getElementById('debugInfo');
    if (debugInfo) {
        debugInfo.innerHTML = 'Testing...';
    }
    
    Object.entries(appPaths).forEach(([appName, path]) => {
        console.log(`Testing: ${appName} -> ${path}`);
        
        fetch(path, { method: 'HEAD' })
            .then(response => {
                const status = response.ok ? '✓ FOUND' : '✗ NOT FOUND';
                console.log(`${appName}: ${path} - ${status}`);
                
                if (response.ok) foundCount++;
                
                // Update UI
                if (debugInfo) {
                    debugInfo.innerHTML = `
                        <strong>Test Results:</strong><br>
                        Environment: ${isGitHubPages ? 'GitHub Pages' : 'Local'}<br>
                        Found: ${foundCount}/${totalCount} applications<br>
                        ${foundCount === totalCount ? '🎉 All apps available!' : '⚠️ Some apps missing'}
                    `;
                }
            })
            .catch(error => {
                console.log(`${appName}: ${path} - ✗ ERROR: ${error.message}`);
                if (debugInfo) {
                    debugInfo.innerHTML = `
                        <strong>Test Results:</strong><br>
                        Environment: ${isGitHubPages ? 'GitHub Pages' : 'Local'}<br>
                        Error: ${error.message}<br>
                        ⚠️ Check console for details
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
