import { createLogger, createStore } from 'vuex';
// import VuexPersist from 'vuex-persist'; // 持续化存储
import createPersistedState from 'vuex-persistedstate'; // 持续化存储第二种方式
import * as Cookies from 'js-cookie';

// // 永久保存数据到localstorage，刷新获取
// const initVuexPersist = new VuexPersist({
//     key: 'vuex',
//     storage: window.localStorage
// });

export default createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {},
    plugins: [
    // initVuexPersist.plugin,
        createLogger(),
        createPersistedState({
            storage: {
                getItem: (key) => localStorage.getItem(key),
                // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
                setItem: (key, value) =>
                    localStorage.setItem(key, value),
                removeItem: (key) => localStorage.removeItem(key)
                // getItem: (key) => Cookies.get(key),
                // // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
                // setItem: (key, value) =>
                //   Cookies.set(key, value, { expires: 7, secure: true }),
                // removeItem: (key) => Cookies.remove(key)
            }
        })
    ]
});
