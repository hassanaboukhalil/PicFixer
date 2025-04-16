// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    openPicturesLibrary: () => ipcRenderer.invoke('open-pictures-library'),
    openCamera: () => ipcRenderer.invoke('open-camera'),
    saveImage: (base64) => ipcRenderer.invoke('save-image', base64),
});
