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
    return data;
}

/**
 * 提供裁次管理等相关接口
 */
export default {
  /** 
    * 提供裁次管理等相关接口
    */
    // 裁次任务分页查询
    getPcmesCutrefmgrPage(param) {
        return Axios.get(`/api/pcmes/cutrefmgr/page?${run(param)}`, {
            headers
        })
    },
    // 裁次库存分页查询
    getPcmesCutrefmgrPage2(param) {
        return Axios.get(`/api/pcmes/cutrefmgr/page2?${run(param)}`, {
            headers
        })
    },
     // 移动货架库存分页查询
     getPcmesCutrefmgrPage3(param) {
        return Axios.get(`/api/pcmes/cutrefmgr/page3?${run(param)}`, {
            headers
        })
    },
  /** 
    * 提供分包桌管理等相关接口
    */
    // 分包桌任务分页查询
    getPcmesSubcontractmgrPage(param) {
        return Axios.get(`/api/pcmes/subcontractmgr/page?${run(param)}`, {
            headers
        })
    },
    // 分包桌库存分页查询
    getPcmesSubcontractmgrPage2(param) {
        return Axios.get(`/api/pcmes/subcontractmgr/page2?${run(param)}`, {
            headers
        })
    },
  /** 
    * 提供绣花区管理等相关接口
    */
    // 绣花区任务分页查询
    getPcmesEmbroidermgrPage(param) {
        return Axios.get(`/api/pcmes/embroidermgr/page?${run(param)}`, {
            headers
        })
    },
    // 绣花区库存分页查询
    getPcmesEmbroidermgrPage2(param) {
        return Axios.get(`/api/pcmes/embroidermgr/page2?${run(param)}`, {
            headers
        })
    },
  /** 
    * 提供辅流程管理等相关接口
    */
    // 辅流程任务分页查询
    getPcmesAuxiliarymgrPage(param) {
        return Axios.get(`/api/pcmes/auxiliarymgr/page?${run(param)}`, {
            headers
        })
    },
    // 辅流程库存分页查询
    getPcmesAuxiliarymgrPage2(param) {
        return Axios.get(`/api/pcmes/auxiliarymgr/page2?${run(param)}`, {
            headers
        })
    },
    /** 
    * 提供合箱区管理等相关接口
    */
    // 合箱区任务分页查询
    getPcmesMergeboxmgrPage(param) {
        return Axios.get(`/api/pcmes/mergeboxmgr/page?${run(param)}`, {
            headers
        })
    },
    // 合箱区库存分页查询
    getPcmesMergeboxmgrPage2(param) {
        return Axios.get(`/api/pcmes/mergeboxmgr/page2?${run(param)}`, {
            headers
        })
    },
     // 工作站库存分页查询
     getPcmesMergeboxmgrPage3(param) {
        return Axios.get(`/api/pcmes/mergeboxmgr/page3?${run(param)}`, {
            headers
        })
    },
    /** 
    * 提供超市区管理等相关接口
    */
    // 超市区任务分页查询
    getPcmesSupermarketmgrPage(param) {
        return Axios.get(`/api/pcmes/supermarketmgr/page?${run(param)}`, {
            headers
        })
    },
    // 超市区库存分页查询
    getPcmesSupermarketmgrPage2(param) {
        return Axios.get(`/api/pcmes/supermarketmgr/page2?${run(param)}`, {
            headers
        })
    },
    /** 
    * 提供AGV管理等相关接口
    */
    // AGV发送任务记录分页查询
    getPcmesAgvsendmgrPage(param) {
        return Axios.get(`/api/pcmes/agvsendmgr/page?${run(param)}`, {
            headers
        })
    },
    // 箱与货位关系记录分页查询
    getPcmesAgvsendmgrPage2(param) {
        return Axios.get(`/api/pcmes/agvsendmgr/page2?${run(param)}`, {
            headers
        })
    },
    // AGV返回下行消息的状态报告
    getMesApiAgvStatus(param) {
            const data = {
                data: [param]
            } 
        param = JSON.stringify(data);
        console.log(param);
        return Axios.post(`/api/mes/api/agv/status`, param, {
            headers
        })
    },
    // 重发任务给AGV
    getMesAgvrepTask(id) {
        return Axios.get(`/api/mes/agvrep/task?taskid=${id}`, {
            headers
        })
    },
}