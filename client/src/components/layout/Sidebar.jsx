// components/Sidebar.jsx
import React from 'react';
import {
    Crop,
    RotateCw,
    RotateCcw,
    Stamp,
    Contrast,
    ArrowLeft,
    LogOut,
    ArrowDownToLine,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
    rotateLeft,
    rotateRight,
    toggleBW,
    clearImage,
    enableCropping,
    saveImage,
    setWatermark,
} from '../../redux/slices/imageSlice';
import { useNavigate } from 'react-router-dom';
import useToast from '../../hooks/useToast';
import Toast from '../common/Toast';
import '../../App.css';

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const imagePath = useSelector((state) => state.image.filePath);
    const [toast, setToast] = useToast();

    const selectAnotherImage = async () => {
        try {
            // await window.electronAPI.deleteImage(imagePath);
            // dispatch(clearImage());
            navigate('/select-source');
        } catch (err) {
            console.error('Failed to delete image', err);
        }
    };

    const handleSave = async () => {
        try {
            const canvas = window.fabricCanvas;
            const dataUrl = canvas.toDataURL({ format: 'png' });

            const savedPath = await window.electronAPI.saveImage(dataUrl); // Electron API saves it
            dispatch(saveImage(savedPath));
            setToast({
                message: 'saved successfully',
                success: true,
                visible: true,
            });
        } catch (err) {
            setToast({
                message: 'something went wrong during saving',
                success: false,
                visible: true,
            });
            console.error('Failed to save image:', err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        dispatch(clearImage());
        navigate('/');
    };
    return (
        <>
            <div className="sidebar">
                <button className="tooltip" onClick={() => dispatch(enableCropping())}>
                    <Crop size={30} />
                    <span className="tooltiptext">Crop</span>
                </button>
                <button className="tooltip" onClick={() => dispatch(rotateRight())}>
                    <RotateCw size={30} />
                    <span className="tooltiptext">Rotate right</span>
                </button>
                <button className="tooltip" onClick={() => dispatch(rotateLeft())}>
                    <RotateCcw size={30} />
                    <span className="tooltiptext">Rotate left</span>
                </button>
                <button className="tooltip" onClick={() => dispatch(setWatermark('PicFixer'))}>
                    <Stamp size={30} />
                    <span className="tooltiptext">Add watermark</span>
                </button>
                <button className="tooltip" onClick={() => dispatch(toggleBW())}>
                    <Contrast size={30} />
                    <span className="tooltiptext">Convert to black and white</span>
                </button>
                <button className="tooltip" onClick={selectAnotherImage}>
                    <ArrowLeft size={30} />
                    <span className="tooltiptext">Select Another Image</span>
                </button>

                <button className="tooltip" onClick={handleSave}>
                    <ArrowDownToLine size={30} />
                    <span className="tooltiptext">Save Image</span>
                </button>

                <div className="logout tooltip">
                    <button onClick={() => handleLogout()}>
                        <LogOut size={30} />
                        <span className="tooltiptext">Logout</span>
                    </button>
                </div>
            </div>

            <Toast toast={toast} setToast={setToast} />
        </>
    );
};

export default Sidebar;
