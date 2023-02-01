import {
    createRouter,
    createWebHistory,
    RouteRecordRaw,
    createWebHashHistory,
    RouterOptions,
    RouterMatcher
} from 'vue-router';
import { isShowdemoModule } from '@/config'
import { demoRoutes } from './modules/demo'
import { testRoutes } from './modules/test'

/* Layout */
// import Layout from '@/layout'
import { defArr } from '@/utils/function'

/**
 * Note: sub-menu only appear when route children.length >= 1
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
  */

/**
 * 基础路由
 * 所有权限都可以访问的路由页面
 */
export const constantRoutes = [
    {
        path: '/',
        redirect: '/404',
    },
    //   {
    //     path: '/redirect',
    //     component: Layout,
    //     hidden: true,
    //     children: [
    //       {
    //         path: '/redirect/:path(.*)',
    //         component: () => import('@/views/redirect/index')
    //       }
    //     ]
    //   },
    //   {
    //     path: '/login',
    //     component: () => import('@/views/login/index'),
    //     hidden: true
    //   },
    {
        path: '/404',
        component: () => import('@/views/error-page/404.vue'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/error-page/401.vue'),
        hidden: true
    },
    {
        // 默认重定向路由
        path: "/:catchAll(.*)",
        redirect: '/404',
    },
]

/**
 * 异步路由
 * 需要用权限控制的路由
 */
export const asyncRoutes = []

const _createRouter = () => {
    return createRouter({
        scrollBehavior: () => ({ y: 0, behavior: 'smooth' }),
        // history: createWebHistory(process.env.BASE_URL),
        // history: createWebHistory(),
        history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH || './'),
        routes: constantRoutes
    });
}

let router: any = _createRouter();

function addRoutedemoModule() {
    // 动态添加测试模块路由， 展示demo的vue组件
    if (isShowdemoModule) {
        demoRoutes.map((x) => {
            router.addRoute(x);
        })
    }
    defArr(testRoutes).map((x) => {
        router.addRoute(x);
    })
    asyncRoutes.map((x) => {
        router.addRoute(x);
    })
}
// addRoutedemoModule();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = _createRouter();
    addRoutedemoModule();
    router = newRouter // 权限更新时重置路由， 再根据权限重新生成新的路由， reset router， 未测试是否生效， 老版本写法是 router.matcher = newRouter.matcher， 新版本已经没有matcher
    // router.matcher = newRouter.matcher // reset router
}

setTimeout(() => {
    resetRouter();
}, 3000)

export default router