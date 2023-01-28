export let isnode = typeof window === 'undefined'; // 当前运行于node环境
export let title = import.meta.env.MODE === 'production' ? '车辆轴温智能探测系统（THDS）' : '后台管理项目框架编写';
export let tokenName = 'accessToken'; // tokenname
export let loginRsa = true; // 是否开启登录加密
export let isShowdemoModule = true; // 是否显示测试模块的组件展示
// export let elStyleType = !isnode ? localStorage.getItem('elStyleType') || '1' : '1'; // 引用的element-ui样式scss文件， 读取storage缓存， 通过设置缓存然后刷新当前页面进行重新获取样式
// export let elThemeType = !isnode ? localStorage.getItem('elThemeType') || '1' : '1'; // 引用的element-ui主题全局变量scss文件， 读取storage缓存， 通过设置缓存然后刷新当前页面进行重新获取样式
export let elStyleType = localStorage.getItem('elStyleType') || '1'; // 引用的element-ui样式scss文件， 读取storage缓存， 通过设置缓存然后刷新当前页面进行重新获取样式
export let elThemeType = localStorage.getItem('elThemeType') || '1'; // 引用的element-ui主题全局变量scss文件， 读取storage缓存， 通过设置缓存然后刷新当前页面进行重新获取样式
export let supplementCode = '-'; // 使用什么字符替换空数据进行展示
export let isClearConsole = import.meta.env.MODE === 'production' ? true : false; // 生产环境下清空console