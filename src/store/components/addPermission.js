const addPermission={
    state:{
        btnPermissions:[],
        tooltip: true // 表格当内容过长被隐藏时显示 tooltip
    },
    getters:{
        btnPermissions:state=>{
            return state.btnPermissions;
        }
    },
    mutations:{
        add_Permissions(state,param){
            state.btnPermissions=param;
        },
        tooltipCommit() {
            state.tooltip = !state.tooltip;
        }
    },
    actions:{
        add_Permissions({commit},param){
            var permissionList=[];
            if(param&&param.length>0){
                for(var i=0;i<param.length;i++){
                    permissionList.push(param[i].permission);
                }
                commit('add_Permissions',permissionList);
            }
        }
    }

}
export default addPermission;