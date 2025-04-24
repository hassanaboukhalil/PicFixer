import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { disableCropping, setImageBase64, resetRotation } from '../../../redux/slices/imageSlice';
import {
    createCanvasInstance,
    loadImageToCanvas,
    resizeCanvasToWindow,
    createCropBox,
    performCrop,
    addWatermarkToImage,
    applyBlackAndWhite,
} from '../../../lib/fabric';

const ImageCanvas = () => {
    const canvasRef = useRef(null);
    const fabricRef = useRef(null);
    const cropBoxRef = useRef(null);

    const dispatch = useDispatch();

    const imageBase64 = useSelector((state) => state.image.base64);
    const rotation = useSelector((state) => state.image.rotation);
    const isCropping = useSelector((state) => state.image.isCropping);
    const watermarkText = useSelector((state) => state.image.watermarkText);
    const isBW = useSelector((state) => state.image.isBW);

    // Only run once to initialize canvas
    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = createCanvasInstance(canvasRef.current);
        fabricRef.current = canvas;

        const handleResize = () => resizeCanvasToWindow(canvas);
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            canvas.dispose();
        };
    }, []);

    // Load image on base64 or rotation change
    useEffect(() => {
        const canvas = fabricRef.current;
        if (!canvas || !imageBase64) return;

        loadImageToCanvas(canvas, imageBase64, rotation);
    }, [imageBase64, rotation]);

    // Handle cropping
    useEffect(() => {
        const canvas = fabricRef.current;
        if (!canvas || !isCropping) return;

        const cropBox = createCropBox(canvas);
        cropBoxRef.current = cropBox;
        canvas.add(cropBox);
        canvas.setActiveObject(cropBox);
        canvas.renderAll();

        const handleClick = () => {
            if (canvas.getActiveObject() !== cropBoxRef.current) {
                performCrop(
                    canvas,
                    cropBoxRef.current,
                    dispatch,
                    setImageBase64,
                    disableCropping,
                    resetRotation
                );
                canvas.remove(cropBoxRef.current);
                cropBoxRef.current = null;
                canvas.renderAll();
            }
        };

        canvas.on('mouse:down', handleClick);

        return () => {
            canvas.off('mouse:down', handleClick);
            if (cropBoxRef.current) {
                canvas.remove(cropBoxRef.current);
                cropBoxRef.current = null;
            }
        };
    }, [isCropping, dispatch]);

    // add watermark
    useEffect(() => {
        const canvas = fabricRef.current;
        addWatermarkToImage(canvas, watermarkText);
    }, [watermarkText]);

    // transform image to black and white
    useEffect(() => {
        const canvas = fabricRef.current;
        if (!canvas) return;

        if (isBW) {
            applyBlackAndWhite(canvas);
        } else {
            const image = canvas.getObjects('image')[0];
            if (image) {
                image.filters = [];
                image.applyFilters();
                canvas.renderAll();
            }
        }
    }, [isBW]);
    return (
        <div className="canvas-wrapper">
            <canvas ref={canvasRef} className="canvas" />
        </div>
    );
};

export default ImageCanvas;
