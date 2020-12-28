import Layout from "@/layout/index";
import TopLayout from "@/layout/topLayout";

const sysManageRouter = {
    path: '/sysManage',
    name: 'sysManage',
    component: TopLayout,
    redirect: '/jinSwim/home',
    meta: {title: '系统管理'},
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Layout,
        redirect: '/jinSwim/home/index',
        meta: {title: 'Home', icon: 'dashboard'},
        children: [
          {
            path: 'index',
            name: 'Index',
            component: () => import('@/views/jinSwim/Home/index'),
            hidden: true
          }
        ]
      },
      
    ]
  }

export default sysManageRouter
