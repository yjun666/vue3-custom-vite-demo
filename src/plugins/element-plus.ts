// element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

export function setupElementPlus(app: any) {
    app.config.globalProperties.$ELEMENT = {
    // element-plus 全局配置
    };
    app.use(ElementPlus);
}
