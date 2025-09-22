import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ children, handleCloseModal, title, className }) => {
    return (
        <div
            className="modal-overlay w-full h-full flex justify-center items-center px-8 py-8"
            style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem',
            }}
        >
            <div
                className={`modal rounded-lg flex flex-column gap-4 ${className}`}
                style={{
                    backgroundColor: '#1e1e1e',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    borderRadius: '8px',
                    border: '1px solid #808080',
                }}
            >
                <div className="flex justify-between">
                    <h4 className="h3">{title}</h4>
                    <div
                        className="cursor-pointer"
                        style={{
                            cursor: 'pointer',
                        }}
                        onClick={handleCloseModal}
                    >
                        <X />
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
};
export default Modal;
