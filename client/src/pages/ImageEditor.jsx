import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../components/layout/Sidebar';
// import ImagePreview from '../components/pages-components/ImageEditor/ImagePreview';
import ImageCanvas from '../components/pages-components/ImageEditor/ImageCanvas';

import '../styles/pages/imageEditor.css';
import { useWatermarkDialogState } from '../state/context/DialogWatermarkContext';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';
import { setWatermark } from '../redux/slices/imageSlice';
import Button from '../components/common/Button';

const ImageEditor = () => {
    const imageBase64 = useSelector((state) => state.image.base64);
    const { isWatermarkDialogOpen, setIsWatermarkDialogOpen } = useWatermarkDialogState();
    const [watermarkText, setWatermarkText] = useState('PicFixer');
    const dispatch = useDispatch();

    if (!imageBase64) return <h2 className="no-image">No image selected</h2>;

    const addWatermark = () => {
        dispatch(setWatermark(watermarkText));
    };

    return (
        <div className="editor-container">
            <Sidebar />
            <ImageCanvas />
            {isWatermarkDialogOpen && (
                <Modal
                    title="Add Watermark"
                    handleCloseModal={() => setIsWatermarkDialogOpen(false)}
                >
                    <Input
                        type={'text'}
                        name={'watermark'}
                        value={watermarkText}
                        onChange={(e) => setWatermarkText(e.target.value)}
                        placeholder={'PicFixer'}
                        className={'body2 mt-8'}
                    />
                    <Button
                        text={'Submit'}
                        onClick={addWatermark()}
                        bgColor="bg-secondary"
                        textColor="text-black"
                    />
                </Modal>
            )}
        </div>
    );
};
export default ImageEditor;
