import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
    name: 'image',
    initialState: {
        base64: null,
        rotation: 0,
        isBW: false,
        watermarkText: '',
        savedPath: '',
        isCropping: false,
    },
    reducers: {
        setImageBase64: (state, action) => {
            // state.base64 = action.payload;
            return {
                ...state,
                base64: action.payload,
            };
        },
        rotateLeft: (state) => {
            // state.rotation -= 90;
            return {
                ...state,
                rotation: state.rotation - 90,
            };
        },
        rotateRight: (state) => {
            // state.rotation += 90;
            return {
                ...state,
                rotation: state.rotation + 90,
            };
        },
        toggleBW: (state) => {
            state.isBW = !state.isBW;
        },

        setWatermark: (state, action) => {
            // state.watermarkText = action.payload;
            return {
                ...state,
                watermarkText: action.payload || 'PicFixer',
            };
        },
        saveImage: (state, action) => {
            // state.savedPath = action.payload;
            return {
                ...state,
                savedPath: action.payload,
            };
        },
        enableCropping: (state) => {
            // state.isCropping = true;
            return {
                ...state,
                isCropping: true,
            };
        },
        disableCropping: (state) => {
            // state.isCropping = false;
            return {
                ...state,
                isCropping: false,
            };
        },
        resetRotation: (state) => {
            // state.rotation = 0;
            return {
                ...state,
                rotation: 0,
            };
        },

        clearImage: (state) => {
            state.base64 = null;
            state.rotation = 0;
            state.isBW = false;
            state.watermarkText = '';
            state.savedPath = '';
            state.isCropping = false;
        },
    },
});

export const {
    setImageBase64,
    rotateLeft,
    rotateRight,
    toggleBW,
    setWatermark,
    saveImage,
    enableCropping,
    disableCropping,
    resetRotation,
    clearImage,
} = imageSlice.actions;

export default imageSlice;
