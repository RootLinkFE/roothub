const axios = require('axios');
const REF = 'master';
const PRIVATE_TOKEN = '7A6eXwHM6q4JvHESZvkY';

const instance = axios.create({
    baseURL: 'https://git.souche-inc.com/api/v4',
    timeout: 20000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});

// 响应拦截器
instance.interceptors.response.use(function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

instance.interceptors.request.use(function(config) {
    console.log(config.url);
    config.params = config.params || {};
    config.data = config.data || {};
    // Do something before request is sent
    if (config.method === 'get') {
        config.params.ref = REF;
        config.params.private_token = PRIVATE_TOKEN;
    } else if (config.method === 'post') {
        config.data.ref = REF;
        config.data.private_token = PRIVATE_TOKEN;
    }
    return config;
}, function(error) {
    // Do something with request error
    return Promise.reject(error);
});

module.exports = instance;