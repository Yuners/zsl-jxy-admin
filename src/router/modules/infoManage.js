import Layout from "@/layout/index";
import TopLayout from "@/layout/topLayout";

const infoManageRouter = {
    path: '/infoManage',
    name: 'infoManage',
    component: TopLayout,
    redirect: '/infoManage/home',
    meta: {title: '信息管理'},
    children: [
      {
        path: '/infoManage/home',
        name: 'Home',
        component: Layout,
        redirect: '/infoManage/home/index',
        meta: {title: 'Home', icon: 'dashboard'},
        children: [
          {
            path: 'index',
            name: 'Index',
            component: () => import('@/views/infoManage/Home/index'),
            hidden: true
          }
        ]
      },
      {
        path: '/infoManage/basics',
        redirect: '/infoManage/basics/vallage',
        name: 'infoManage',
        component: Layout,
        meta: {title: '基础信息', icon: 'el-icon-s-help'},
        children: [
          {
            path: 'vallage',
            name: 'Vallage',
            redirect: '/infoManage/basics/vallage/list',
            component: () => import('@/views/infoManage/basics/vallage'),
            meta: {title: '乡村概括', icon: 'table'},
            children: [
              {
                path: 'list',
                name: 'List',
                component: () => import('@/views/infoManage/basics/vallage/list'),
                meta: {title: '信息列表', icon: 'table'},
                hidden: true
              },
              {
                path: 'compile',
                name: 'Compile',
                component: () => import('@/views/infoManage/basics/vallage/compile'),
                meta: {title: '乡村编辑'},
                hidden: true
              },
              {
                path: 'details',
                name: 'Details',
                component: () => import('@/views/infoManage/basics/vallage/details'),
                meta: {title: '乡村详情'},
                hidden: true
              },
            ]
          },
          {
            path: 'infrastructure',
            name: 'Infrastructure',
            redirect: '/infoManage/basics/infrastructure/list',
            component: () => import('@/views/infoManage/basics/infrastructure'),
            meta: {title: '基础建设', icon: 'table'},
            children: [
              {
                path: 'list',
                name: 'List',
                component: () => import('@/views/infoManage/basics/infrastructure/list'),
                meta: {title: '基础建设列表', icon: 'table'},
                hidden: true
              },
              {
                path: 'compile',
                name: 'Compile',
                component: () => import('@/views/infoManage/basics/infrastructure/compile'),
                meta: {title: '基础建设编辑'},
                hidden: true
              },
              {
                path: 'details',
                name: 'Details',
                component: () => import('@/views/infoManage/basics/infrastructure/details'),
                meta: {title: '基础建设详情'},
                hidden: true
              },
            ]
          },
          {
            path: 'land',
            name: 'Land',
            redirect: '/infoManage/basics/land/list',
            component: () => import('@/views/infoManage/basics/land'),
            meta: {title: '土地信息', icon: 'table'},
            children: [
              {
              path: 'list',
              name: 'List',
              component: () => import('@/views/infoManage/basics/land/list'),
              meta: {title: '土地信息列表', icon: 'table'},
              hidden: true
              },
              {
                path: 'compile',
                name: 'Compile',
                component: () => import('@/views/infoManage/basics/land/compile'),
                meta: {title: '土地信息编辑'},
                hidden: true
              },
              {
                path: 'details',
                name: 'Details',
                component: () => import('@/views/infoManage/basics/land/details'),
                meta: {title: '土地信息详情'},
                hidden: true
              },
            ]
          },
          {
            path: 'population',
            name: 'Population',
            redirect: '/infoManage/basics/population/list',
            component: () => import('@/views/infoManage/basics/population'),
            meta: {title: '人口信息', icon: 'table'},
            children: [
              {
                path: 'list',
                name: 'List',
                component: () => import('@/views/infoManage/basics/population/list'),
                meta: {title: '人口信息列表', icon: 'table'},
                hidden: true
              },
              {
                path: 'compile',
                name: 'Compile',
                component: () => import('@/views/infoManage/basics/population/compile'),
                meta: {title: '人口信息编辑'},
                hidden: true
              },
              {
                path: 'details',
                name: 'Details',
                component: () => import('@/views/infoManage/basics/population/details'),
                meta: {title: '人口信息详情'},
                hidden: true
              },
            ]
          },
          {
            path: 'economics',
            name: 'Economics',
            redirect: '/infoManage/basics/economics/list',
            component: () => import('@/views/infoManage/basics/economics'),
            meta: {title: '经济管理', icon: 'table'},
            children: [
              {
                path: 'list',
                name: 'List',
                component: () => import('@/views/infoManage/basics/economics/list'),
                meta: {title: '经济管理列表', icon: 'table'},
                hidden: true
              },
              {
                path: 'compile',
                name: 'Compile',
                component: () => import('@/views/infoManage/basics/economics/compile'),
                meta: {title: '经济管理编辑'},
                hidden: true
              },
              {
                path: 'details',
                name: 'Details',
                component: () => import('@/views/infoManage/basics/economics/details'),
                meta: {title: '经济管理详情'},
                hidden: true
              },
            ]
          }
        ]
      },
    ]
  }

export default infoManageRouter
