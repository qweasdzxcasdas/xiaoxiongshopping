import axios from "axios";


//引入进度条 其中state是开始 done是结束
import nprogress from "nprogress";
//引入进度条样式
import 'nprogress/nprogress.css'
import store from "@/store";
const instance = axios.create({
    //基础路劲，发请求时会带上api
    baseURL: '/api',
    //代表超时时间
    timeout: 5000,
    
  });

  // 添加请求拦截器
instance.interceptors.request.use( (config)=>{
    // 在发送请求之前做些什么
    //请求开始
    if(store.state.detail.uuid_token){
      config.headers.userTempId=store.state.detail.uuid_token
    }
    if(store.state.user.token){
      config.headers.token=store.state.user.token
    }
    nprogress.start();
    
    return config;
  }),

// 添加响应拦截器
instance.interceptors.response.use( (res) =>{
    // 对响应数据做点什么
    //请求结束
    nprogress.done();
    console.log('正常');
    return res.data;
  }, (error)=>{
    // 对响应错误做点什么
    return Promise.reject(new Error('faile'));
  });



  export default instance
  