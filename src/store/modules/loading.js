// App.vue 中添加 loadingCount 的 watch 监听控制是否显示全局loading
// loading.js mixin 中添加 isShowLoading 方法 控制loading是否显示， 每存在一个显示的loading方法， 需要有相对应的关闭的loading方法
const state = {
    loadingCount: 0, // 多个并发请求需要计数控制是否显示loading
    loadingInstance: null // loading 实例
}

const mutations = {
    SET_IS_SHOW_LOADING: (state, bol) => {
        if (bol) {
            state.loadingCount = state.loadingCount + 1;
        } else {
            state.loadingCount = state.loadingCount - 1;
        }
    },
}

const actions = {
    showLoading({ commit, state }) {
        if (state.loadingCount > 0 && !state.loadingInstance) {
            // 计数大于0 && 弹窗不存在  打开弹窗
            state.loadingInstance = this._vm.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
        } else if (state.loadingCount <= 0 && state.loadingInstance) {
            // 计数为0 && 弹窗存在 关闭弹窗并且重置参数
            state.loadingInstance.close();
            state.loadingInstance = null;
            state.loadingCount = 0;
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
