import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
import viteCompression from 'vite-plugin-compression';

// 声明一下process, 否则报红提示
declare var process: any;
declare var __dirname: any;
// 添加loadEnv 可以在vite.config.js 中可以使用.env 中的配置
const isProduction = process.env.NODE_ENV === 'production'// https://vitejs.dev/config/
console.log(isProduction);

// https://vitejs.dev/config/
export default ({ mode }) => {
    // 通过loadEnv获取.env.production中声明的变量
    const processConfig = loadEnv(mode, process.cwd());
    console.log(processConfig);
    return defineConfig({
        base: mode === 'production' ? './' : processConfig.VITE_PUBLIC_PATH,
        plugins: [
            vue(),
            viteCompression({ ext: '.gz', algorithm: 'gzip', deleteOriginFile: false })
        ],
        build: {
            // brotliSize: false,
            sourcemap: false,
            assetsInlineLimit: 4096,
            chunkSizeWarningLimit: 1024 * 2,
            outDir: 'dist',
            rollupOptions: {
                output: {
                    chunkFileNames: 'static/js/[name]-[hash].js',
                    entryFileNames: 'static/js/[name]-[hash].js',
                    assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
                    manualChunks(id) { // 分包
                        if (id.match('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString();
                        }
                    }
                },
            },
            minify: true,
            terserOptions: {
                compress: {
                    // warnings: false,
                    drop_console: true,  //打包时删除console
                    drop_debugger: true, //打包时删除 debugger
                    // pure_funcs: ['console.log'],
                },
                output: {
                    // 去掉注释内容
                    comments: true,
                },
            },
        },
        css: {
            preprocessorOptions: {
                // 全局样式引入
                scss: {
                    additionalData: `@import "./src/assets/style/public.scss";`,
                    javascriptEnabled: true
                }
            }
        },
        resolve: {
            alias: {
                // 支持页面使用@/引入、但是ctrl加左键无法快捷找到文件
                '@': path.resolve(__dirname, 'src')
            }
        },
        server: {
            https: false, // 是否开启 https
            open: false, // 是否自动在浏览器打开
            port: 3000, // 端口号
            host: "0.0.0.0",
            proxy: {
                "/api": {
                    target: "http://172.20.104.138:8076/", // 图片转文字
                    changeOrigin: true,
                    secure: false, // 如果是https接口，需要配置这个参数
                    // ws: true, //websocket支持
                    rewrite: (path) => path.replace(/^\/api/, ""),
                },
            },
        },
        // 引入第三方的配置
        optimizeDeps: {
            include: [],
        },
    })
}
