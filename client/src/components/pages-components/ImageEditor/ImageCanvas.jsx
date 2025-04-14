// components/ImageCanvas.jsx
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { createCanvasInstance, loadImageToCanvas, resizeCanvasToWindow } from '../../../lib/fabric';

const ImageCanvas = () => {
    const canvasRef = useRef(null);
    const fabricRef = useRef(null); // store canvas instance
    const imageBase64 = useSelector((state) => state.image.base64);
    const rotation = useSelector((state) => state.image.rotation);

    useEffect(() => {
        if (!canvasRef.current) return;

        const fabricCanvas = createCanvasInstance(canvasRef.current);
        fabricRef.current = fabricCanvas;

        if (imageBase64) {
            loadImageToCanvas(fabricCanvas, imageBase64, rotation);
        }

        const handleResize = () => {
            if (fabricRef.current) {
                resizeCanvasToWindow(fabricRef.current);
            }
        };

        handleResize(); // resize immediately
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            fabricRef.current?.dispose();
        };
    }, [imageBase64, rotation]);

    return (
        <div>
            <canvas ref={canvasRef} />
        </div>
    );
};

export default ImageCanvas;
