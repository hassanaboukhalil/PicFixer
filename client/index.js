// import {app, browserWindow} from 'electron';
const {app , BrowserWindow} = require('electron')

const createWindow = () => {
    const window = new BrowserWindow({
        minWidth: 800,
        minHeight: 600,
        // maximizable,
    })


    // window.loadFile('./src/index.html')

    window.loadURL('http://localhost:5173/')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})