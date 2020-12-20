import routeDev from '@/router/routeDev'
/**
 * 动态添加菜单
 * author:qlx
 */
const addMenus = {
    state: {
        menuList: []
    },
    getters: {
        getMenuList: state => {
            if (routeDev.MENU_DEV == true) {
                return state.menuList.concat(routeDev.menuDevList);
            } else {
                return state.menuList;
            }

        }
    },
    mutations: {
        add_Menus(state, param) {
            if (param) {
                var menuList = [];
                _addMenu(menuList, param);
                state.menuList = menuList;
            }

            function _addMenu(menuList, params) {
                for (var i = 0; i < params.length; i++) {
                    var menu = {
                        icon: 'el-icon-tickets',
                        index: '1',
                        title: '工作台',
                        subs: []
                    };
                    var menuParam = params[i];
                    //  if(menuParam.isShow==0){
                    //     continue;
                    // }
                    menu.icon = `el-icon-${menuParam.icon}`;
                    // menu.index=menuParam.orderBy;
                    menu.index = menuParam.path.slice(1);
                    menu.title = menuParam.name;
                    if (menuParam.children && menuParam.children.length > 0) {
                        _addMenu(menu.subs, menuParam.children);
                    }
                    menuList.push(menu);
                }
            }
        }
    },
    actions: {
        add_Menus({ commit }, param) {
            commit('add_Menus', param)
        }
    }
}
export default addMenus