// components/Sidebar.jsx
import React from 'react';
import { Crop, RotateCw, RotateCcw, Stamp, Contrast, Trash, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { rotateLeft, rotateRight, toggleBW, clearImage } from '../../redux/slices/imageSlice';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const imagePath = useSelector((state) => state.image.filePath);

    const handleDelete = async () => {
        try {
            await window.electronAPI.deleteImage(imagePath);
            dispatch(clearImage());
            navigate('/');
        } catch (err) {
            console.error('Failed to delete image', err);
        }
    };

    return (
        <div className="sidebar">
            <button>
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

            <div className="logout">
                <button onClick={() => navigate('/')}>
                    <LogOut size={20} /> Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
