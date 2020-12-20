/**
 * 这里配置开发环境写死的路由和菜单，方便开发
 */

//静态路由
var routeDevList = [
    /*
     * 权限管理
     */
    {
        path: '/menuManagement',
        component: () =>
            import ('@/views/systemManagement/menuManagement.vue'),
        meta: {
            title: '菜单管理'
        }
    }, {
        path: '/roleManagement',
        component: () =>
            import ('@/views/systemManagement/roleManagement.vue'),
        meta: {
            title: '角色管理'
        }
    }, {
        path: '/userManagement',
        component: () =>
            import ('@/views/systemManagement/userManagement.vue'),
        meta: {
            title: '用户管理'
        }
    }, {
        path: '/organManagement',
        component: () =>
            import ('@/views/systemManagement/organManagement.vue'),
        meta: {
            title: '机构管理'
        }
    }, {
        path: '/tenantManagement',
        component: () =>
            import ('@/views/systemManagement/tenantManagement.vue'),
        meta: {
            title: '租户管理'
        },
    }
];
//静态菜单
var menuDevList = [{
        icon: 'el-icon-edit',
        index: Math.random() + '',
        title: '绣花',
        subs: [{
            index: 'embroidery',
            title: '绣花'
        }, ]
    },
    {
        icon: 'el-icon-sort',
        index: Math.random() + '',
        title: '生产线',
        subs: [{
            index: 'prolinesetting',
            title: '产线设置'
        }, {
            index: 'monitorline',
            title: '监控水位线'
        }, {
            index: 'lineout',
            title: '产线拉动'
        }]
    },
    {
        icon: 'el-icon-goods',
        index: Math.random() + '',
        title: '分包叫料',
        subs: [{
            index: 'prolinesetting',
            title: '叫料排单'
        }, {
            index: 'monitorline',
            title: '分包桌排单 '
        }]
    },
    {
        icon: 'el-icon-sold-out',
        index: Math.random() + '',
        title: '分包出料',
        subs: [{
            index: 'prolinesetting',
            title: '设置绣花位'
        }]
    },
    {
        icon: 'el-icon-tickets',
        index: Math.random() + '',
        title: '辅流程',
        subs: [{
            index: 'prolinesetting',
            title: '辅流程设置'
        }]
    },
    {
        icon: 'el-icon-tickets',
        index: Math.random() + '',
        title: '权限管理',
        subs: [{
                index: 'menuManagement',
                title: '菜单管理'
            },
            {
                index: 'roleManagement',
                title: '角色管理'
            },
            {
                index: 'userManagement',
                title: '用户管理'
            }, {
                index: 'organManagement',
                title: '机构管理'
            }, {
                index: 'tenantManagement',
                title: '租户管理'
            }
        ]
    },
    {
        icon: 'el-icon-tickets',
        index: Math.random() + '',
        title: '一体机管理',
        subs: [{
                index: 'subcontractingTableList',
                title: '分包桌排单'
            },
            {
                index: 'setEmbroider',
                title: '分包桌设置绣花位'
            },
            {
                index: 'callproduct',
                title: '分包桌叫料'
            },
            {
                index: 'flcTableList',
                title: '辅流程设置绣花架号'
            },
            {
                index: 'mergeBox',
                title: '合箱区开关'
            },
            {
                index: 'auxiliaryTableList',
                title: '生产线排单'
            },
        ]
    }

]


var routeDev = {
    ROUTE_DEV: true, //是否写入静态路由（开关）
    routeDevList: routeDevList,
    MENU_DEV: false, //是否写入静态菜单（开关）
    menuDevList: menuDevList,
}
export default routeDev;