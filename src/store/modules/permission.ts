import { asyncRoutes, constantRoutes } from '@/router'
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import store from '@/store';




/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles: any, route: any) {
    if (route.meta && route.meta.roles) {
        return roles.some((role: any) => route.meta.roles.includes(role))
    } else {
        return true
    }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes: any, roles: any) {
    const res: any = []

    routes.forEach((route: any) => {
        const tmp = { ...route }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })

    return res
}

@Module({
    dynamic: true,
    name: 'PermissionOptions',
    namespaced: true,
    stateFactory: true,
    store: store,
    preserveState: localStorage.getItem('vuex') !== null // 从localstorage获取保存的vuex数据
})
export default class PermissionOptions extends VuexModule {
    public routes: any = [];
    public addRoutes: any = [];
    @Mutation
    SET_ROUTES(routes: any) {
        this.addRoutes = routes
        this.routes = constantRoutes.concat(routes)
    }
    @Action
    generateRoutes(roles: any) {
        return new Promise(resolve => {
            let accessedRoutes
            if (roles.includes('admin')) {
                accessedRoutes = asyncRoutes || []
            } else {
                accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
            }
            this.SET_ROUTES(accessedRoutes)
            resolve(accessedRoutes)
        })
    }
}

export const PermmissionModule = getModule(PermissionOptions);