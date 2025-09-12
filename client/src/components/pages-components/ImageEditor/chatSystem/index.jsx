import React from 'react';
import { useState } from 'react';
import ChatIcon from './ChatIcon';
import ChatWindow from './ChatWindow';
import '../../../../App.css';

const ChatSystem = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="chat-system">
            {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
            {!isOpen && <ChatIcon onClick={() => setIsOpen(true)} />}
        </div>
    );
};

export default ChatSystem;
