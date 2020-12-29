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
        meta: {title: '权限管理', icon: 'publish'},
        children: [
            {
                path: 'framework',
                name: 'Framework',
                redirect: '/sysManage/jurisdiction/framework/tree',
                component: () => import('@/views/sysManage/jurisdiction/framework'),
                meta: {title: '组织机构', icon: 'scenery'},
                children: [
                    {
                        path: 'tree',
                        name: 'Tree',
                        component: () => import('@/views/sysManage/jurisdiction/framework/tree'),
                        meta: {title: '组织树'},
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
