import axios from 'axios';
import qs from 'qs';
console.log(' process.env.NODE_ENV=', process.env.NODE_ENV);
const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'http://81.68.160.212:8111/api'
      : 'http://localhost:8111/api',
  timeout: 20000,
});

// 响应拦截器
instance.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data.data;
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.error(error.response);
    window &&
      window.vm.$Notice.error({
        title: '提示',
        desc: error.response.data || '接口出错了',
      });
    return Promise.reject(error);
  }
);

// instance.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     config.params = config.params || {};
//     config.data =  config.data || {}

//     return config;
// }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
// });

export default instance;
