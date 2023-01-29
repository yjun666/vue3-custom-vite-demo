import { createApp } from 'vue'
import App from './App.vue'
import { setGlobal } from '@/plugins/v-global';
// // element-plus
// import { setupElementPlus } from '@/plugins/element-plus';
// // ant-design-vue
// import { setupAntd } from '@/plugins/ant-design-vue';
// // vue-i18n
// // 多语言
// import { setupI18n } from '@/plugins/vue-i18n';

import './style.css'
import.meta.glob(`@/assets/style/reset.scss`); // 导入重置全局样式文件
import.meta.glob(`@/assets/style/common.scss`); // 导入全局样式文件
import '@/assets/fonts/iconfont.css';

// 初始化app
const app = createApp(App);


// app.use 应用
// setupElementPlus(app);
// setupAntd(app);
// setupI18n(app);
setGlobal(app);
app.mount('#app')