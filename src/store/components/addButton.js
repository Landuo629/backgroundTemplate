const addPermission = {
    state: {
        buttonList: []
    },
    getters: {},
    mutations: {
        add_buttons(state, param) {
            console.log(state.buttonList);
            console.log(param);
            let buttonList = [];
            if (param) {
                _addButtons(buttonList, param);
                state.buttonList = buttonList;
            }

            function _addButtons(buttonList, params) {
                for (let i = 0; i < params.length; i++) {
                    if (params[i].type == '1') {
                        buttonList.push(params[i].permission);
                    }
                    if (params[i].children != null) {
                        _addButtons(buttonList, params[i].children);
                    }
                }
            }
        },
    },
    actions: {
        add_buttons({ commit }, buttonParam) {
            commit('add_buttons', buttonParam)
        },
    }
}
export default addPermission;