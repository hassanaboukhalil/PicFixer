// components/Sidebar.jsx
import React from 'react';
import {
    Crop,
    RotateCw,
    RotateCcw,
    Stamp,
    Contrast,
    Trash,
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
} from '../../redux/slices/imageSlice';
import { useNavigate } from 'react-router-dom';
import useToast from '../../hooks/useToast';
import Toast from '../others/Toast';
import '../../App.css';

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const imagePath = useSelector((state) => state.image.filePath);
    const [toast, setToast] = useToast();

    const handleDelete = async () => {
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
                <button onClick={() => dispatch(enableCropping())}>
                    <Crop size={20} /> Crop
                </button>
                <button onClick={() => dispatch(rotateRight())}>
                    <RotateCw size={20} /> Rotate right
                </button>
                <button onClick={() => dispatch(rotateLeft())}>
                    <RotateCcw size={20} /> Rotate left
                </button>
                <button>
                    <Stamp size={20} /> Add watermark
                </button>
                <button onClick={() => dispatch(toggleBW())}>
                    <Contrast size={20} /> Convert to black and white
                </button>
                <button onClick={handleDelete}>
                    <Trash size={20} /> Delete image
                </button>

                <button onClick={handleSave}>
                    <ArrowDownToLine /> Save Image
                </button>

                <div className="logout">
                    <button onClick={() => handleLogout()}>
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </div>

            <Toast toast={toast} setToast={setToast} />
        </>
    );
};

export default Sidebar;
