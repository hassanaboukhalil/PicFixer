import React from 'react';
import { createContext, useContext, useState } from 'react';

const WatermarkDialogContext = createContext(null);

const WatermarkDialogStateProvider = ({ children }) => {
    const [isWatermarkDialogOpen, setIsWatermarkDialogOpen] = useState(false);

    return (
        <WatermarkDialogContext.Provider
            value={{
                isWatermarkDialogOpen,
                setIsWatermarkDialogOpen,
            }}
        >
            {children}
        </WatermarkDialogContext.Provider>
    );
};

export default WatermarkDialogStateProvider;

export const useWatermarkDialogState = () => {
    const context = useContext(WatermarkDialogContext);

    return context;
};
