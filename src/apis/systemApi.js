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
    if (param.dictId != '' && param.dictId != undefined) {
        console.log(param.dictId != '' && param.dictId != undefined)
        data += `&dictId=${param.dictId}`;
    }
    return data;
}
/**
 * 提供系统管理等相关接口
 */
export default {
    /*
     * 提供登陆日志关接口
     */
    // 登陆日志分页查询
    getUpmsLogloginPage(param) {
        console.log(param);
        param = `current=${param.current}&size=${param.size}&descs=create_time`
        if (param.createId != '' && param.createId != undefined) {
            param += `&createId=${param.createId}`;
        }
        return Axios.get(`/api/upms/loglogin/page?${param}`, {
            headers
        })
    },
    /*
     * 提供日志管理相关接口
     */
    // 日志管理分页查询
    getUpmsLogPage(param) {
        console.log(param);
        return Axios.get(`/api/upms/log/page?${run(param)}`, {
            headers
        })
    },
    // 删除日志
    deleteUpmsLog(id) {
        console.log(id);
        return Axios.delete(`/api/upms/log/${id}`, { headers })
    },
    /*
     * 提供字典管理相关接口
     */
    // 分页查询列表
    getUpmsLogDictPage(param) {
        console.log(param);
        return Axios.get(`/api/upms/dict/page?${run(param)}`, {
            headers
        })
    },
    // 新增字典
    postUpmsDict(param) {
        return Axios.post(`/api/upms/dict`, param, {
            headers
        })
    },
    // 编辑字典
    putUpmsDict(param) {
        param = JSON.stringify(param);
        return Axios.put(`/api/upms/dict`, param, {
            headers
        })
    },
    // 删除字典
    deleteUpmsDict(id) {
        return Axios.delete(`/api/upms/dict/${id}`, {
            headers
        })
    },
    // 分页查询键值对列表
    getUpmsLogDictItemPage(param) {
        console.log(param);
        return Axios.get(`/api/upms/dict/item/page?${run(param)}`, {
            headers
        })
    },
    // 编辑键值对
    putUpmsDictItem(param) {
        param = JSON.stringify(param);
        return Axios.put(`/api/upms/dict/item`, param, {
            headers
        })
    },
    // 删除键值对
    deleteUpmsDictItem(id) {
        return Axios.delete(`/api/upms/dict/item/${id}`, {
            headers
        })
    },
    // 新增键值对
    postUpmsDictItem(param) {
        return Axios.post(`/api/upms/dict/item`, param, {
            headers
        })
    },
}