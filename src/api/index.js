import axios from 'axios';
import qs from 'qs';

const instance = axios.create({
    baseURL: 'http://localhost:4000/api',
    timeout: 20000,
    headers: {'Content-Type':'application/x-www-form-urlencoded'}
});

// 响应拦截器
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    window && window.vm.$message.error('接口出错了');
    return Promise.reject(error);
});

export default instance;