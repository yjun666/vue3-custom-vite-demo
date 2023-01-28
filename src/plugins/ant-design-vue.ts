// element-plus
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

export function setupAntd(app: any) {
    app.config.globalProperties.$message = {};
    app.use(Antd);
}
