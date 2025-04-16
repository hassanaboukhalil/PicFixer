// components/ImageCanvas.jsx
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    createCanvasInstance,
    loadImageToCanvas,
    resizeCanvasToWindow,
    createCropBox,
    performCrop,
} from '../../../lib/fabric';

const ImageCanvas = () => {
    const canvasRef = useRef(null);
    const fabricRef = useRef(null);
    const cropBoxRef = useRef(null);
    const dispatch = useDispatch();

    const imageBase64 = useSelector((state) => state.image.base64);
    const rotation = useSelector((state) => state.image.rotation);
    const isCropping = useSelector((state) => state.image.isCropping);

    // Initialize and load image
    useEffect(() => {
        if (!canvasRef.current) return;

        const fabricCanvas = createCanvasInstance(canvasRef.current);
        fabricRef.current = fabricCanvas;

        if (imageBase64) {
            loadImageToCanvas(fabricCanvas, imageBase64, rotation);
        }

        const handleResize = () => resizeCanvasToWindow(fabricCanvas);
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            fabricCanvas.dispose();
        };
    }, [imageBase64, rotation]);

    // Crop logic when isCropping is true
    useEffect(() => {
        if (!canvasRef.current || !isCropping || !fabricRef.current) return;

        const canvas = fabricRef.current;
        const cropBox = createCropBox(canvas);
        cropBoxRef.current = cropBox;

        canvas.add(cropBox);
        canvas.setActiveObject(cropBox);
        canvas.renderAll();

        const handleOutsideClick = () => {
            if (canvas.getActiveObject() !== cropBox) {
                performCrop(canvas, cropBox, dispatch);
            }
        };

        canvas.on('mouse:down', handleOutsideClick);

        return () => {
            canvas.off('mouse:down', handleOutsideClick);
            canvas.remove(cropBox);
        };
    }, [isCropping]);

    return (
        <div style={{ flex: 1 }}>
            <canvas ref={canvasRef} />
        </div>
    );
};

export default ImageCanvas;
