import Axios from "axios";
import qs from "qs";
import headers from "./headers";

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
        console.log(headers)
        return Axios.get('/upms/menu', {
            headers
        });
    },
    /**
     * 退出登陆
     */
    loginOut: function() {
        return Axios.post('/shiro-api/loginout');
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
        return Axios.post('/loginlog-api/save', param);
    },
    /**
     * 还原数据
     */
    rollBackTables: function() {
        return Axios.post('/loginlog-api/rollBackTables');
    }
}