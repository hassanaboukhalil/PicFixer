import { ImageIcon, CameraIcon } from 'lucide-react';

export const sourceOptions = [
    {
        label: 'Pictures Library',
        icon: ImageIcon,
        // onClick: () => {
        //     window.electronAPI
        //         .openPicturesLibrary()
        //         .then((result) => console.log('Selected image:', result))
        //         .catch((err) => console.error('Error selecting image:', err));
        // },
    },
    {
        label: 'Camera',
        icon: CameraIcon,
        onClick: () => {
            window.electronAPI
                .openCamera()
                .then((result) => console.log('Image captured from webcam:', result))
                .catch((err) => console.error('Camera capture failed:', err));
        },
    },
];
