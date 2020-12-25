import Layout from "@/layout/index";

const jinSwimRouter = {
  path: '/jinSwim',
  component: Layout,
  redirect: '/jinSwim/home',
  children: [
    {
      path: 'home',
      name: 'Home',
      component: () => import('@/views/jinSwim/Home/index'),
      meta: {title: 'Home', icon: 'dashboard'}
    },
    {
      path: '/jinSwim/releases',
      redirect: '/jinSwim/releases/scenery',
      name: 'Releases',
      meta: {title: '发布管理', icon: 'el-icon-s-help'},
      children: [
        {
          path: 'scenery',
          name: 'Scenery',
          redirect: '/jinSwim/releases/scenery/list',
          component: () => import('@/views/jinSwim/publish/scenery'),
          meta: {title: '风景发布', icon: 'table'},
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
          path: 'tree',
          name: 'Tree',
          component: () => import('@/views/tree/index'),
          meta: {title: 'Tree', icon: 'tree'}
        }
      ]
    },

    {
      path: '/jinSwim/form',
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
      path: '/jinSwim/nested',
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
    }
  ]
}

export default jinSwimRouter
