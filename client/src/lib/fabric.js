// lib/fabric.js
import { fabric } from 'fabric';

// Initializes the canvas with default settings
export const createCanvasInstance = (canvasRef) => {
    const canvas = new fabric.Canvas(canvasRef, {
        backgroundColor: '#252525',
        selection: false,
        preserveObjectStacking: true,
    });

    window.fabricCanvas = canvas; // optional global access
    return canvas;
};

// Loads an image from base64 and renders it to canvas with rotation.
export const loadImageToCanvas = (canvas, base64, rotation = 0) => {
    fabric.Image.fromURL(base64, (img) => {
        img.set({
            originX: 'center',
            originY: 'center',
            left: canvas.getWidth() / 2,
            top: canvas.getHeight() / 2,
            angle: rotation,
            selectable: false,
        });

        const scaleFactor = Math.min(
            canvas.getWidth() / img.width,
            canvas.getHeight() / img.height,
            1
        );
        img.scale(scaleFactor);

        canvas.clear();
        canvas.add(img);
        canvas.renderAll();
    });
};

// Resizes canvas to fit current window (minus sidebar width).
export const resizeCanvasToWindow = (canvas, sidebarWidth = 82) => {
    if (!canvas) return;

    canvas.setWidth(window.innerWidth - sidebarWidth);
    canvas.setHeight(window.innerHeight);
    canvas.renderAll();
};

export function createCropBox(canvas) {
    return new fabric.Rect({
        left: canvas.getWidth() / 4,
        top: canvas.getHeight() / 4,
        width: canvas.getWidth() / 2,
        height: canvas.getHeight() / 2,
        fill: 'transparent',
        stroke: 'red',
        strokeWidth: 2,
        selectable: true,
        hasBorders: true,
        hasControls: true,
        cornerColor: 'white',
    });
}

export function performCrop(
    canvas,
    cropBox,
    dispatch,
    setImageBase64,
    disableCropping,
    resetRotation
) {
    const image = canvas.getObjects('image')[0];
    if (!image || !cropBox) return;

    const cropX = cropBox.left - image.left + (image.width * image.scaleX) / 2;
    const cropY = cropBox.top - image.top + (image.height * image.scaleY) / 2;
    const cropWidth = cropBox.width * cropBox.scaleX;
    const cropHeight = cropBox.height * cropBox.scaleY;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = cropWidth;
    tempCanvas.height = cropHeight;

    const ctx = tempCanvas.getContext('2d');
    const imgEl = new Image();
    imgEl.src = image.toDataURL();

    imgEl.onload = () => {
        ctx.drawImage(imgEl, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
        const croppedBase64 = tempCanvas.toDataURL('image/png');

        canvas.clear();

        fabric.Image.fromURL(croppedBase64, (croppedImage) => {
            croppedImage.set({
                originX: 'center',
                originY: 'center',
                left: canvas.getWidth() / 2,
                top: canvas.getHeight() / 2,
                selectable: false,
            });

            const scaleFactor = Math.min(
                canvas.getWidth() / croppedImage.width,
                canvas.getHeight() / croppedImage.height,
                1
            );
            croppedImage.scale(scaleFactor);

            canvas.add(croppedImage);
            canvas.renderAll();

            dispatch(setImageBase64(croppedBase64));
            dispatch(disableCropping());
            dispatch(resetRotation());
        });
    };
}

export function addWatermarkToImage(canvas, watermarkText) {
    if (!canvas || !watermarkText) return;

    // Remove old watermark if it exists
    const existing = canvas.getObjects('text').find((obj) => obj.id === 'watermark');
    if (existing) canvas.remove(existing);

    const image = canvas.getObjects('image')[0];
    if (!image) return;

    const imageWidth = image.width * image.scaleX;
    const imageHeight = image.height * image.scaleY;

    const imageLeft = image.left - imageWidth / 2;
    const imageTop = image.top - imageHeight / 2;

    const text = new fabric.Text(watermarkText, {
        left: imageLeft + imageWidth - 10,
        top: imageTop + imageHeight - 30,
        fontSize: 24,
        fill: 'rgba(255,255,255,0.6)',
        selectable: false,
        id: 'watermark',
        originX: 'right',
        originY: 'bottom',
    });

    canvas.add(text);
    canvas.renderAll();
}

export function applyBlackAndWhite(canvas) {
    if (!canvas) return;

    const image = canvas.getObjects('image')[0];
    if (!image) return;

    // Apply grayscale filter
    image.filters = [new fabric.Image.filters.Grayscale()];
    image.applyFilters();
    canvas.renderAll();
}
