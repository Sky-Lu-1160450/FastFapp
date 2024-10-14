import axios from 'axios';
import { Dialog } from 'vant';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api',  // Ensure this points to the backend
});

instance.interceptors.response.use(
    (response) => {
        // Check if the response has the expected structure
        const { data: _data } = response;
        if (_data && typeof _data === 'object') {
            const { data, code, msg } = _data;

            // Assuming `code` is part of the structure
            if (code !== 0) {
                console.log("Triggering alert with message:", msg || 'An error occurred');
                Dialog.alert({
                    message: msg || 'An unexpected error occurred'
                }).then(() => {
                    console.log("Alert closed");
                });
                return Promise.reject(new Error(msg || 'Unknown error'));
            }

            return data;  // Return the data if `code === 0`
        }

        // If the response doesn't have the expected structure, just return the full response
        return response;
    },
    (error) => {
        console.error("Error in request:", error);

        // Optionally handle different status codes
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    Dialog.alert({ message: 'Unauthorized access, please login again.' });
                    break;
                case 500:
                    Dialog.alert({ message: 'Internal server error. Please try again later.' });
                    break;
                // You can add more cases for other status codes
                default:
                    Dialog.alert({ message: error.message || 'An error occurred.' });
            }
        } else {
            Dialog.alert({ message: 'Network error or server not responding.' });
        }

        return Promise.reject(error);
    }
);

export default instance;
