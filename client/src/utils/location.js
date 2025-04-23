import axios from 'axios';

export const getLocationInfo = async () => {
    try {
        const response = await axios.get('https://ipapi.co/json/');
        return {
            ip: response.data.ip,
            latitude: response.data.latitude,
            longitude: response.data.longitude,
        };
    } catch (error) {
        console.error('Error fetching IP info:', error);
        return null;
    }
};
