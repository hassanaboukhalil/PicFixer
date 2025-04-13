import React from 'react';
import SourceOption from '../components/pages-components/SelectSource/SourceOption';
import { sourceOptions } from '../components/pages-components/SelectSource/sourceOptionsData';
import '../styles/pages/SelectSource.css';

const SelectSource = () => {
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
