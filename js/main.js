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

// GitHub Pages configuration for MixMaster repository
const GITHUB_PAGES_CONFIG = {
    basePath: '/MixMaster/', // Sesuai dengan repository name
    isGitHubPages: window.location.hostname.includes('github.io'),
    repository: 'MixMaster',
    username: 'sceeast'
};

// Function to open applications - FIXED FOR MixMaster REPOSITORY
function openApp(appName) {
    console.log('Opening app:', appName);
    
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
        console.log('📁 Repository:', GITHUB_PAGES_CONFIG.repository);
        console.log('🌐 Base Path:', basePath);
        console.log('🚀 Opening:', appPath);
        
        const newWindow = window.open(appPath, '_blank');
        
        if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
            // Popup blocked, show direct link
            if (confirm(`Popup diblokir! Mau buka aplikasi di tab ini?\n\n${appPath}`)) {
                window.location.href = appPath;
            }
        }
    } else {
        alert('Aplikasi tidak dikonfigurasi dengan benar!');
    }
}

// Test function untuk debugging dengan MixMaster repository
function testAllPaths() {
    console.log('=== TESTING PATHS FOR MixMaster REPOSITORY ===');
    console.log('GitHub Pages Config:', GITHUB_PAGES_CONFIG);
    
    const basePath = GITHUB_PAGES_CONFIG.isGitHubPages ? GITHUB_PAGES_CONFIG.basePath : '';
    
    const appPaths = {
        'monitoring-order': `${basePath}monitoring-order-delivery/index.html`,
        'jadwal-pengecoran': `${basePath}jadwal-pengecoran/index.html`,
        'utilisasi-truck': `${basePath}utilisasi-truck/index.html`,
        'production-all-area': `${basePath}production-all-area/index.html`,
        'summary-daily-delivery': `${basePath}summary-daily-delivery/index.html`
    };
    
    let results = [];
    let tested = 0;
    const total = Object.keys(appPaths).length;
    
    const debugInfo = document.getElementById('debugInfo');
    if (debugInfo) {
        debugInfo.innerHTML = `
            <strong>🔍 Testing MixMaster Repository</strong><br>
            📁 Repository: ${GITHUB_PAGES_CONFIG.repository}<br>
            🌐 Base Path: <code>${basePath}</code><br>
            🔗 Full URL: ${window.location.href}<br>
            <br>Testing applications...
        `;
    }
    
    Object.entries(appPaths).forEach(([appName, path]) => {
        console.log(`Testing: ${appName} -> ${path}`);
        
        // Add timeout untuk avoid hanging
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), 5000)
        );
        
        const fetchPromise = fetch(path, { method: 'HEAD' });
        
        Promise.race([fetchPromise, timeoutPromise])
            .then(response => {
                tested++;
                const status = response.ok ? '✅' : '❌';
                const message = response.ok ? 'FOUND' : 'NOT FOUND';
                results.push(`${status} ${appName} - ${message}`);
                
                if (debugInfo) {
                    const progress = `(${tested}/${total})`;
                    debugInfo.innerHTML = `
                        <strong>🔍 MixMaster Test ${progress}</strong><br>
                        📁 Repository: ${GITHUB_PAGES_CONFIG.repository}<br>
                        🌐 Base Path: <code>${basePath}</code><br>
                        <br><strong>Results:</strong><br>
                        ${results.join('<br>')}
                        ${tested === total ? '<br><br>🎉 Testing completed!' : ''}
                    `;
                }
                
                console.log(`${status} ${appName}: ${path} - ${message}`);
            })
            .catch(error => {
                tested++;
                results.push(`❌ ${appName} - ERROR: ${error.message}`);
                
                if (debugInfo) {
                    const progress = `(${tested}/${total})`;
                    debugInfo.innerHTML = `
                        <strong>🔍 MixMaster Test ${progress}</strong><br>
                        📁 Repository: ${GITHUB_PAGES_CONFIG.repository}<br>
                        🌐 Base Path: <code>${basePath}</code><br>
                        <br><strong>Results:</strong><br>
                        ${results.join('<br>')}
                    `;
                }
                
                console.log(`❌ ${appName}: ${path} - ERROR: ${error.message}`);
            });
    });
}

// Test direct URL access
function testDirectUrls() {
    const baseUrl = 'https://sceeast.github.io/MixMaster';
    
    const urls = {
        'Monitoring': `${baseUrl}/monitoring-order-delivery/index.html`,
        'Jadwal': `${baseUrl}/jadwal-pengecoran/index.html`,
        'Truck': `${baseUrl}/utilisasi-truck/index.html`,
        'Production': `${baseUrl}/production-all-area/index.html`,
        'Summary': `${baseUrl}/summary-daily-delivery/index.html`
    };
    
    let message = '🔗 Direct URL Test:\n\n';
    Object.entries(urls).forEach(([name, url]) => {
        message += `${name}:\n${url}\n\n`;
    });
    
    message += '📋 Copy dan test manual di browser!';
    alert(message);
}

// Check GitHub Pages setup
function checkGitHubPagesSetup() {
    const info = {
        'Repository': GITHUB_PAGES_CONFIG.repository,
        'Username': GITHUB_PAGES_CONFIG.username,
        'Base Path': GITHUB_PAGES_CONFIG.basePath,
        'Full URL': window.location.href,
        'Is GitHub Pages': GITHUB_PAGES_CONFIG.isGitHubPages ? 'Yes' : 'No',
        'Expected App URL': `https://${GITHUB_PAGES_CONFIG.username}.github.io/${GITHUB_PAGES_CONFIG.repository}/`
    };
    
    alert('GitHub Pages Setup - MixMaster Repository:\n\n' + 
          Object.entries(info).map(([key, value]) => 
            `📍 ${key}: ${value}`
          ).join('\n'));
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
window.testDirectUrls = testDirectUrls;
window.checkGitHubPagesSetup = checkGitHubPagesSetup;
