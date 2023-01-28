import HttpRequest from './axios'
const http = new HttpRequest(process.env.NODE_ENV === 'production' ? '/' : '/', 60000); // 不同的服务需要不同的代理， 根据不同的代理在vue.config.js 中进行配置
const http2 = new HttpRequest('/api2', 50000); // 不同的服务需要不同的代理， 根据不同的代理在vue.config.js 中进行配置
const http3 = new HttpRequest('/api3', 80000); // 不同的服务需要不同的代理， 根据不同的代理在vue.config.js 中进行配置
export { http, http2, http3 }
