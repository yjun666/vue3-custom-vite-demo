import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { login, logout, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { localCache, sessionCache } from '@/utils/storage'
import store from '@/store';
@Module({
    dynamic: true,
    name: 'UserOptions',
    namespaced: false,
    stateFactory: true,
    store: store,
    preserveState: localStorage.getItem('vuex') !== null // 从localstorage获取保存的vuex数据
})
export default class UserOptions extends VuexModule {
    public token: string = 'asldkfjaslkdfjweripou';
    public name: string = '';
    public avatar: string = '';
    public introduction: string = '';
    public roles: any[] = [];

    @Mutation
    public SET_TOKEN(token: any) {
        this.token = token
    }
    @Mutation
    public SET_INTRODUCTION(introduction: any) {
        this.introduction = introduction
    }
    public SET_NAME(name: any) {
        this.name = name
    }
    @Mutation
    public SET_AVATAR(avatar: any) {
        this.avatar = avatar
    }
    @Mutation
    public SET_ROLES(roles: any) {
        this.roles = roles
    }

    // user login
    @Action
    public login(userInfo: any) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password }).then((response: any) => {
                const { data } = response
                this.SET_TOKEN(data.token);
                setToken(data.token)
                resolve(data)
            }).catch((error: any) => {
                reject(error)
            })
        })
    }

    // get user info
    @Action
    public getInfo() {
        return new Promise((resolve, reject) => {
            getUserInfo(this.token).then((response: any) => {
                const { data } = response

                if (!data) {
                    reject('Verification failed, please Login again.')
                }

                const { roles, name, avatar, introduction } = data

                // roles must be a non-empty array
                if (!roles || roles.length <= 0) {
                    reject('getInfo: roles must be a non-null array!')
                }

                this.SET_ROLES(roles);
                this.SET_NAME(name);
                this.SET_AVATAR(avatar);
                this.SET_INTRODUCTION(introduction);
                resolve(data)
            }).catch((error: any) => {
                reject(error)
            })
        })
    }

    // user logout
    @Action
    public logout() {
        return new Promise((resolve, reject) => {
            logout().then(() => {
                localCache.clear();
                sessionCache.clear();
                removeToken()
                resetRouter()

                // reset visited views and cached views
                // dispatch_临时注释('tagsView/delAllViews', null, { root: true })

                resolve(true)
            }).catch((error: any) => {
                reject(error)
            })
        })
    }

    // remove token
    @Action
    public resetToken() {
        return new Promise(resolve => {
            this.SET_TOKEN('');
            this.SET_ROLES([]);
            removeToken()
            resolve(true)
        })
    }

    // dynamically modify permissions
    @Action
    public async changeRoles(role: any) {
        const token = role + '-token'

        this.SET_TOKEN(token);
        setToken(token)

        const { roles }: any = await this.getInfo();

        resetRouter()

        // generate accessible routes map based on roles
        // const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
        //     // dynamically add accessible routes
        //     router.addRoutes(accessRoutes)

        // // reset visited views and cached views
        // dispatch('tagsView/delAllViews', null, { root: true })
    }
}

export const UserModule = getModule(UserOptions);