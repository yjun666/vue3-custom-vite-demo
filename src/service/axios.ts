// 引用axios
import axios, {
    AxiosError,
    AxiosRequestConfig,
    AxiosResponse
} from 'axios';
import { ElMessage } from 'element-plus';
import store from '@/store';
import { requestTimeout, successCode } from '@/config';
import { getToken } from '@/utils/auth';

const NETWORK_ERRORMSG = '网络请求异常,请稍后重试';
const TIMEOUT_ERRORMSG = '请求超时,请稍后重试';
const APIWORK_ERRORMSG = '接口请求失败';

const baseURL = import.meta.env.VITE_APP_PUBLIC_PATH || '/';

class HttpRequest {
    baseUrl: any;
    timeout: any;
    // 定义一个接口请求类，用于创建一个axios请求实例
    constructor(baseUrl = baseURL, timeout = requestTimeout) {
        // 这个类接收一个字符串参数，是接口请求的基本路径
        this.baseUrl = baseUrl;
        this.timeout = timeout;
    }

    request(options: any) {
        // 我们实际调用接口的时候调用实例的这个方法，他返回一个AxiosPromise
        const instance = axios.create(); // 这里使用axios.create方法创建一个axios实例，他是一个函数，同时这个函数包含多个属性
        options = this.mergeConfig(options); // 合并基础路径和每个接口单独传入的配置，比如url、参数等
        this.interceptors(instance, options.url); // 调用interceptors方法使拦截器生效
        setTimeout(() => {
            console.log(instance)
        }, 0)
        return instance(options); // 最后返回AxiosPromise
    }

    interceptors(instance: any, url: any) {
        console.log(url);
        // 定义这个函数用于添加全局请求和响应拦截逻辑
        // 在这里添加请求和响应拦截
        instance.interceptors.request.use(
            // 1.发送网络请求时，在界面的中间位置显示loading的组件
            // 2.某一些请求要求用户必须携带token，如果没有携带，直接跳转到登陆页面
            // 3.params/data序列化的操作
            // 4.时间戳转成日期..
            (config: AxiosRequestConfig) => {
                if (store.getters.token) {
                    const token = getToken();
                    (config as any).headers.Authorization = 'Bearer' + token;
                }
                return config;
            },
            (error: AxiosError) => {
                ElMessage({
                    message: error,
                    type: 'error'
                })
                return Promise.reject(error);
            }
        );

        instance.interceptors.response.use(
            (response: AxiosResponse) => {
                console.log(response);
                // 接口返回数据处理
                const { rsCode, code, msg, data, message } = response.data;
                if (successCode.some((j) => j === rsCode || j === code)) {
                    return Promise.resolve(response.data);
                } else {
                    // 接口调用失败
                    ElMessage({
                        message: message || msg || APIWORK_ERRORMSG,
                        type: 'error'
                    })
                    return Promise.reject(APIWORK_ERRORMSG);
                }
            },
            (error: any): any => {
                console.log(error);
                if (error.stack.indexOf('timeout') > -1) {
                    // 请求超时
                    ElMessage({
                        message: APIWORK_ERRORMSG,
                        type: 'error'
                    })
                    setTimeout(() => {
                        // 1.5秒后跳转到登陆页或者首页? 目前跳转到错误页面
                        // window.location = layui.Hussar.ctxPath + "/global/sessionError";
                    }, 1500);
                    return Promise.reject(TIMEOUT_ERRORMSG);
                } else if (error.stack.indexOf('Network Error') > -1) {
                    // 网络异常
                    ElMessage({
                        message: NETWORK_ERRORMSG,
                        type: 'error'
                    })

                    setTimeout(() => {
                        // 1.5秒后跳转到登陆页或者首页? 目前跳转到错误页面
                        // window.location = layui.Hussar.ctxPath + "/global/sessionError";
                    }, 1500);
                    return Promise.reject(NETWORK_ERRORMSG);
                }
                return Promise.reject(error);
            }
        );
    }

    mergeConfig(options: AxiosRequestConfig) {
        // 这个方法用于合并基础路径配置和接口单独配置
        return Object.assign({ baseURL: this.baseUrl, timeout: this.timeout }, options);
    }
}

export default HttpRequest;
