// import moment from "moment";
import { supplementCode } from '@/config'
import constant from "./constant";
export const { floor, random, ceil, pow, round, abs, max, min } = Math;
export const { toString, hasOwnProperty } = Object.prototype;
export const { assign, freeze, keys, values, entries } = Object;

/**
 * 所有数字字母的组合
 */
const STR = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-';
// 重复20遍， 避免获取5位id时会出现重复， 延长取值长度， 降低重复概率
const STRREPEAT = STR.repeat(20);

/**
 * randomRange 获取范围内的随机数
 * @param {number} minV 
 * @param {number} maxV 
 * @returns 
 */
const randomRange = (minV = 0, maxV = 1) => floor(random() * (maxV - minV + 1)) + minV;

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
const typeOf = (val: any) => {
    return toString.call(val).slice(8, -1).toLowerCase();
}
/**
 * Check whether an object has the property.
 */
const hasOwn = (obj: Object, key: string) => {
    return hasOwnProperty.call(obj, key);
}

/**
 * 判断是否是一个数组
 * @param {*} param 
 * @returns {Boolean}
 */
const isArray = (param: any) => {
    return typeOf(param) === 'array';
}

/**
 * 判断是否是一个Object
 * @param {*} param 
 * @returns {Boolean}
 */
const isObject = (param: any) => {
    return typeOf(param) === 'object';
}


/**
 * 转换为number
 * @param {number|string} val 
 * @returns {Boolean}
 */
const toNumber = (val: any) => {
    const n = parseFloat(val);
    return isNaN(n) ? val : n;
}

/**
 * 获取随机数设置id
 * @method getRandom
 * @param {number|undefined} c 需要多少位数的随机数
 * @param {number|undefined} s 随机数以什么开头， 给dom做id时不能以数字开头
 * @return {string} 随机数
 */
const getRandom = (c: number | undefined = 10, s: string | undefined = 'id_') => ((new Array(c)).fill('', 0, c)).reduce((a) => a + (STRREPEAT[randomRange(0, STRREPEAT.length - 1)] || ''), s)
/**
 * 下载文件
 * @param res 文件流
 */
const download = (res: any) => {
    try {
        const blob = new Blob([res.data], {
            type: res.headers['content-type']
        });
        const filename = decodeURI(res.headers['content-disposition'])
            .split(';')[1]
            .split('=')[1];
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = (e: any) => {
            const a: any = document.createElement('a');
            a.download = filename;
            a.href = e.target.result;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };
    } catch (error) {
        console.log(error);
    }
};

/**
 * 获取cookie值
 * @param {string} name 
 * @returns {string}
 */
const getCookie = (name: string = 'shiro.session.id') => {
    // 判断cookie 是否存在
    if (document.cookie.length > 0) {
        let start = document.cookie.indexOf(name + '=');
        if (start != -1) {
            start = start + name.length + 1;
            let end = document.cookie.indexOf(';', start);
            if (end === -1) {
                end = document.cookie.length;
            }
            return document.cookie.substring(start, end);
        }
    }
    return '';
};

/**
 * 
 * @param {*} n 需要保留小数位数的数字
 * @param {*} fixed 保留几位小数
 * @returns 
 */
const toFixed = (n: number, fixed: number) => ~~(pow(10, fixed) * n) / pow(10, fixed);

/**
 * Create a cached version of a pure function.
 */
const cached = (fn: any) => {
    var cache = Object.create(null);
    return function cachedFn(str: string) {
        var hit = cache[str];
        return hit || (cache[str] = fn(str));
    };
}

/**
 * Ensure a function is called only once.
 */
const once = (fn: any) => {
    var called = false;
    return function onceFnBody() {
        if (!called) {
            called = true;
            // @ts-ignore
            fn.apply(this, arguments);
        }
    };
}

/**
 * 空函数， 不操作
 */
const noop = () => { }
/**
 * Always return false.
 */
const no = () => false;

/**
 * Return the same value.
 */
const identity = (_: any) => _;

/**
 * uuid
 */
const uuid = () => {
    const temp_url = URL.createObjectURL(new Blob());
    const uuid = temp_url.toString();
    URL.revokeObjectURL(temp_url);
    return uuid.substring(uuid.lastIndexOf('/') + 1);
}
/**
 * 实现扁平化
 */
const flat = (arr: any[]): any[] => arr.reduce((a: any, b: any) => Array.isArray(b) ? [...a, ...flat(b)] : [...a, b], []);


/**
 * 方法说明 获取指定类型的父级元素,或者当前元素就是我们要找的元素
 * @method getParentEle
 * @param {HTMLElement} ele 需要查找的当前元素
 * @param {string|HTMLElement} parent 指定父级元素的id或者className或者元素类型
 * @return {返回值类型} 无
 */
const getParentEle = (ele: any, parent: string, count = 8): any => {
    count--;
    const { is } = Object;
    if (is(ele.tagName, 'BODY') || count === 0) return false;

    const str = parent.slice(1);
    // 根据className查找 还是根据 id查找 还是根据tagName查找
    const conditionFn =
        (dom: HTMLElement, parent: string) => (is(parent[0], '.') && is(typeOf(dom.className), 'string') && dom.className.includes(str)) ||
            (is(parent[0], '#') && is(dom.id, str)) ||
            is(dom.tagName, parent.toUpperCase());
    if (conditionFn(ele.parentElement, parent)) return ele.parentElement;
    else if (conditionFn(ele, parent)) return ele;
    else return getParentEle(ele.parentElement, parent, count)
};

// 预加载图片, 加载完成回调, 避免切换图片存在闪烁
const preloadImg = (src = '', cb: any) => {
    if (!src) false;
    const img = new Image();
    img.src = src;
    if (img.complete) {
        cb && cb();
        return img;
    }
    img.onload = function () {
        cb && cb();
    };
    return img;
};

// 是否是图片格式 http|https + 任意字符 + .png|.jpg|.gif|.jpeg|.webp
const urlIsImage = (str: string) => {
    const reg = /^http[s]?:\/\/[^]+\.(png|jpg|gif|jpeg|webp)$/i;
    // const reg = /[^]+\.(png|jpg|gif|jpeg|webp)$/i;
    return reg.test(str);
};

/**
 * getBase64Image 图片转base64格式
 * @param {string} src 
 * @param {any} cb 
 */
const getBase64Image = (src: string, cb: any) => {
    // 图片来源必须同域才可
    const img: HTMLImageElement = new Image();
    img.src = src + '?v=' + random(); // 处理缓存
    img.crossOrigin = '*'; // 支持跨域图片
    img.onload = function () {
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx: CanvasRenderingContext2D = (canvas.getContext('2d') as CanvasRenderingContext2D);
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const dataURL = canvas.toDataURL('image/png'); // 可选其他值 image/jpeg
        cb && cb(dataURL);
    };
};

// 判断日期是否为工作日
const isWeekday = (date: Date) => date.getDay() % 6 !== 0;

// 判断当前选项卡是否在视图/焦点中    我们可以使用document.hidden属性检查当前标签页是否在视图/焦点中。
const isBrowserTabInView = () => document.hidden;

// 检查元素当前是否处于焦点
const elementIsInFocus = (el: any) => el === document.activeElement;

// 检查当前用户是否支持触摸事件
const touchSupported = () => {
    return (
        'ontouchstart' in window ||
        ((window as any).DocumentTouch &&
            document instanceof (window as any).DocumentTouch)
    );
};

// 检查当前用户是否在Apple设备上
const isAppleDevice = /Mac|iPod|iPhone|iPad/.test(navigator.platform);

// 滚动到页面顶部
const goToTop = () => window.scrollTo(0, 0);

// 获取参数的平均值
const average = (args: any[]) => args.reduce((a, b) => a + b) / args.length;

/**
 * 格式化日期 规定标准字符 yMdhmst, 中间分隔符写什么都行， 写多少都行 formatDate('2021-01-01','y-M/d') formatDate('2021-01-01','y-/M-,d')
 * @param {number|string|Date} date 
 * @param {string} format 
 * @returns 
 */
const formatDate = (date: Date | string | number, format: string = 'y-M-d') => {
    if (Object.is(new Date(date).toDateString(), 'Invalid Date') || ['undefined', 'null'].some(x => typeOf(date) === x)) return date;
    if (format === 'timestamp') return new Date(date).getTime();
    date = date ? new Date(date) : new Date();
    const obj: { [key: string]: string } = {
        'y': String(date.getFullYear()), // 年
        'M': toDou(date.getMonth() + 1), // 月
        'd': toDou(date.getDate()), // 日
        'h': toDou(date.getHours()), // 时
        'm': toDou(date.getMinutes()), // 分
        's': toDou(date.getSeconds()), // 秒
        't': (date.getMilliseconds()).toString().padStart(3, '0'), // 毫秒
    }
    return format.split('').reduce((a, b) => a + (obj[b] || (typeOf(b) !== 'undefined' ? b : '')), '')
}

/**
 * 添加默认空数组
 * @param {*} _ 如果arr不存在需要默认空数组解决 undefined 的 map|filter 等方法报错
 * @returns 
 */
const defArr = (_: any[]) => {
    return _ || [];
}

// 区分上传的文件类型
const distinguishFileTypes = (fileUrl: string) => {
    if (fileUrl) {
        let fileUrlArr = fileUrl.split('.')
        let _laseOne = fileUrlArr[fileUrlArr.length - 1]
        let laseOne = _laseOne.toLowerCase();

        if (fileUrl.indexOf(';base64,') > 0 && fileUrl.match(/^data:/)) {
            // base64 格式获取文件类型
            laseOne = fileUrl.split(';base64,')[0].split('/')[1];
        }
        let typeMap = [
            [['jpg', 'png', 'gif', 'jpeg', 'bmp'], 'image'],
            [['doc', 'docx'], 'word'],
            [['xls', 'xlsx'], 'excel'],
            [['pdf'], 'pdf'],
            [['mp4', 'avi', 'wmv', 'mpg', 'mpeg', 'mov', 'rm', 'ram', 'swf', 'flv', 'rmvb', 'asf', 'divx', 'mpe', 'mkv', 'vob'], 'video'],
            [['cda', 'wav', 'mp3', 'wma', 'ra', 'midi', 'ogg', 'ape', 'flac', 'aac'], 'audio']
        ];
        return (typeMap.filter((x) => x[0].indexOf(laseOne) > -1)[0] || [])[1] || 'none';
    } else {
        return 'none'
    }
}

/**
 * 文件的上传下载
 * @param {string} type download|preview 
 * @param {*} file 
 */
const downloadOrPreview = (type: string, file: any, cb: any) => {
    if (type === 'download') {
        let url = file.fileUrl;
        let requestX = new XMLHttpRequest();
        requestX.open("GET", url, true);
        requestX.responseType = 'blob';
        requestX.onload = (e) => {
            let url = window.URL.createObjectURL(requestX.response)
            let aTag = document.createElement('a');
            aTag.href = url
            aTag.download = file.fileName; //下载后的文件名
            aTag.click();
            cb && cb();
        }
        requestX.send();
    } else if (type === 'preview') {
        // console.log()
        const fileType = distinguishFileTypes(file.fileUrl);
        if (fileType === 'image') {
            console.log('预览图片');
            cb && cb();
        } else {
            console.log('预览其他文件');
            cb && cb();
        }
    }
}

// base64 转为blob
const dataURLtoBlob = (dataurl: string) => {
    var arr: any[] = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
};

/**
 * 不同环境下调用方法
 * @param {[]string} types 环境list， 如['dev','test','prod']
 * @param {any} cb 
 */
const diffEnvFun = (types: string[], cb: any) => {
    const obj: { [key: string]: string } = {
        test: 'test',
        dev: 'development',
        prod: 'production',
    }
    if (types.some(x => import.meta.env.MODE === obj[x])) {
        cb && cb()
    }
}

/**
 * 替空， 解决全局表格内展示空字段时 默认替换的字段
 */
const supplement = (str: any, code: string) => {
    if (!str && str !== 0) {
        return code || supplementCode;
    } else {
        return str;
    }
}

/**
 * 补零
 */
const toDou = (str: string | number) => {
    return str.toString().padStart(2, '0');
};

//数字千分符 12,999,928
const str2thousand = (val: number | string) => {
    if (val) {
        val = val.toString();
        return val == "" ? val : val.replace(/\d{1,3}(?=(\d{3})+$)/g, "$&,");
    } else {
        return "";
    }
};
//日期转换成格式 {fmtStr: 'YYYY-MM-DD'}
const dateFmt = (input: Date | string | number, fmtStr: string) => {
    // return moment(input).format(fmtStr);
};

// 设置下拉框的全部项用来清空已经选择的
const setSelectOptAllField = (list: [] | any, val: any) => {
    if (list && list.length) {
        return [{
            label: '全部',
            value: val || null
        }].concat(list);
    } else {
        return []
    }
};

/**
 * 获取现在到过去的某一个时间点的时间范围
 * @param {*} time 过去多少时间范围， 1*24*60*60*1000=一天 ； 7*24*60*60*1000=一周 ； 2*60*60*1000=两个小时 ； 
 * @param {*} startDefTime 
 * @param {*} endDefTime 
 * @returns 
 */
const getTimeRangeFromNowToPrev = (time: number, startDefTime: string, endDefTime: string) => {
    const now = new Date().getTime();
    const prev = now - time;
    const start = startDefTime ? formatDate(prev, 'y-M-d') + ' ' + startDefTime : formatDate(prev, 'y-M-d h:m:s');
    const end = endDefTime ? formatDate(now, 'y-M-d') + ' ' + endDefTime : formatDate(now, 'y-M-d h:m:s');
    return [start, end];
    // return ['2023-01-01 00:00:00', '2023-10-10 00:00:00'];
    // return ['2020-08-08 00:00:00', '2020-08-08 00:00:00'];
};

/**
 * 获取constant.js 中定义的枚举值
 * type 定义的字典对象名称
 * key 字典key值
 */
const getEnumValue = (type: string, key: string) => {
    const constantVal: any = constant;
    if (isArray(constantVal[type])) {
        return constantVal[type]
    }
    return constantVal[type][key];
}

/**
 * 对object添加customId字段
 */
const addCustomId = (data: any) => {
    if (isArray(data)) {
        data.map((x: any) => {
            addCustomId(x);
        })
    } else if (isObject(data)) {
        data.customId = getRandom(10);
    }
}

/**
 * 从某一个arr数组中找出字段为prop值为type的项
 */
const customFind = (arr: any[], prop: string, type: any) => {
    return arr.find(x => x[prop] === type);
}

// 获取从当前算上一个月时间，返回YYYY-MM-DD 字符串
const getLastMonthTime = () => {
    let date = new Date();
    let daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let strYear: string | number = date.getFullYear();
    let strDay: number | string = date.getDate();
    let strMonth: number | string = date.getMonth() + 1;

    if (strYear % 4 === 0 && (strYear % 100 !== 0 || strYear % 400 == 0)) {
        daysInMonth[2] = 29;
    }
    if (strMonth - 1 === 0) {
        strYear -= 1;
        strMonth = 12;
    } else {
        strMonth -= 1;
    }
    strDay = Math.min(strDay, daysInMonth[strMonth]);
    if (strMonth < 10) {
        strMonth = '0' + strMonth;
    }
    if (strDay < 10) {
        strDay = '0' + strDay;
    }
    return strYear + '-' + strMonth + '-' + strDay;
}

// 常用方法
export {
    typeOf, // 类型判断
    hasOwn, // hasOwnProperty
    isArray,
    isObject,
    toNumber, // 转换为number
    randomRange, // 获取范围内的随机数
    getRandom, // 获取大小写字母和数字组成的随机数
    download, // 下载文件
    getCookie, // 获取cookie
    toFixed, // 保留小数位数
    cached, // 添加缓存， 如果频繁调用或者使用可使用cache缓存
    once, // 只执行一次
    noop, //  不操作
    no, // fase
    identity, // 返回本身
    uuid, // 获取uuid
    flat, // 数组扁平化
    getParentEle, // 获取父级元素
    preloadImg, // 预加载图片
    urlIsImage, // 判断url是否是图片
    getBase64Image, // 图片转base64
    isWeekday, // 判断日期是否为工作日
    average, // 平均数
    formatDate, // 格式化日期
    defArr, // 添加默认空数组
    distinguishFileTypes, // 区分文件类型
    downloadOrPreview, // 下载和预览文件
    dataURLtoBlob, // base64 url 转为blob类型
    diffEnvFun, // 不同环境下调用方法
    supplement, // 空数据使用什么字符替换， 替空操作
    str2thousand, // 千分符， 数字三位添加一个分隔符
    dateFmt, // 使用moment进行日期格式化
    toDou, // 补零， 数值向前补0， 9=>09
    setSelectOptAllField, // 设置element的下拉选择框添加全部字段用来清空已经选择的
    getTimeRangeFromNowToPrev, // 获取现在到过去的某一个时间点的时间范围
    getEnumValue, // 获取constant.js 中定义的枚举值
    addCustomId, // 对object添加customId字段
    customFind, // 从某一个arr数组中找出字段为prop值为type的项
    getLastMonthTime, // 获取从当前算上一个月时间，返回YYYY-MM-DD 字符串

};

// 不常用
export {
    isBrowserTabInView,
    elementIsInFocus,
    touchSupported,
    isAppleDevice,
    goToTop,
}