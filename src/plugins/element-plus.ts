import { elThemeType, elStyleType } from '@/config';
// element-plus
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';

const a = elStyleType;
const b = elThemeType;

// import 'element-plus/dist/index.css'; // 默认主题
// eslint-disable-next-line no-unused-expressions
import(`@/style/element-ui/element-ui-base-${a}.scss`) // 引入element-ui样式表----------每次重置样式表都需要刷新页面才可以正常展示
// require(`@/style/element-ui/element-ui-variable-${elThemeType}.scss`); // 导入修改过的主题文件
// eslint-disable-next-line no-unused-expressions
import(`@/style/element-ui/element-ui-variable-${b}.scss`); // 导入修改过的主题文件

export function setupElementPlus(app: any) {
    zhCn.el.pagination = {
        pagesize: '条/页',
        total: '共{total}条',
        goto: '前往',
        pageClassifier: '页',
        deprecationWarning: ''
    }
    app.config.globalProperties.$ELEMENT = {
        // element-plus 全局配置
        locale: zhCn
    };
    app.use(ElementPlus);
}
