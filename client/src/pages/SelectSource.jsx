import React from 'react';
import SourceOption from '../components/pages-components/SelectSource/SourceOption';
import { sourceOptions } from '../components/pages-components/SelectSource/sourceOptionsData';
import '../styles/pages/selectSource.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setImageBase64 } from '../redux/slices/imageSlice';

const SelectSource = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleImageSelected = async () => {
        try {
            // window.electronAPI
            //     .openPicturesLibrary()
            //     .then((result) => console.log('Selected image:', result))
            //     .catch((err) => console.error('Error selecting image:', err));

            const filePath = await window.electronAPI.openPicturesLibrary();
            // .then((result) => console.log('Selected image:', result))
            // .catch((err) => console.error('Error selecting image:', err));
            dispatch(setImageBase64(filePath));
            // dispatch(setImagePath('C:\Users\User\Documents\bg-images\blue.jpeg'));

            navigate('/image-editor'); // go to the page that shows image editor
        } catch (err) {
            console.error('Error selecting image', err);
        }
    };

    if (sourceOptions[0].label == 'Pictures Library') {
        sourceOptions[0].onClick = () => {
            handleImageSelected();
        };
    }

    return (
        <div className="select-source">
            <h2 className="select-source__title">Select an image source to start editing</h2>
            <div className="select-source__options">
                {sourceOptions.map((option) => (
                    <SourceOption key={option.label} {...option} />
                ))}
            </div>
        </div>
    );
};
export default SelectSource;
