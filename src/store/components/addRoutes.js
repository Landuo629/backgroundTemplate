import router from '@/router';
import routeDev from '@/router/routeDev';

/**
 * 动态添加按钮权限
 * author:qlx
 */
const addRoutes = {
    state: {
        rootRoute: [],
        routeParam: [] //这里必须持久化参数,重新生成路由,因为里边的require方法没法持久化
    },
    mutations: {
        add_Routes(state, routeParam) {
            let routeList = [];
            //添加默认路由,新用户登陆可以显示首页
            routeList.push({
                name: 'index',
                path: '/index',
                component: () =>
                    import ('@/views/index.vue'),
                meta: {
                    title: '系统首页'
                }
            });
            //写入开发模式下静态路由
            if (routeDev.ROUTE_DEV == true) {
                routeList.push(...routeDev.routeDevList); //...是es6中的 ‘点语法’ 扩展运算符
            }
            let routeHideList = [];
            var rootRoute = [{
                path: '/',
                component: resolve => require(['@/common/Home.vue'], resolve),
                meta: { title: '自述文件' },
                children: routeList
            }];
            //添加新窗口打开的页面
            if (routeHideList && routeHideList.length > 0) {
                rootRoute = rootRoute.concat(routeHideList);
            }
            //保存路由参数到store中
            state.routeParam = routeParam;
            state.rootRoute = rootRoute;
            //动态添加路由
            router.addRoutes(rootRoute);
            console.log('输出路由:', JSON.stringify(rootRoute));
        },
        add_Routes_Fresh(state) {
            // if (state.routeParam && state.routeParam.length > 0) {
            this.commit('add_Routes', state.routeParam)
                // }
        }
    },
    actions: {
        add_Routes({ commit }, routeParam) {
            commit('add_Routes', routeParam)
        },
        add_Routes_Fresh({ commit }) {
            commit('add_Routes_Fresh')
        }
    }
}
export default addRoutes