// App.vue 中添加 loadingCount 的 watch 监听控制是否显示全局loading
// loading.js mixin 中添加 isShowLoading 方法 控制loading是否显示， 每存在一个显示的loading方法， 需要有相对应的关闭的loading方法
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { ElLoading } from 'element-plus';
import store from '@/store';
@Module({
    dynamic: true,
    name: 'LoadingOptions',
    namespaced: true,
    stateFactory: true,
    store: store,
    preserveState: localStorage.getItem('vuex') !== null // 从localstorage获取保存的vuex数据
})
export default class LoadingOptions extends VuexModule {
    public loadingCount: number = 0; // 多个并发请求需要计数控制是否显示loading
    public loadingInstance: any = null; // loading 实例

    @Mutation
    public SET_IS_SHOW_LOADING(bol: boolean) {
        if (bol) {
            this.loadingCount = this.loadingCount + 1;
        } else {
            this.loadingCount = this.loadingCount - 1;
        }
    }

    @Mutation
    public SET_CLEAR_LOADING_COUNT() {
        this.loadingCount = 0;
    }

    @Mutation
    public SET_LOADING_INSTANCE(obj: any) {
        this.loadingInstance = obj;
    }

    @Action
    public showLoading() {
        if (this.loadingCount > 0 && !this.loadingInstance) {
            // 计数大于0 && 弹窗不存在  打开弹窗
            this.SET_LOADING_INSTANCE(ElLoading.service({
                lock: true,
                fullScreen: true,
                text: 'loading...',
                background: 'rgba(0, 0, 0, 0.7)',
                body: true,
                customClass: 'mask'
            }));
        } else if (this.loadingCount <= 0 && this.loadingInstance) {
            // 计数为0 && 弹窗存在 关闭弹窗并且重置参数
            this.loadingInstance.close();
            this.SET_LOADING_INSTANCE(null);
            this.SET_CLEAR_LOADING_COUNT();
        }
    }
}

export const LoadingModule = getModule(LoadingOptions);