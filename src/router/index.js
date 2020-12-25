import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/test',
    component: () => import('@/views/test'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/jinSwim/home',
    children: [{
      path: '/jinSwim/home',
      name: 'Home',
      component: () => import('@/views/jinSwim/Home/index'),
      meta: {title: 'Home', icon: 'dashboard'}
    }]
  },
  {
    path: '/jinSwim/releases',
    component: Layout,
    redirect: '/jinSwim/releases/scenery',
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
            name: 'Compile',
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
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: {title: 'Tree', icon: 'tree'}
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: {title: 'Form', icon: 'form'}
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: {title: 'Menu1'},
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: {title: 'Menu1-1'}
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: {title: 'Menu1-2'},
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: {title: 'Menu1-2-1'}
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: {title: 'Menu1-2-2'}
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: {title: 'Menu1-3'}
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: {title: 'menu2'}
      }
    ]
  },

  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
