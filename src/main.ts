import { createApp } from 'vue'
// // element-plus
// import { setupElementPlus } from '@/plugins/element-plus';
// // ant-design-vue
// import { setupAntd } from '@/plugins/ant-design-vue';
// // vue-i18n
// // 多语言
// import { setupI18n } from '@/plugins/vue-i18n';

import './style.css'
import App from './App.vue'

// 初始化app
const app = createApp(App);


// app.use 应用
// setupElementPlus(app);
// setupAntd(app);
// setupI18n(app);
app.mount('#app')