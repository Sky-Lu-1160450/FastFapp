import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { Dialog } from 'vant';

// Custom Axios instance with modified response type
interface CustomAxiosInstance extends AxiosInstance {
  get<T = any, R = T>(url: string, config?: AxiosRequestConfig): Promise<R>;
//   post<T = any, R = T>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R>;
}

const instance = axios.create({
  baseURL: 'http://localhost:8000/api',
});

instance.interceptors.response.use(
  (response) => {
    const { data: _data } = response;
    const { data, code, msg } = _data;

    if (code !== 0) {
      Dialog.alert({
        message: msg,
      });
      return Promise.reject(new Error(msg));
    }
    return data;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Cast the Axios instance to use the custom type
const customAxios = instance as CustomAxiosInstance;

export default customAxios;










