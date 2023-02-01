## vue-i18n配置
1. legacy 参数设置成为false， 否则在setup语法糖下报错
2. vue文件中需要配置
```
@click="changeLanguage('zh')"
@click="changeLanguage('en')"

import { useI18n } from 'vue-i18n';
const i18n = useI18n();
const t = i18n.t;
const changeLanguage = (languageStr: any) => {
    i18n.locale.value = languageStr;
    const str = ref('btnText');
    console.log(t(`changeLanguage.${str.value}`));
};
setup语法糖下需要定义t, 然后直接开发就可以
defineComponent 开发需要在setup下导出 t
@Options 开发需要在data中设置字段 data(){return {t:useI18n().t}}

```