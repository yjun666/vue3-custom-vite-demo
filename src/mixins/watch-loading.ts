import { mapGetters, mapMutations, mapActions } from 'vuex';
import { watch } from 'vue';
import { LoadingModule } from '@/store/modules/loading';

export const WatchLoading = function () {
    // 重置loading计数
    LoadingModule.SET_CLEAR_LOADING_COUNT();
    // setTimeout(() => {
    //     LoadingModule.SET_IS_SHOW_LOADING(true);
    // }, 1000);

    // setTimeout(() => {
    //     LoadingModule.SET_IS_SHOW_LOADING(false);
    // }, 5000);

    watch(
        () => {
            return LoadingModule.loadingCount;
        },
        (newVal: any, oldVal: any) => {
            LoadingModule.showLoading();
            console.log('watch ==============', newVal, oldVal);
        },
        { deep: true, immediate: true }
    );
}