import Layout from "@/layout/index";
import TopLayout from "@/layout/topLayout";

const sysManageRouter = {
    path: '/sysManage',
    name: 'sysManage',
    component: TopLayout,
    redirect: '/sysManage/home',
    meta: {title: '系统管理'},
    children: [
        {
            path: '/sysManage/home',
            name: 'Home',
            component: Layout,
            redirect: '/sysManage/home/index',
            meta: {title: 'Home', icon: 'dashboard'},
            children: [
                {
                    path: 'index',
                    name: 'Index',
                    component: () => import('@/views/sysManage/Home/index'),
                    hidden: true
                }
            ]
        },
        {
            path: '/sysManage/jurisdiction',
            redirect: '/sysManage/jurisdiction/framework',
            component: Layout,
            name: 'Releases',
            meta: {title: '平台设置', icon: 'publish'},
            children: [
                {
                    path: 'framework',
                    name: 'Framework',
                    redirect: '/sysManage/jurisdiction/framework/tree',
                    component: () => import('@/views/sysManage/jurisdiction/framework'),
                    meta: {title: '个人信息', icon: 'scenery'},
                    children: [
                        {
                            path: 'tree',
                            name: 'Tree',
                            component: () => import('@/views/sysManage/jurisdiction/framework/tree'),
                            meta: {title: '行政树'},
                            hidden: true
                        }
                    ]
                },
            ]
        },
        {
            path: '/sysManage/jurisdiction',
            redirect: '/sysManage/jurisdiction/framework',
            component: Layout,
            name: 'Releases',
            meta: {title: '权限管理', icon: 'publish'},
            children: [
                {
                    path: 'framework',
                    name: 'Framework',
                    redirect: '/sysManage/jurisdiction/framework/tree',
                    component: () => import('@/views/sysManage/jurisdiction/framework'),
                    meta: {title: '行政区划', icon: 'scenery'},
                    children: [
                        {
                            path: 'tree',
                            name: 'Tree',
                            component: () => import('@/views/sysManage/jurisdiction/framework/tree'),
                            meta: {title: '行政树'},
                            hidden: true
                        }
                    ]
                },
                {
                    path: 'role',
                    name: 'Role',
                    redirect: '/sysManage/jurisdiction/role/list',
                    component: () => import('@/views/sysManage/jurisdiction/role'),
                    meta: {title: '角色管理', icon: 'scenery'},
                    children: [
                        {
                            path: 'list',
                            name: 'List',
                            component: () => import('@/views/sysManage/jurisdiction/role/list'),
                            meta: {title: '角色列表'},
                            hidden: true
                        },{
                            path: 'compile',
                            name: 'Compile',
                            component: () => import('@/views/sysManage/jurisdiction/role/compile'),
                            meta: {title: '角色编辑'},
                            hidden: true
                        }
                    ]
                },
                {
                    path: 'user',
                    name: 'User',
                    redirect: '/sysManage/jurisdiction/user/list',
                    component: () => import('@/views/sysManage/jurisdiction/user'),
                    meta: {title: '权限用户', icon: 'scenery'},
                    children: [
                        {
                            path: 'list',
                            name: 'List',
                            component: () => import('@/views/sysManage/jurisdiction/user/list'),
                            meta: {title: '权限用户列表'},
                            hidden: true
                        },
                        {
                            path: 'compile',
                            name: 'Compile',
                            component: () => import('@/views/sysManage/jurisdiction/user/compile'),
                            meta: {title: '用户编辑'},
                            hidden: true
                        }
                    ]
                },
                {
                    path: 'directoryTree',
                    name: 'DirectoryTree',
                    redirect: '/sysManage/jurisdiction/directoryTree/tree',
                    component: () => import('@/views/sysManage/jurisdiction/directoryTree'),
                    meta: {title: '菜单管理', icon: 'scenery'},
                    children: [
                        {
                            path: 'tree',
                            name: 'Tree',
                            component: () => import('@/views/sysManage/jurisdiction/directoryTree/tree'),
                            meta: {title: '菜单树'},
                            hidden: true
                        }
                    ]
                },
                
            ]
        }
    ]
  }

export default sysManageRouter
