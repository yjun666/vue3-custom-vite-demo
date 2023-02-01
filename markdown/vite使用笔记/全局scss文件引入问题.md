1. 从vite.config.js注入会注入到每一个文件中， 适合不会生成css样式的定义变量或者公共方法的文件， 是个mixin.scss、extend.scss、variable.scss等文件

2. 从main.ts注入会注入到全局， 适合公共的css样式， 例如reset.scss、common.scss等全局会使用的class名称和样式等