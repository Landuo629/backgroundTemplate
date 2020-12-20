import Axios from "axios";
import headers from "./headers";

/**
 * 提供一体机管理等相关接口
 */
export default {
     /*
    * 提供分包桌排单等相关接口
    */
    // 获取所有的分包桌
    getSubTableList() {
        return Axios.get(`/api/mes/subcontractcall/queryDesk`, {
            headers
        })
    },
    // 查询分包桌排单表
    queryDeskOrder(subcontractNo) {
        return Axios.get(`/api/mes/subcontractcall/queryDeskOrder?subcontractNo=${subcontractNo}`, {
            headers
        })
    },
     // 分包桌-设置绣花位
     setEmbroider(subcontractNo,embroider) {
        return Axios.get(`/api/mes/subcontractcall/setEmbroider?subcontractNo=${subcontractNo}&embroider=${embroider}`, {
            headers
        })
    },
     // 分包桌叫料
     callproduct(cutref,subcontractNo) {
        return Axios.get(`/api/mes/subcontractcall/call?cutref=${cutref}&subcontractNo=${subcontractNo}`, {
            headers
        })
    },
     // 查询出订单对应的裁次
     queryOrderCutref(subcontractNo,orderNo) {
        return Axios.get(`/api/mes/subcontractcall/queryOrderCutref?subcontractNo=${subcontractNo}&orderNo=${orderNo}`, {
            headers
        })
    },
     // 分包桌排单
     setDeskOrder(subcontractOrderVo) {
        return Axios.post(`/api/mes/subcontractcall/setDeskOrder`,subcontractOrderVo,  {
            headers
        })
    },
     // 查询产线
     queryLine() {
        return Axios.get(`/api/mes/productionline/queryLine`, {
            headers
        })
    },
     // 查询当前产线对应的订单
     queryOrder(lineNo,strDate) {
        return Axios.get(`/api/mes/productionline/query?lineNo=${lineNo}&strDate=${strDate}`, {
            headers
        })
    },
     // 设置当前产线对应的订单
     setOrder(lineOrderVo) {
         var lineOrderVo=JSON.stringify(lineOrderVo)
        return Axios.post(`/api/mes/productionline/setOrder`,lineOrderVo, {
            headers
        })
    },
    // 合箱区开关设置
    set(flag) {
       return Axios.get(`/api/mes/mergebox/set?flag=${flag}` ,{
           headers
       })
   },
}