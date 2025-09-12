import React from 'react';
import messageSvg from '../../../../assets/icons/message-icon.svg';

const ChatIcon = ({ onClick }) => {
    return (
        <div onClick={onClick} className="chat-system-icon">
            <img src={messageSvg} alt="chat-system Icon" />
        </div>
    );
};

export default ChatIcon;
