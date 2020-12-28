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
      
    ]
  }

export default sysManageRouter
