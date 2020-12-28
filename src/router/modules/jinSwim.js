import Layout from "@/layout/index";
import TopLayout from "@/layout/topLayout";

const jinSwimRouter = {
    path: '/jinSwim',
    name: 'jinSwim',
    component: TopLayout,
    redirect: '/jinSwim/home',
    meta: {title: '晋乡游'},
    children: [
      {
        path: '/jinSwim/home',
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
      {
        path: '/jinSwim/releases',
        redirect: '/jinSwim/releases/scenery',
        component: Layout,
        name: 'Releases',
        meta: {title: '发布管理', icon: 'publish'},
        children: [
          {
            path: 'scenery',
            name: 'Scenery',
            redirect: '/jinSwim/releases/scenery/list',
            component: () => import('@/views/jinSwim/publish/scenery'),
            meta: {title: '风景发布', icon: 'scenery'},
            children: [
              {
                path: 'list',
                name: 'List',
                component: () => import('@/views/jinSwim/publish/scenery/list'),
                meta: {title: '风景列表'},
                hidden: true
              },
              {
                path: 'compile',
                name: 'Compile',
                component: () => import('@/views/jinSwim/publish/scenery/compile'),
                meta: {title: '风景编辑'},
                hidden: true
              },
              {
                path: 'details',
                name: 'Details',
                component: () => import('@/views/jinSwim/publish/scenery/details'),
                meta: {title: '风景详情'},
                hidden: true
              },
            ]
          },
          {
            path: 'gourmet',
            name: 'Gourmet',
            redirect: '/jinSwim/releases/gourmet/list',
            component: () => import('@/views/jinSwim/publish/gourmet'),
            meta: {title: '美食发布', icon: 'cate'},
            children: [
              {
                path: 'list',
                name: 'List',
                component: () => import('@/views/jinSwim/publish/gourmet/list'),
                meta: {title: '美食列表'},
                hidden: true
              },
              {
                path: 'compile',
                name: 'Compile',
                component: () => import('@/views/jinSwim/publish/gourmet/compile'),
                meta: {title: '美食编辑'},
                hidden: true
              },
              {
                path: 'details',
                name: 'Details',
                component: () => import('@/views/jinSwim/publish/gourmet/details'),
                meta: {title: '美食详情'},
                hidden: true
              },
            ]
          },
          {
            path: 'homeStay',
            name: 'HomeStay',
            redirect: '/jinSwim/releases/homeStay/list',
            component: () => import('@/views/jinSwim/publish/homeStay'),
            meta: {title: '民宿发布', icon: 'cate'},
            children: [
              {
                path: 'list',
                name: 'List',
                component: () => import('@/views/jinSwim/publish/homeStay/list'),
                meta: {title: '民宿列表'},
                hidden: true
              },
              {
                path: 'compile',
                name: 'Compile',
                component: () => import('@/views/jinSwim/publish/homeStay/compile'),
                meta: {title: '民宿编辑'},
                hidden: true
              },
              {
                path: 'details',
                name: 'Details',
                component: () => import('@/views/jinSwim/publish/homeStay/details'),
                meta: {title: '民宿详情'},
                hidden: true
              },
            ]
          },
          {
            path: 'specialty',
            name: 'Specialty',
            redirect: '/jinSwim/releases/specialty/list',
            component: () => import('@/views/jinSwim/publish/specialty'),
            meta: {title: '特产发布', icon: 'specialty'},
            children: [
              {
                path: 'list',
                name: 'List',
                component: () => import('@/views/jinSwim/publish/specialty/list'),
                meta: {title: '特产列表'},
                hidden: true
              },
              {
                path: 'compile',
                name: 'Compile',
                component: () => import('@/views/jinSwim/publish/specialty/compile'),
                meta: {title: '特产编辑'},
                hidden: true
              },
              {
                path: 'details',
                name: 'Details',
                component: () => import('@/views/jinSwim/publish/specialty/details'),
                meta: {title: '特产详情'},
                hidden: true
              },
            ]
          },
          {
            path: 'tree',
            name: 'Tree',
            component: () => import('@/views/tree/index'),
            meta: {title: 'Tree', icon: 'tree'}
          }
        ]
      },
      {
        path: '/jinSwim/operation',
        redirect: '/jinSwim/operation/carriage',
        component: Layout,
        name: 'Operation',
        meta: {title: '运营管理', icon: 'operation'},
        children: [
          {
            path: 'carriage',
            name: 'Carriage',
            redirect: '/jinSwim/operation/carriage/list',
            component: () => import('@/views/jinSwim/operation/carriage'),
            meta: {title: '运费管理', icon: 'carriage'},
            children: [
              {
                path: 'list',
                name: 'List',
                component: () => import('@/views/jinSwim/operation/carriage/list'),
                meta: {title: '运费列表'},
                hidden: true
              },
              {
                path: 'compile',
                name: 'Compile',
                component: () => import('@/views/jinSwim/operation/carriage/compile'),
                meta: {title: '运费编辑'},
                hidden: true
              },
              {
                path: 'details',
                name: 'Details',
                component: () => import('@/views/jinSwim/operation/carriage/details'),
                meta: {title: '运费详情'},
                hidden: true
              },
            ]
          }
        ]
      }
    ]
  }

export default jinSwimRouter
