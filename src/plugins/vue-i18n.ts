// 为了防止警告信息，直接指向到js不会提示警告信息
import { createI18n } from 'vue-i18n';

// 注册i8n实例并引入语言文件
const localeData = {
    legacy: true, // composition API
    locale: 'zh',
    messages: {
        zh: import.meta.glob('../assets/language/zh.json'), // 语言包所在的文件位置
        en: import.meta.glob('../assets/language/en.json')
    },
    // // 调用方法
    $t(key: any) {
        console.log(key);
        // debugger;
        // return (this as any).messages[this.locale][key];
    }
}

// setup i18n instance with glob
export function setupI18n(app: any) {
    const i18n = createI18n(localeData);
    app.use(i18n);
}
