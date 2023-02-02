import { createApp } from 'vue'
import App from './App.vue'
import { setGlobal } from '@/plugins/v-global';
// element-plus
import { setupElementPlus } from '@/plugins/element-plus';
import store from '@/store';
// vue-i18n
// 多语言
import { setupI18n } from '@/plugins/vue-i18n';

// 路由
import router from '@/router/index';

import './style.css'
// 在vite项目中需要使用import 不能使用require 使用import引入scss文件需要使用小括号
import('@/assets/fonts/iconfont.css');
import(`@/assets/style/reset.scss`); // 导入重置全局样式文件
import(`@/assets/style/common.scss`); // 导入全局样式文件

// 初始化app
const app = createApp(App);


// app.use 应用
setupElementPlus(app);
setupI18n(app);
setGlobal(app);
app.use(store).use(router).mount('#app')