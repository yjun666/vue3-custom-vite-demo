// 为了防止警告信息，直接指向到js不会提示警告信息
import { createI18n } from 'vue-i18n';

import en from '@/assets/language/en.json'
import zh from '@/assets/language/zh.json'

// 注册i8n实例并引入语言文件
const localeData = {
    legacy: false, // composition API, 设置false 否则在setup语法糖下使用会报错
    locale: 'zh',
    messages: {
        zh: zh, // 语言包所在的文件位置
        en: en
    },
    // // 调用方法
    // $t(key: any) {
    //     console.log(key);
    //     // debugger;
    //     // return (this as any).messages[this.locale][key];
    // }
}

// setup i18n instance with glob
export function setupI18n(app: any) {
    const i18n = createI18n(localeData);
    app.use(i18n);
}
