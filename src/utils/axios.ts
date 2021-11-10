import { message } from 'antd';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ROOT,
  timeout: 15000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  validateStatus: (status) => status >= 200 && status < 400,
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // 提示错误信息
    message.error(error && error.message ? error.message : '接口出错了');
    return Promise.reject(error);
  },
);

export default axiosInstance;
