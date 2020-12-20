import adminApi from './adminApi';
import shiroApi from './shiroApi';
import mayiApi from './mayiApi';
import msgApi from './msgApi';
import integratedMachineApi from './integratedMachineApi';
import systemApi from './systemApi.js';
import pccutmsgApi from './pccutmsgApi.js';
import baseApi from './baseApi.js';
/**
 * 接口汇总
 */
export default {
    /**用户,角色,组织等管理接口 */
    adminApi: adminApi,
    /**认证接口 */
    shiroApi: shiroApi,
    /**蚂蚁种树接口 */
    mayiApi:mayiApi,
    /**消息接口 */
    msgApi:msgApi,
    /** 一体机接口 */
    integratedMachineApi: integratedMachineApi,
    /** 系统管理 */
    systemApi: systemApi,
    /** 业务接口 */
    pccutmsgApi: pccutmsgApi,
    /** 基础信息 */
    baseApi: baseApi,
}