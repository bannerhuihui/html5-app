import axios from 'axios';

//const baseUrl = "https://demo.rtyouth.com/";
const baseUrl = "https://ym.rtyouth.com/"

// 创建 axios 实例
const api = axios.create({
    baseURL: baseUrl, // 替换为你的API基础URL
    timeout: 10000,  // 请求超时设置
    headers: { "Content-Type": "application/json;charset=UTF-8" }
});

// 请求拦截器
api.interceptors.request.use(
    config => {
        return config;
    }
);

// 响应拦截器
api.interceptors.response.use(
    response => {
        return response;
    }
);

export default api;