const { app, BrowserWindow } = require('electron');
const path = require('path');
const { uploadImageHandlers } = require('./handers/uploadImageHandlers');

function createWindow() {
    const window = new BrowserWindow({
        minWidth: 900,
        minHeight: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // preload script
            contextIsolation: true,
            nodeIntegration: false, // security best practice
        },
    });

    // Load Vite dev server or built app
    // window.loadFile(path.join(__dirname, 'dist/index.html')); // Uncomment for production build
    window.loadURL('http://localhost:5173/');
}

// App lifecycle
app.whenReady().then(() => {
    createWindow();
    uploadImageHandlers(); // Register IPC handlers for camera & library

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
