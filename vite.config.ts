import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
    server: {
      https: false, // 是否开启 https
      open: false, // 是否自动在浏览器打开
      port: 3000, // 端口号
      host: "0.0.0.0",
      proxy: {
          // "/api":{
          //     target: "https://webapi.xfyun.cn/v1/service/v1/", // 图片转文字
          //     changeOrigin: true,
          //     secure: false, // 如果是https接口，需要配置这个参数
          //     // ws: true, //websocket支持
          //     rewrite: (path) => path.replace(/^\/api/, ""),
          // },
          // "/ocrapi": {
          //     target: "http://120.53.239.34/", // 录音转文字
          //     changeOrigin: false,
          //     secure: false, // 如果是https接口，需要配置这个参数
          //     // ws: true, //websocket支持
          //     rewrite: (path) => path.replace(/^\/api/, ""),
          // },
          // "/managerSms": {
          //     target: "http://49.232.143.65:9008", //系统管理配置目前接口
          //     changeOrigin: false,
          //     rewrite: (path) => path.replace(/^\/managerSms/, ""),
          // },
          // "/audio": {
          //     target: "http://192.168.10.149:9009", //系统管理配置目前接口
          //     changeOrigin: false,
          //     rewrite: (path) => path.replace(/^\/audio/, "/audio"),
          // }
      },
  }
})


// import {defineConfig,loadEnv} from 'vite'
// import vue from '@vitejs/plugin-vue'
// import path from "path"
// import vueI18n from '@intlify/vite-plugin-vue-i18n'
// import styleImport from "vite-plugin-style-import";
// import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components';
// // 添加loadEnv 可以在vite.config.js 中可以使用.env 中的配置
// const isProduction = process.env.NODE_ENV === 'production'// https://vitejs.dev/config/
// export default ({mode})=>{
//     const processConfig = loadEnv(mode,process.cwd());
//     return defineConfig({
//         plugins: [
//             vue(),
//             vueI18n({
//                 // 国际化指向目录使用
//                 include: path.resolve(__dirname, './src/libs/lang/**')
//             }),
//             // vite按需加载插件
//             ViteComponents({
//                 customComponentResolvers: [
//                     AntDesignVueResolver()
//                 ],
//             }),
//             styleImport({
//                 libs: [{
//                     libraryName: 'ant-design-vue',
//                     esModule: true,
//                     resolveStyle: (name) => {
//                         return `ant-design-vue/es/${name}/style/index`
//                     }
//                 }]
//             }),
//         ],
//         base: processConfig.VITE_APP_BASE_BASE_PATH,
//         resolve: {
//             alias: {
//                 // 支持页面使用@/引入、但是ctrl加左键无法快捷找到文件
//                 '@': path.resolve(__dirname, 'src')
//             }
//         },
//         build: {
//             brotliSize: false,
//             outDir: processConfig.VITE_APP_BASE_BASE_PATH_NAME,
//             rollupOptions: {
//                 output: {
//                     chunkFileNames: 'static/js/[name]-[hash].js',
//                     entryFileNames: 'static/js/[name]-[hash].js',
//                     assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
//                     manualChunks(id){ // 分包
//                         if(id.includes('node_modules')){
//                             return id.toString().split('node_modules/')[1].split('/')[0].toString();
//                         }
//                     }
//                 },
//             },
//             terserOptions: {
//                 compress: {
//                   // warnings: false,
//                   drop_console: false,  //打包时删除console
//                   drop_debugger: true, //打包时删除 debugger
//                   // pure_funcs: ['console.log'],
//                 },
//                 output: {
//                   // 去掉注释内容
//                   comments: true,
//                 },
//               },
//         },
//         server: {
//             https: false, // 是否开启 https
//             open: false, // 是否自动在浏览器打开
//             port: 3000, // 端口号
//             host: "0.0.0.0",
//             proxy: {
//                 "/api":{
//                     target: "https://webapi.xfyun.cn/v1/service/v1/", // 图片转文字
//                     changeOrigin: true,
//                     secure: false, // 如果是https接口，需要配置这个参数
//                     // ws: true, //websocket支持
//                     rewrite: (path) => path.replace(/^\/api/, ""),
//                 },
//                 "/ocrapi": {
//                     target: "http://120.53.239.34/", // 录音转文字
//                     changeOrigin: false,
//                     secure: false, // 如果是https接口，需要配置这个参数
//                     // ws: true, //websocket支持
//                     rewrite: (path) => path.replace(/^\/api/, ""),
//                 },
//                 "/managerSms": {
//                     target: "http://49.232.143.65:9008", //系统管理配置目前接口
//                     changeOrigin: false,
//                     rewrite: (path) => path.replace(/^\/managerSms/, ""),
//                 },
//                 "/audio": {
//                     target: "http://192.168.10.149:9009", //系统管理配置目前接口
//                     changeOrigin: false,
//                     rewrite: (path) => path.replace(/^\/audio/, "/audio"),
//                 }
//             },
//         },
//         css: {
//             preprocessorOptions: {
//                 less: {
//                     javascriptEnabled: true,
//                 }
//             },
//         },
//         // 引入第三方的配置
//         optimizeDeps: {
//             include: [],
//         },
//     })
    
// }