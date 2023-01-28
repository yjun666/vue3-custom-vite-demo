import moment from 'moment';
// 数字千分符 12,999,928
const str2thousand = (val:number|string) => {
    if (val) {
        val = val.toString();
        return val == '' ? val : val.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,');
    } else {
        return '';
    }
};
// 日期转换成格式 {fmtStr: 'YYYY-MM-DD'}
const dateFmt = (input: any, fmtStr: string) => {
    return moment(input).format(fmtStr);
};
// 补零
const toDou = (str:number|string) => {
    return str.toString().padStart(2, '0');
};

export { str2thousand, dateFmt, toDou };
