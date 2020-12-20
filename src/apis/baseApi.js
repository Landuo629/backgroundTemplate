import Axios from "axios";
import headers from "./headers";

function run(param) {
    let data = `current=${param.current}&size=${param.size}&descs=create_time`
    if (param.createId != '' && param.createId != undefined) {
        data += `&createId=${param.createId}`;
    }
    if (param.method != '' && param.method != undefined) {
        data += `&method=${param.method}`;
    }
    console.log(param.type != '' && param.type != undefined)
    if (param.type != '' && param.type != undefined) {
        console.log(param.type != '' && param.type != undefined)
        data += `&type=${param.type}`;
    }
    if (param.areaNo != '' && param.areaNo != undefined) {
        console.log(param.areaNo != '' && param.areaNo != undefined)
        data += `&areaNo=${param.areaNo}`;
    }
    return data;
}

/**
 * 提供基础信息等相关接口
 */
export default {
    /*
     * 提供货位查询相关接口
     */
    // 货位管理分页查询
    getMesCargospaceQuery(param) {
        console.log(param);
        return Axios.get(`/api/mes/cargospace/query?${run(param)}`, {
            headers
        })
    },
    // 增加货位
    postMesCargospaceAdd(param) {
        console.log(param);
        return Axios.post(`/api/mes/cargospace/add`, param, {
            headers
        })
    },
     // 编辑货位
     putMescCargospaceUpdate(param) {
        console.log(param);
        return Axios.put(`/api/mes/cargospace/update`, param, {
            headers
        })
    },
    // 删除货位
    deleteMesCargospaceId(id) {
        return Axios.delete(`/api/mes/cargospace/${id}`, {
            headers
        })
    },
    /*
     * 提供货区管理相关接口
     */
    // 货区管理分页查询
    getMesCargoareaQuery(param) {
        console.log(param);
        return Axios.get(`/api/mes/cargoarea/query?${run(param)}`, {
            headers
        })
    },
    // 根据id查询货区
    getMesCargoareaId(id) {
        console.log(id);
        return Axios.get(`/api/mes/cargoarea/${id}`, {
            headers
        })
    },
    // 增加货区
    postMesCargoareaAdd(param) {
        console.log(param);
        return Axios.post(`/api/mes/cargoarea/add`, param, {
            headers
        })
    },
    // 编辑货区
    putMesCargoareaUpdate(param) {
        console.log(param);
        return Axios.put(`/api/mes/cargoarea/update`, param, {
            headers
        })
    },
    // 删除货区
    deleteMesCargoareaId(id) {
        return Axios.delete(`/api/mes/cargoarea/${id}`, {
            headers
        })
    },
    // 修改货区货位
    getMesCargoareaUpdate(param) {
        console.log(param);
        return Axios({
            methods: 'get',
            url: '/api/mes/cargoarea/update',
            params: param,
            headers: headers
        })
    },
    /*
     * 提供箱号管理相关接口
     */
    // 所有箱查询
    getMesEmptyboxPage(param) {
        console.log(param);
        return Axios.get(`/api/mes/emptybox/page`, {
            headers
        })
    },
    // 根据id查询货区
    getMesEmptyboxId(id) {
        console.log(id);
        return Axios.get(`/api/mes/emptybox/${id}`, {
            headers
        })
    },
    // 空箱回超市区
    getMesEmptyboxReturn(param) {
        console.log(param);
        return Axios({
            methods: 'get',
            url: '/api/mes/emptybox/return',
            params: param,
            headers: headers
        })
    },
    // 分包桌叫空箱[分包桌的左侧空箱货位]
    getMesEmptyboxSubcontractcall(param) {
        console.log(param);
        return Axios({
            methods: 'get',
            url: '/api/mes/emptybox/subcontractcall',
            params: param,
            headers: headers
        })
    },
    // 增加箱
    postMesEmptyboxAdd(param) {
        console.log(param);
        return Axios.post(`/api/mes/emptybox/add`, param, {
            headers
        })
    },
    // 编辑箱
    putMesEmptyboxUpdate(param) {
        console.log(param);
        return Axios.put(`/api/mes/emptybox/update`, param, {
            headers
        })
    },
    // 删除箱
    deleteMesEmptyboxId(id) {
        return Axios.delete(`/api/mes/emptybox/${id}`, {
            headers
        })
    },
}