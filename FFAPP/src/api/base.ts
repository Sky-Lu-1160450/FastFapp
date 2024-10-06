import axios from 'axios'
import { Dialog } from 'vant';

const instance = axios.create ({
    baseURL: 'http://localhost:8000/api',  // Ensure this points to the backend

})

instance.interceptors.response.use(
    (response) => {
        const { data: _data } = response;
        const { data, code, msg } = _data;

        console.log("Received response:", _data);
        if (code !== 0) {
            console.log("Triggering alert with message:", msg);
            Dialog.alert({
                message: msg
            }).then(() => {
                console.log("Alert closed");
            });
            return Promise.reject(msg);
        }
        return data;
    },
    (error) => {
        console.error("Error in request:", error);
        return Promise.reject(error);
    }
);


export default instance










