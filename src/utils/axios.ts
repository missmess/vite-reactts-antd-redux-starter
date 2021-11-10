import { message } from 'antd';
import axios from 'axios';

// 创建一个通用的axios客户端
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ROOT,
  timeout: 15000,
  // 设置公共请求头
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-type': 'application/json; charset=UTF-8',
  },
  validateStatus: (status) => status >= 200 && status < 400,
});

axiosInstance.interceptors.response.use(
  // 直接输出接口返回的数据
  (response) => response.data,
  (error) => {
    // 发生http错误，提示错误信息
    message.error(error && error.message ? error.message : '接口出错了');
    return Promise.reject(error);
  },
);

export default axiosInstance;
