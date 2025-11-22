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
    appFolder: 'app/', // Tambahkan folder app/
    isGitHubPages: window.location.hostname.includes('github.io')
};

// Function to open applications DALAM IFRAME
function openApp(appName) {
    const basePath = GITHUB_PAGES_CONFIG.isGitHubPages ? GITHUB_PAGES_CONFIG.basePath : '';
    const appFolder = GITHUB_PAGES_CONFIG.appFolder;
    
    const appConfigs = {
        'monitoring-order': {
            path: `${basePath}${appFolder}monitoring-order-delivery/index.html`,
            title: 'Daily Monitoring Order & Delivery'
        },
        'jadwal-pengecoran': {
            path: `${basePath}${appFolder}jadwal-pengecoran/index.html`,
            title: 'Jadwal Pengecoran'
        },
        'utilisasi-truck': {
            path: `${basePath}${appFolder}utilisasi-truck/index.html`,
            title: 'Utilisasi Truck Mixer'
        },
        'production-all-area': {
            path: `${basePath}${appFolder}production-all-area/index.html`,
            title: 'Production All Area'
        },
        'summary-daily-delivery': {
            path: `${basePath}${appFolder}summary-daily-delivery/index.html`,
            title: 'Summary Daily Delivery'
        }
    };
    
    const config = appConfigs[appName];
    if (!config) {
        alert('Aplikasi tidak dikenali!');
        return;
    }
    
    console.log('Opening app in iframe:', config.title, config.path);
    
    // Create app viewer page dengan iframe
    const appViewerHTML = `
        <!DOCTYPE html>
        <html lang="id">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${config.title} - Mix Master CDC EAST</title>
            <link rel="stylesheet" href="css/style.css">
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }
                .app-header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 15px 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }
                .app-header h1 {
                    margin: 0;
                    font-size: 1.4em;
                    font-weight: 600;
                }
                .header-buttons {
                    display: flex;
                    gap: 10px;
                    align-items: center;
                }
                .btn-back, .btn-logout {
                    background: rgba(255, 255, 255, 0.2);
                    color: white;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    padding: 8px 15px;
                    border-radius: 5px;
                    cursor: pointer;
                    text-decoration: none;
                    font-size: 14px;
                }
                .btn-back:hover, .btn-logout:hover {
                    background: rgba(255, 255, 255, 0.3);
                }
                .app-frame {
                    width: 100%;
                    height: calc(100vh - 70px);
                    border: none;
                    display: block;
                }
                .user-info {
                    color: white;
                    margin-right: 15px;
                    font-size: 14px;
                }
            </style>
        </head>
        <body>
            <div class="app-header">
                <h1>${config.title}</h1>
                <div class="header-buttons">
                    <span class="user-info" id="appCurrentUser">User</span>
                    <button class="btn-back" onclick="goBackToDashboard()">Kembali ke Dashboard</button>
                    <button class="btn-logout" onclick="logout()">Logout</button>
                </div>
            </div>
            <iframe 
                src="${config.path}" 
                class="app-frame" 
                title="${config.title}"
                allowfullscreen>
            </iframe>
            
            <script>
                // Set current user
                const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
                document.getElementById('appCurrentUser').textContent = user.name || 'User';
                
                function goBackToDashboard() {
                    window.location.href = 'dashboard.html';
                }
                
                function logout() {
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('currentUser');
                    window.location.href = 'index.html';
                }
                
                // Check auth
                function checkAuth() {
                    const isLoggedIn = localStorage.getItem('isLoggedIn');
                    const currentUser = localStorage.getItem('currentUser');
                    
                    if (!isLoggedIn || !currentUser) {
                        window.location.href = 'index.html';
                        return false;
                    }
                    return true;
                }
                
                // Check auth on load
                checkAuth();
            </script>
        </body>
        </html>
    `;
    
    // Open in new window (bukan tab)
    const appWindow = window.open('', '_blank', 'width=1200,height=800,menubar=no,toolbar=no,location=no,status=no');
    appWindow.document.write(appViewerHTML);
    appWindow.document.close();
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
