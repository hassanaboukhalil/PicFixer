import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../components/layout/Sidebar';
// import ImagePreview from '../components/pages-components/ImageEditor/ImagePreview';
import ImageCanvas from '../components/pages-components/ImageEditor/ImageCanvas';

import '../styles/pages/imageEditor.css';

const ImageEditor = () => {
    const imageBase64 = useSelector((state) => state.image.base64);

    if (!imageBase64) return <h2 className="no-image">No image selected</h2>;

    return (
        <div className="editor-container">
            <Sidebar />
            <ImageCanvas />
        </div>
    );
};
export default ImageEditor;
