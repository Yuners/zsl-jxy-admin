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
        redirect: '/jinSwim/releases/village',
        component: Layout,
        name: 'Releases',
        meta: {title: '发布管理', icon: 'publish'},
        children: [
          {
            path: 'village',
            name: 'Village',
            redirect: '/jinSwim/releases/village/list',
            component: () => import('@/views/jinSwim/publish/village'),
            meta: {title: '乡村简介', icon: 'village'},
            children: [
              {
                path: 'list',
                name: 'List',
                component: () => import('@/views/jinSwim/publish/village/list'),
                meta: {title: '乡村列表'},
                hidden: true
              },
              {
                path: 'compile',
                name: 'Compile',
                component: () => import('@/views/jinSwim/publish/village/compile'),
                meta: {title: '乡村编辑'},
                hidden: true
              },
              /*{
                path: 'details',
                name: 'Details',
                component: () => import('@/views/jinSwim/publish/village/details'),
                meta: {title: '乡村详情'},
                hidden: true
              },*/
            ]
          },
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
        path: '/jinSwim/apply',
        redirect: '/jinSwim/apply/shop',
        component: Layout,
        name: 'apply',
        meta: {title: '审核管理', icon: 'apply'},
        children: [
          {
            path: 'shop',
            name: 'Shop',
            redirect: '/jinSwim/apply/shop/list',
            component: () => import('@/views/jinSwim/apply/shop'),
            meta: {title: '申请审核', icon: 'shop'},
            children: [
              {
                path: 'list',
                name: 'List',
                component: () => import('@/views/jinSwim/apply/shop/list'),
                meta: {title: '申请列表'},
                hidden: true
              },
              /* {
                path: 'compile',
                name: 'Compile',
                component: () => import('@/views/jinSwim/operation/carriage/compile'),
                meta: {title: '申请审核'},
                hidden: true
              },
              {
                path: 'details',
                name: 'Details',
                component: () => import('@/views/jinSwim/operation/carriage/details'),
                meta: {title: '申请详情'},
                hidden: true
              }, */
            ]
          },
          {
            path: 'release',
            name: 'Release',
            redirect: '/jinSwim/apply/release/list',
            component: () => import('@/views/jinSwim/apply/release'),
            meta: {title: '发布审核', icon: 'release'},
            children: [
              {
                path: 'list',
                name: 'List',
                component: () => import('@/views/jinSwim/apply/release/list'),
                meta: {title: '发布申请列表'},
                hidden: true
              },
              /* {
                path: 'compile',
                name: 'Compile',
                component: () => import('@/views/jinSwim/operation/userNotes/compile'),
                meta: {title: '发布申请审核'},
                hidden: true
              },
              {
                path: 'details',
                name: 'Details',
                component: () => import('@/views/jinSwim/operation/carriage/details'),
                meta: {title: '发布申请详情'},
                hidden: true
              }, */
            ]
          },
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
            path: 'specialty',
            name: 'Specialty',
            redirect: '/jinSwim/operation/specialty/list',
            component: () => import('@/views/jinSwim/operation/specialty'),
            meta: {title: '商品管理', icon: 'carriage'},
            children: [
              {
                path: 'list',
                name: 'List',
                component: () => import('@/views/jinSwim/operation/specialty/list'),
                meta: {title: '商品列表'},
                hidden: true
              }
            ]
          },
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
          },
          {
            path: 'userNotes',
            name: 'UserNotes',
            redirect: '/jinSwim/operation/userNotes/list',
            component: () => import('@/views/jinSwim/operation/userNotes'),
            meta: {title: '用户须知', icon: 'carriage'},
            children: [
              {
                path: 'list',
                name: 'List',
                component: () => import('@/views/jinSwim/operation/userNotes/list'),
                meta: {title: '须知列表'},
                hidden: true
              },
              {
                path: 'compile',
                name: 'Compile',
                component: () => import('@/views/jinSwim/operation/userNotes/compile'),
                meta: {title: '须知编辑'},
                hidden: true
              },
              {
                path: 'details',
                name: 'Details',
                component: () => import('@/views/jinSwim/operation/carriage/details'),
                meta: {title: '须知详情'},
                hidden: true
              },
            ]
          },
          {
            path: 'activity',
            name: 'Activity',
            redirect: '/jinSwim/operation/activity/list',
            component: () => import('@/views/jinSwim/operation/activity'),
            meta: {title: '活动优惠', icon: 'carriage'},
            children: [
              {
                path: 'list',
                name: 'List',
                component: () => import('@/views/jinSwim/operation/activity/list'),
                meta: {title: '优惠列表'},
                hidden: true
              },
              {
                path: 'compile',
                name: 'Compile',
                component: () => import('@/views/jinSwim/operation/activity/compile'),
                meta: {title: '活动编辑'},
                hidden: true
              },
              // {
              //   path: 'details',
              //   name: 'Details',
              //   component: () => import('@/views/jinSwim/operation/carriage/details'),
              //   meta: {title: '须知详情'},
              //   hidden: true
              // },
            ]
          },
          {
            path: 'order',
            name: 'Order',
            redirect: '/jinSwim/operation/order/list',
            component: () => import('@/views/jinSwim/operation/order'),
            meta: {title: '订单管理', icon: 'carriage'},
            children: [
              {
                path: 'list',
                name: 'List',
                component: () => import('@/views/jinSwim/operation/order/list'),
                meta: {title: '订单列表'},
                hidden: true
              },
              {
                path: 'compile',
                name: 'Compile',
                component: () => import('@/views/jinSwim/operation/order/compile'),
                meta: {title: '订单编辑'},
                hidden: true
              },
              {
                path: 'details',
                name: 'Details',
                component: () => import('@/views/jinSwim/operation/carriage/details'),
                meta: {title: '订单详情'},
                hidden: true
              },
            ]
          },
        ]
      }
    ]
  }

export default jinSwimRouter
