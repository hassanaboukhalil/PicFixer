// handers/imageHandlers.js
const { ipcMain, dialog, app } = require('electron');
const path = require('path');
const NodeWebcam = require('node-webcam');
const fs = require('fs');

function imageActions() {
    // Open Pictures Library
    ipcMain.handle('open-pictures-library', async () => {
        const result = await dialog.showOpenDialog({
            title: 'Select an image',
            properties: ['openFile'],
            filters: [{ name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif'] }],
        });

        if (!result.canceled && result.filePaths.length > 0) {
            const filePath = result.filePaths[0];

            const fileBuffer = fs.readFileSync(filePath);
            const base64 = fileBuffer.toString('base64');

            const ext = path.extname(filePath).toLowerCase().replace('.', '');
            const mimeType = `image/${ext === 'jpg' ? 'jpeg' : ext}`;

            return `data:${mimeType};base64,${base64}`;
        } else {
            throw new Error('No image selected');
        }
    });

    // Capture image from webcam using node-webcam
    ipcMain.handle('open-camera', async () => {
        return new Promise((resolve, reject) => {
            const webcam = NodeWebcam.create({
                width: 640,
                height: 480,
                quality: 100,
                output: 'jpeg',
                device: false,
                callbackReturn: 'location',
                verbose: false,
            });

            const outputPath = path.join(
                app.getPath('pictures'),
                'picfixer',
                `picfixer_capture_${Date.now()}.jpg`
            );

            // const filePath = path.join(app.getPath('pictures'), 'picfixer');

            webcam.capture(outputPath, function (err, data) {
                if (!err) {
                    console.log('Image captured:', data);
                    resolve(data);
                } else {
                    console.error('Webcam error:', err);
                    reject('Failed to capture image.');
                }
            });
        });
    });

    ipcMain.handle('save-image', async (event, base64) => {
        const matches = base64.match(/^data:.+\/(.+);base64,(.*)$/);
        if (!matches || matches.length !== 3) throw new Error('Invalid base64');

        const ext = matches[1];
        const buffer = Buffer.from(matches[2], 'base64');

        const savePath = path.join(app.getPath('pictures'), 'PicFixer');
        if (!fs.existsSync(savePath)) fs.mkdirSync(savePath);

        const filePath = path.join(savePath, `edited_${Date.now()}.${ext}`);
        fs.writeFileSync(filePath, buffer);

        return filePath;
    });
}

module.exports = { imageActions };
