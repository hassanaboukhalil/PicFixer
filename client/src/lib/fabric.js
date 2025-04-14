// lib/fabric.js
import { fabric } from 'fabric';

/**
 * Initializes the canvas with default settings.
 */
export const createCanvasInstance = (canvasRef) => {
    const canvas = new fabric.Canvas(canvasRef, {
        backgroundColor: '#252525',
        selection: false,
        preserveObjectStacking: true,
    });

    window.fabricCanvas = canvas; // optional global access
    return canvas;
};

/**
 * Loads an image from base64 and renders it to canvas with rotation.
 */
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

/**
 * Resizes canvas to fit current window (minus sidebar width).
 */
export const resizeCanvasToWindow = (canvas, sidebarWidth = 220) => {
    if (!canvas) return;

    canvas.setWidth(window.innerWidth - sidebarWidth);
    canvas.setHeight(window.innerHeight);
    canvas.renderAll();
};
