import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import { Loading } from 'element-ui';

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/index'
    },
    {
        path: '/login',
        component: () =>
            import ('@/views/login.vue'),
        meta: {
            title: '登陆'
        }
    }, 
    {
        path: '/404',
        component: () =>
            import ('@/common/404.vue'),
    },
    {
        path: '/403',
        component: () =>
            import ('@/common/403.vue'),
    },
    {
        path: '*',
        redirect: '/404'
    },
]

/**
 * 请求拦截器,添加全局加载loding/token
 */
let loadingInstance;
axios.interceptors.request.use(
    config => {
        console.log('>>>请求url:', config.url);
        const options = {
            lock: true, //lock的修改符--默认是false
            text: 'Loading', //显示在加载图标下方的加载文案
            spinner: 'el-icon-loading', //自定义加载图标类名
            background: 'rgba(0, 0, 0, 0.7)', //遮罩层颜色
            target: document.querySelector('#table') //loadin覆盖的dom元素节点
        };
        loadingInstance = Loading.service(options);;
        // 配置token
        var headers = config.headers;
        if (sessionStorage.getItem("token")) {
            headers.Authorization = sessionStorage.getItem("token");
        }
        return config;
    },
    error => {
        console.log('>>>请求异常:', error.message);
        return Promise.reject(error);
    });
//接口请求超时设置
axios.defaults.timeout = 5000; //毫秒
/**
 * 应答拦截器,关闭全局加载loding
 */
axios.interceptors.response.use(function(response) {
    // Do something with response data
    console.log('<<<请求成功');
    loadingInstance.close();
    return response;
}, error => {
    // Do something with response error
    console.log('<<<异常信息:', error.message);
    loadingInstance.close();
    return Promise.reject(error);
});

const router = new VueRouter({
    routes,
    mode: 'history'
})

//全局路由守卫
router.beforeEach((to, from, next) => {
    let token = sessionStorage.getItem('token');
    // 如果没登录,都导向登录页
    if (!token) {
        if (to.path !== '/login') {
            next({ path: '/login' })
        } else {
            next();
        }
    } else {
        next();
    }
})

export default router