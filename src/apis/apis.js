import adminApi from './adminApi';
import shiroApi from './shiroApi';
import systemApi from './systemApi.js';
/**
 * 接口汇总
 */
export default {
    /**用户,角色,组织等管理接口 */
    adminApi: adminApi,
    /**认证接口 */
    shiroApi: shiroApi,
    /** 系统管理 */
    systemApi: systemApi,
}