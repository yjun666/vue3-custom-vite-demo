1. 定义变量和方法的scss文件从vite.config.ts注入， 定义公共类名和样式的文件从main.ts注入
```
vite.config.ts
css: {
    preprocessorOptions: {
        // 全局样式引入
        scss: {
            additionalData: `@import "./src/assets/style/public.scss";`,
            javascriptEnabled: true
        }
    }
},

main.ts

import './style.css'
// 在vite项目中需要使用import 不能使用require 使用import引入scss文件需要使用小括号
import ('@/assets/fonts/iconfont.css');
import (`@/assets/style/reset.scss`); // 导入重置全局样式文件
import (`@/assets/style/common.scss`); // 导入全局样式文件
```

2. 避免不必要的问题的产生， 每一个vue文件的style定义样式的内部都需要添加内容， 不能为空， 最少添加一个注释（所有公共的scss文件都从vite.config.ts注入的时候如果vue文件内的style内部没有内容， 那么引用的公共class名称不生效， 至少添加一行注释都会生效）
```
<style lang="scss" scoped>
// style
</style>
```

3. experimentalDecorators 不配置的情况下，在store下模块文件内容有检查报错， 因此需要配置， 需要setting.json中进行配置， 需要tsconfig.json中进行配置

4. 使用import.meta.env 调用env文件中配置的变量
5. 使用import.meta.glob 代替require引用文件（尚未测试， 不知是否有用， 反正require是用不了了）
6. 使用`new URL(`../../assets/img/file/${fileType}.png`, import.meta.url).href`引用图片
7. 错误路由匹配不能直接使用 `*` , 需要添加正则
```
{
    // 默认重定向路由
    path: "/:catchAll(.*)",
    redirect: '/404',
},
```

8. router 中的重置路由 `resetRouter` 中的 `router = newRouter` 是否存在问题待验证

9. 