// redux/imageSlice.js
import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
    name: 'image',
    initialState: {
        base64: null,
        rotation: 0,
        isBW: false,
        watermarkText: '',
    },
    reducers: {
        setImageBase64: (state, action) => {
            state.base64 = action.payload;
        },
        rotateLeft: (state) => {
            state.rotation -= 90;
        },
        rotateRight: (state) => {
            state.rotation += 90;
        },
        toggleBW: (state) => {
            state.isBW = !state.isBW;
        },
        setWatermark: (state, action) => {
            state.watermarkText = action.payload;
        },
        clearImage: (state) => {
            state.base64 = null;
            state.rotation = 0;
            state.isBW = false;
            state.watermarkText = '';
        },
    },
});

export const { setImageBase64, rotateLeft, rotateRight, toggleBW, setWatermark, clearImage } =
    imageSlice.actions;

export default imageSlice;
