import Axios from "axios";
import qs from "qs";
import headers from "./headers";
// 添加请求拦截器
// axios.interceptors.request.use((config) => {
//     // 在发送请求之前做些什么
//     if (config.method === 'post') {
//         config.data = qs.stringify(config.data);
//     }
//     return config;
// }, (error) => {
//     // 对请求错误做些什么
//     return Promise.reject(error);
// });
/**
 * 系统认证接口
 */
export default {
    /**
     * 系统登陆
     */
    loginIn: function({ loginName, password }) {
        var param = {
            grant_type: "password",
            username: loginName,
            password: password,
            scope: "server"
        };
        param = qs.stringify(param);
        return Axios.post('/auth/oauth/token',
            param, {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic YWRtaW46YWRtaW4='
                }
            });

    },
    // 获取菜单
    loginMenu: function() {
        // var param = {
        //     grant_type: "password",
        //     username: loginName,
        //     password: password,
        //     scope: "server"
        // };
        console.log(headers)
        return Axios.get('/upms/menu', {
            // param,
            headers
        });
    },
    /**
     * 退出登陆
     */
    loginOut: function() {
        return Axios.post('/api/shiro-api/loginout');
    },
    /**
     * 记录登陆日志
     */
    loginLog: function({ ip, city, type }) {
        var param = {
            ip: ip,
            city: city,
            type: type
        };
        return Axios.post('/api/loginlog-api/save', param);
    },
    /**
     * 还原数据
     */
    rollBackTables: function() {
        return Axios.post('/api/loginlog-api/rollBackTables');
    }
}