/*eslint-disable*/
/****************************************通用常量***************************************************/
// var var = {
// };

/**
 * 列车客货别
 */
const trainTypeOptions = [
    [1, '货'],
    [2, '客'],
    [3, '动'],
    [4, '动集'],
    [0, '其它'],
]
/**
 * 列车客货别Obj
 */
const trainType = {
    3: '动',
    2: '客',
    1: '货',
    4: '动集',
    0: '其它',
}

/**
 * 热轴代码
 */
const hotRankOptions = [
    [5, '激热'],
    [4, '强热'],
    [1, '微热'],
    [3, '抱闸1级'],
    [2, '抱闸2级'],
    [0, '正常'],
]
/**
 * 热轴等级
 */
const hotRank = {
    0: '正常',
    1: '微热1',
    2: '抱闸2级',
    3: '抱闸1级',
    4: '强热',
    5: '激热',
}

/**
 * 轴箱侧位
 */
const axleBoxSide = {
    0: '左侧',
    1: '右侧',
}

/**
 * 轴型
 */
const axleType = {
    G: '滚动',
    H: "滑动",
    J: "机车"
}

/**
 * 探测位置
 */
const detectionPos = {
    0: "综合预报",
    1: "内探",
    2: "外探",
    3: "平探",
    4: "上探"
}

/**
 * 车辆权属
 */
const carProperty = {
    T: "路用货车",
    J: "机车",
    Q: "企业自备货车"
}

/**
 * 设备厂家
 */
const factory = {
    1: "哈科所",
    2: "广汉厂",
    3: "康拓",
    4: "哈曼"
}

/**
 * 拦停反馈处理方式
 */
const hotStopFBType = {
    1: "拦停放行",
    2: "甩车放行",
    3: "轴承退卸有故障",
    4: "换轮不退卸",
    5: "轴承退卸无故障",
    6: "换轮送四方",
    7: "换轮待退卸 10天后反馈退卸结果",
    8: "现场鉴定无故障放行",
    9: "现场处理后放行",
    10: "扣修"
}

/**
 * 轮位左右侧
 */
const wheelSide = {
    0: "左侧",
    1: '右侧'
}

/**
 * 中断起因
 */
const stopCause = {
    1: '探测站报文',
    2: '程序自检'
}

/**
 * 故障点状态
 */
const faultStatus = {
    0: "正常",
    1: "异常"
}

/**
 * 探测方式
 */
const surveyMode = {
    1: "下探",
    2: "上探",
    3: "上下探",
    4: "内外探"
}

/**
 * 运行方向
 */
const runDirection = {
    1: '下行',
    2: '上行'
}

/**
 * 计算标志
 */
const statisticsSign = {
    0: "未计算",
    1: "已计算"
}

/**
 * 结束标志
 */
const endType = {
    0: "未结束",
    1: "已结束"
}

/**
 * 设备当前状态
 */
const deviceStatus = {
    0: '正常',
    1: '设备自检异常',
    2: '中断'
}

/**
 * 比较符号
 */
const compareSymbolOptions = [
    [1, '='],
    [2, '>'],
    [3, '>='],
    [4, '<'],
    [5, '<='],
]

/**
 * 比较符号
 */
const compareSymbol = {
    1: '=',
    2: '>',
    3: '>=',
    4: '<',
    5: '<=',
}

// 又一个车型类型
const traintype2 = {
    P: '公共',
    J: '机务',
    D: '动车',
    K: '客车',
    H: '货车'
}

// 资产类型
const propertyType = {
    0: '国有',
    1: '地方',
    2: '私人'
}

// 单位级别
const unitLevel = {
    1: '国铁集团',
    2: '路局集团',
    3: '站段',
    4: '客整所',
    4: '车间',
    4: '客列检',
    5: '班组',
}

// 单位类型
const deptType = {
    '01': '国铁集团',
    '02': '国铁集团机关部门',
    '03': '路局集团',
    '04': '车辆段',
    '05': '动车段',
    '06': '机务段',
    '07': '客运段',
    '08': '动车所',
    '09': '客列检',
    '10': '客车整备所',
    '11': '动车检修车间',
    '12': '客车检修车间',
    '13': '铁路局机关部门',
    '14': '客车段',
    '15': '货车段',
    '16': '机车检修段',
    '17': '铁路机车车辆监造项目部',
    '21': '站段各部门',
    '25': '运用车间',
    '26': '班组',
    '27': '客整所各部门',
}

// 组织类型
const organType = {
    1: '单位',
    2: '部门',
    9: '人员',
}

// 有效标识
const effective = {
    0: '无效',
    1: '有效',
}

// 启用标识
const isUse = {
    0: '禁用',
    1: '启用',
}

// 同步标志
const synchFlag = {
    0: '未同步',
    1: '已同步',
}

// 原始数据计数法
const basisType = {
    D: '十进制',
    H: '十六进制',
    O: '八进制',
    B: '二进制',
    T: '文本',
}
// 处置类型
const dealType = {
    1: '热轴拦停',
}

// 是否是斯凯孚
const isSKF = {
    0: '否',
    1: '是'
}

export default {
    hotRankOptions, // 热轴代码 options 写法
    trainTypeOptions, // 车型 options 写法
    trainType, // 车型
    hotRank, // 热轴等级
    axleBoxSide, // 轴箱侧位
    axleType, // 轴型
    detectionPos, // 探测位置
    carProperty, // 车辆权属
    factory, // 设备厂家
    hotStopFBType, // 拦停反馈处理方式
    compareSymbolOptions, // 符号 options
    compareSymbol, // 符号
    wheelSide, // 轮位左右侧
    stopCause, // 中断起因
    faultStatus, // 故障点状态
    surveyMode, // 探测方式
    runDirection, // 运行方向
    statisticsSign, // 计算标志
    endType, // 结束标志
    deviceStatus, // 设备当前状态
    traintype2, // 又一个车型枚举
    propertyType, // 资产类型
    unitLevel, // 单位级别
    deptType, // 单位类型
    organType, // 组织类型
    effective, // 有效标识
    isUse, // 启用标识
    synchFlag, // 同步标志
    basisType, // 原始数据计数法
    dealType, // 处置类型
    isSKF, // 是否是斯凯孚轴承
}