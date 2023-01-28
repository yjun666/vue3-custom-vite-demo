const state = {
    previewImgUrl: '', // 预览图片的url， 仅显示在线图片
}

const mutations = {
    SET_PREVIEW_IMG_URL: (state, url) => {
        state.previewImgUrl = url;
    },
}

const actions = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
