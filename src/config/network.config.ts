export let requestTimeout = 10000; // 请求超时时间
export let successCode = ['200', '0', 200, 0]; // 操作成功code
export let messageDuration = 3000; // message 弹框消失时间
export let isApplyMock = import.meta.env.MODE === 'development'; // 是否允许使用mock数据