// Main application functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication on dashboard and app pages
    if (window.location.pathname !== '/index.html' && 
        !window.location.pathname.endsWith('index.html')) {
        checkAuth();
    }
});

// Function to open applications
function openApp(appName) {
    const appPaths = {
        'monitoring-order': 'apps/monitoring-order/index.html',
        'jadwal-pengecoran': 'apps/jadwal-pengecoran/index.html',
        'utilisasi-truck': 'apps/utilisasi-truck/index.html',
        'production-all-area': 'apps/production-all-area/index.html',
        'summary-daily-delivery': 'apps/summary-daily-delivery/index.html'
    };
    
    const appPath = appPaths[appName];
    if (appPath) {
        // Create a new page with iframe
        const appPage = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>${appName} - Aplikasi Terpadu</title>
                <link rel="stylesheet" href="css/style.css">
            </head>
            <body>
                <header class="header">
                    <div class="header-content">
                        <h1>Aplikasi Terpadu - ${getAppTitle(appName)}</h1>
                        <div class="user-info">
                            <span id="currentUser">Admin</span>
                            <button onclick="goBackToDashboard()" class="btn-logout">Kembali ke Dashboard</button>
                            <button onclick="logout()" class="btn-logout">Logout</button>
                        </div>
                    </div>
                </header>
                <main>
                    <div class="container">
                        <iframe src="${appPath}" class="app-frame" 
                                title="${getAppTitle(appName)}"></iframe>
                    </div>
                </main>
                <script>
                    function goBackToDashboard() {
                        window.location.href = 'dashboard.html';
                    }
                    ${checkAuth.toString()}
                    ${logout.toString()}
                    
                    // Set current user
                    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
                    document.getElementById('currentUser').textContent = user.name || 'User';
                </script>
            </body>
            </html>
        `;
        
        // Open in new window or tab
        const newWindow = window.open('', '_blank');
        newWindow.document.write(appPage);
        newWindow.document.close();
    }
}

function getAppTitle(appName) {
    const titles = {
        'monitoring-order': 'Daily Monitoring Order & Delivery',
        'jadwal-pengecoran': 'Jadwal Pengecoran',
        'utilisasi-truck': 'Utilisasi Truck Mixer',
        'production-all-area': 'Production All Area',
        'summary-daily-delivery': 'Summary Daily Delivery'
    };
    return titles[appName] || 'Aplikasi';
}
