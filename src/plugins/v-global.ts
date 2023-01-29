// import { messageDuration } from '@/config'
// import * as lodash from 'lodash'
// import { Loading, Message, MessageBox, Notification } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'
import * as functions from '@/utils/function'
// import moment from "moment";

// const token = store.getters.token;

const install = (app: any, opts = {}) => {
    /* 全局token */
    // app.config.globalProperties.$token = () => {
    //     return token || getToken()
    // }

    // /* 全局Message */
    // app.config.globalProperties.$message = (message: string, type: string) => {
    //     Message({
    //         offset: 60,
    //         showClose: true,
    //         message: message,
    //         type: type,
    //         dangerouslyUseHTMLString: true,
    //         duration: messageDuration,
    //     })
    // }

    // /* 全局Confirm */
    // app.config.globalProperties.$confirm = (content: string, title: string, callback1: Function, callback2: Function) => {
    //     MessageBox.confirm(content, title || '温馨提示', {
    //         confirmButtonText: '确定',
    //         cancelButtonText: '取消',
    //         closeOnClickModal: false,
    //         type: 'warning',
    //     })
    //         .then(() => {
    //             if (callback1) {
    //                 callback1()
    //             }
    //         })
    //         .catch(() => {
    //             if (callback2) {
    //                 callback2()
    //             }
    //         })
    // }

    // /* 全局Notification */
    // app.config.globalProperties.$notify = (message: string, title: string, type: string, position: string) => {
    //     Notification({
    //         title: title,
    //         message: message,
    //         position: position || 'top-right',
    //         type: type || 'success',
    //         duration: messageDuration,
    //     })
    // }

    // /* 全局lodash */
    // app.config.globalProperties.$lodash = lodash;
    // /* moment 时间格式化 */
    // app.config.globalProperties.$moment = moment;
    /* 全局添加utils/function 方法 */
    app.config.globalProperties.$utils = functions;
    console.log(app);
}

export function setGlobal(app: any) {
    install(app);
}
