import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
@Module({
    dynamic: true,
    name: 'CommonOptions',
    namespaced: true,
    stateFactory: true,
    store: store,
    preserveState: localStorage.getItem('vuex') !== null // 从localstorage获取保存的vuex数据
})
export default class CommonOptions extends VuexModule {
    
}

export const CommonModule = getModule(CommonOptions);