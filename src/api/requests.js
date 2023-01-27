// 对axios进行二次封装！让requests代替axios

import axios from 'axios';

// 进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css';

const requests = axios.create({

    //基础路径 请求url默认开头会加上baseURL
    baseURL: "/api",
    
    //请求不能超过5S
    timeout: 5000,

});

//请求拦截器----在项目中发请求前执行的函数
requests.interceptors.request.use(function(config) {

    // 加载进度条
    nprogress.start();

    return config;
})

//响应拦截器----当服务器响应请求后的回调函数
requests.interceptors.response.use(
    // 成功回调
    function(res) {
        // 进度条结束
        nprogress.done();

        // 直接返回响应体的 data 作为 promise对象 的value
        return res.data
    },

    // 失败回调
    function(err) {
        nprogress.done();

        console.log(err);

        return err;
    }
)

export default requests;