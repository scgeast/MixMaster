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
    basePath: '/MixMaster/',
    isGitHubPages: window.location.hostname.includes('github.io'),
    repository: 'MixMaster',
    username: 'sceeast'
};

// Function to open applications dengan fallback
function openApp(appName) {
    console.log('Opening app:', appName);
    
    const basePath = GITHUB_PAGES_CONFIG.isGitHubPages ? GITHUB_PAGES_CONFIG.basePath : '';
    
    const appConfigs = {
        'monitoring-order': {
            folder: 'monitoring-order-delivery',
            title: 'Daily Monitoring Order & Delivery',
            fallback: '#monitoring' // Temporary fallback
        },
        'jadwal-pengecoran': {
            folder: 'jadwal-pengecoran',
            title: 'Jadwal Pengecoran', 
            fallback: '#jadwal'
        },
        'utilisasi-truck': {
            folder: 'utilisasi-truck',
            title: 'Utilisasi Truck Mixer',
            fallback: '#truck'
        },
        'production-all-area': {
            folder: 'production-all-area',
            title: 'Production All Area',
            fallback: '#production'
        },
        'summary-daily-delivery': {
            folder: 'summary-daily-delivery',
            title: 'Summary Daily Delivery',
            fallback: '#summary'
        }
    };
    
    const config = appConfigs[appName];
    if (!config) {
        alert('Aplikasi tidak dikenali!');
        return;
    }
    
    const appPath = `${basePath}${config.folder}/index.html`;
    console.log('Trying to open:', appPath);
    
    // Test dulu apakah file exists
    fetch(appPath, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                // File exists, open it
                console.log('✅ File found, opening:', appPath);
                window.open(appPath, '_blank');
            } else {
                // File not found, show instructions
                showSetupInstructions(config, appPath);
            }
        })
        .catch(error => {
            // Error, show instructions
            showSetupInstructions(config, appPath);
        });
}

// Show setup instructions when app not found
function showSetupInstructions(config, expectedPath) {
    const message = `
🚨 APLIKASI BELUM SIAP

Aplikasi: ${config.title}
Path yang diharapkan: ${expectedPath}

📋 SOLUSI:

1. BUAT FOLDER di GitHub:
   - Buka repository MixMaster
   - Klik "Add file" → "Create new file"  
   - Ketik: ${config.folder}/index.html
   - Paste kode HTML aplikasi
   - Commit changes

2. ATAU UPLOAD FOLDER:
   - Download folder aplikasi dari komputer
   - Drag & drop folder ${config.folder} ke GitHub
   - Pastikan ada file index.html di dalamnya

3. TEST MANUAL:
   Buka URL ini di browser:
   https://sceeast.github.io/MixMaster/${config.folder}/index.html

Setelah folder dibuat, refresh halaman ini.
    `;
    
    if (confirm(message + '\n\nBuka GitHub repository sekarang?')) {
        window.open('https://github.com/sceeast/MixMaster', '_blank');
    }
}

// Test function dengan detailed reporting
function testAllPaths() {
    console.log('=== DETAILED PATH TEST ===');
    
    const basePath = GITHUB_PAGES_CONFIG.isGitHubPages ? GITHUB_PAGES_CONFIG.basePath : '';
    
    const apps = {
        'monitoring-order': `${basePath}monitoring-order-delivery/index.html`,
        'jadwal-pengecoran': `${basePath}jadwal-pengecoran/index.html`,
        'utilisasi-truck': `${basePath}utilisasi-truck/index.html`,
        'production-all-area': `${basePath}production-all-area/index.html`,
        'summary-daily-delivery': `${basePath}summary-daily-delivery/index.html`
    };
    
    let results = [];
    let tested = 0;
    const total = Object.keys(apps).length;
    
    const debugInfo = document.getElementById('debugInfo');
    if (debugInfo) {
        debugInfo.innerHTML = `
            <strong>🔍 Detailed Path Test</strong><br>
            📁 Repository: ${GITHUB_PAGES_CONFIG.repository}<br>
            Testing individual paths...<br><br>
        `;
    }
    
    Object.entries(apps).forEach(([appName, path]) => {
        console.log(`Testing: ${appName} -> ${path}`);
        
        fetch(path, { method: 'HEAD' })
            .then(response => {
                tested++;
                const status = response.ok ? '✅' : '❌';
                const message = response.ok ? 'FOUND' : 'MISSING - Folder tidak ada';
                
                results.push(`${status} <strong>${appName}</strong><br>&nbsp;&nbsp;📁 Path: ${path}<br>&nbsp;&nbsp;📊 Status: ${message}`);
                
                if (debugInfo) {
                    debugInfo.innerHTML = `
                        <strong>🔍 Detailed Test (${tested}/${total})</strong><br>
                        📁 Repository: ${GITHUB_PAGES_CONFIG.repository}<br><br>
                        ${results.join('<br><br>')}
                        ${tested === total ? '<br><br>💡 <strong>Solution:</strong> Buat folder aplikasi di GitHub' : ''}
                    `;
                }
            })
            .catch(error => {
                tested++;
                results.push(`❌ <strong>${appName}</strong><br>&nbsp;&nbsp;📁 Path: ${path}<br>&nbsp;&nbsp;📊 Status: ERROR - ${error.message}`);
                
                if (debugInfo) {
                    debugInfo.innerHTML = `
                        <strong>🔍 Detailed Test (${tested}/${total})</strong><br>
                        📁 Repository: ${GITHUB_PAGES_CONFIG.repository}<br><br>
                        ${results.join('<br><br>')}
                    `;
                }
            });
    });
}

// Quick setup guide
function showSetupGuide() {
    const guide = `
🎯 SETUP INSTRUKSI - MIXMASTER REPOSITORY

📁 STRUKTUR YANG DIBUTUHKAN:

MixMaster/
├── monitoring-order-delivery/
│   └── index.html
├── jadwal-pengecoran/
│   └── index.html  
├── utilisasi-truck/
│   └── index.html
├── production-all-area/
│   └── index.html
└── summary-daily-delivery/
    └── index.html

🔧 CARA SETUP:

1. BUAT FOLDER di GitHub:
   - Buka https://github.com/sceeast/MixMaster
   - Klik "Add file" → "Create new file"
   - Ketik: monitoring-order-delivery/index.html
   - Paste kode HTML aplikasi Monitoring
   - Commit changes

2. ULANGI untuk semua aplikasi

3. TEST SETIAP APLIKASI:
   Buka URL berikut di browser:
   - https://sceeast.github.io/MixMaster/monitoring-order-delivery/index.html
   - https://sceeast.github.io/MixMaster/jadwal-pengecoran/index.html
   - https://sceeast.github.io/MixMaster/utilisasi-truck/index.html
   - https://sceeast.github.io/MixMaster/production-all-area/index.html  
   - https://sceeast.github.io/MixMaster/summary-daily-delivery/index.html

4. SETELAH SEMUA FOLDER DIBUAT:
   - Kembali ke dashboard
   - Refresh halaman
   - Test aplikasi kembali

📞 BUTUH BANTUAN?
Beri tahu saya progress-nya!
    `;
    
    if (confirm(guide + '\n\nBuka GitHub repository sekarang?')) {
        window.open('https://github.com/sceeast/MixMaster', '_blank');
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
window.showSetupGuide = showSetupGuide;
