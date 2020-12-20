import Axios from "axios";
import headers from "./headers";

function run(param) {
    let data = `current=${param.current}&size=${param.size}`
    if (param.organId != '' && param.organId != undefined) {
        console.log(param.organId != '' && param.organId != undefined)
        data += `&organId=${param.organId}`;
    }
    return data;
}

/**
 * 提供权限管理等相关接口
 */
export default {
    /*
     * 提供菜单管理等相关接口
     */
    // 返回菜单全部的树形菜单集合
    getUpmsMenuAllTree() {
        return Axios.get('/upms/menu/all/tree', {
            headers
        })
    },
    // 返回租户管理员角色的菜单集合
    getUpmsMenu() {
        return Axios.get('/upms/menu', {
            headers
        })
    },
    //新增菜单
    postUpmsMenu(param) {
        param = JSON.stringify(param)
        return Axios.post('/upms/menu', param, {
            headers
        })
    },
    //删除菜单
    deleteUpmsMenu(param) {
        console.log(param);
        return Axios.delete(`/upms/menu/${param}`, { headers })
    },
    // 返回角色已选中的菜单节点数组
    getUpmsMenuTreeRoleId(param) {
        console.log(param);
        return Axios.get(`/upms/menu/tree/${param}`, {
            headers
        })
    },
    // 返回当前用户的树形菜单集合
    getUpmsMenuTreeTenantTenantId(tenantId) {
        return Axios.get(`/upms/menu/tree/tenant/${tenantId}`, {
            headers
        })
    },
    // 返回权限的树形菜单集合
    getUpmsMenuTree() {
        return Axios.get(`/upms/menu/tree`, {
            headers
        })
    },
    // 更新菜单
    putUpmsMenu(param) {
        console.log(param);
        return Axios.put(`/upms/menu`, param, {
            headers
        })
    },
    // 通过ID查询菜单的详细信息
    getUpmsMenuId(param) {
        console.log(param);
        return Axios.get(`/upms/menu/${param}`, {
            headers
        })
    },
    /*
     * 提供角色管理等相关接口
     */
    // 获取角色
    getUpmsRolePage() {
        return Axios.get('/upms/role/page', {
            headers
        })
    },
    // 修改角色
    putUpmsRole(param) {
        console.log(param);
        param = JSON.stringify(param)
        return Axios.put('/upms/role', param, {
            headers
        })
    },
    // 删除角色
    deleteUpmsRole(param) {
        console.log(param);
        return Axios.delete(`/upms/role/${param}`, {
            headers
        })
    },
    // 添加角色
    addUpmsRole(param) {
        console.log(param);
        return Axios.post(`/upms/role`, param, {
            headers
        })
    },
    // 更新角色菜单
    putUpmsRoleMenu(param) {
        param = JSON.stringify(param);
        console.log(param);
        return Axios.put(`/upms/role/menu`, param, {
            headers
        })
    },
    // 更新租户管理员角色菜单
    putUpmsRoleMenuTenant(param) {
        param = JSON.stringify(param);
        console.log(param);
        return Axios.put(`/upms/role/menu/tenant`, param, {
            headers
        })
    },
    /*
     * 提供用户管理等相关接口
     */
    // 查询根据username查询用户
    getUpmsUserAncestor(param) {
        param = 'admin';
        return Axios.get(`/upms/user/ancestor/${param}`, {
            headers
        })
    },
    // 全部数据分页查询
    getUpmsUserPage(param) {
        return Axios.get(`/upms/user/page?${run(param)}`, {
            headers
        })
    },
    // 更新用户信息
    putUpmsUser(param) {
        param = JSON.stringify(param);
        return Axios.put(`/upms/user`, param, {
            headers
        })
    },
    // 根据id删除用户信息
    deleteUpmsUserId(param) {
        return Axios.delete(`/upms/user/${param}`, {
            headers
        })
    },
    // 添加用户
    postUpmsUser(param) {
        param = JSON.stringify(param);
        return Axios.post(`/upms/user`, param, {
            headers
        })
    },
    // 修改用户密码
    putUpmsUserPassword(param) {
        param = JSON.stringify(param);
        return Axios.put(`/upms/user/password`, param, {
            headers
        })
    },
    /*
     * 提供机构管理等相关接口
     */
    // 返回机构树形菜单集合[列表请求]
    getUpmsOrganTree() {
        return Axios.get(`/upms/organ/tree`, {
            headers
        })
    },
    // 通过ID查询机构
    getUpmsOrganId(id) {
        return Axios.get(`/upms/organ/${id}`, {
            headers
        })
    },
    // 通过ID查询机构
    postUpmsOrgan(param) {
        return Axios.post(`/upms/organ`, param, {
            headers
        })
    },
    // 修改机构
    putUpmsOrgan(param) {
        param = JSON.stringify(param);
        return Axios.put(`/upms/organ`, param, {
            headers
        })
    },
    // 根据id删除用户信息
    deleteUpmsOrganId(id) {
        return Axios.delete(`/upms/organ/${id}`, {
            headers
        })
    },
    /*
     * 提供租户等相关接口
     */
    // 返回机构树形菜单集合[列表请求]
    getUpmsTenantTree() {
        return Axios.get(`/upms/tenant/tree`, {
            headers
        })
    },
    // 通过ID查询机构
    getUpmsTenantId(id) {
        return Axios.get(`/upms/tenant/${id}`, {
            headers
        })
    },
    // 新增机构
    postUpmsTenant(param) {
        return Axios.post(`/upms/tenant`, param, {
            headers
        })
    },
    // 修改机构
    putUpmsTenant(param) {
        param = JSON.stringify(param);
        return Axios.put(`/upms/tenant`, param, {
            headers
        })
    },
    // 根据id删除用户信息
    deleteUpmsTenantId(id) {
        return Axios.delete(`/upms/tenant/${id}`, {
            headers
        })
    }
}