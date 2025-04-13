import React from 'react';

const SourceOption = ({ icon: Icon, label, onClick }) => {
    return (
        <div className="source-option" onClick={onClick}>
            <Icon className="source-option__icon" size={48} />
            <p className="source-option__label">{label}</p>
        </div>
    );
};

export default SourceOption;
