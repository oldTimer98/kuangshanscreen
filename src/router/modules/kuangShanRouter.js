import Layout from '@/layout'
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: '首页',
        component: () => import('@/views/modules/Screen/index'),
        meta: {
          title: '大屏',
          breadcrumb: false,
          icon: 'dashboard',
          affix: true
        }
      },
      // {
      //   path: '/threeD',
      //   name: '3D展示',
      //   component: () => import('@/views/modules/gis/index'),
      //   hidden: true
      // }
    ]
  },
  {
    path: '/mineral',
    component: Layout,
    redirect: '/mineral',
    meta: {
      icon: 'example'
    },
    children: [
      {
        path: '/mineral',
        name: '矿山管理',
        component: () => import('@/views/modules/Mineral/index'),
        meta: {
          title: '矿山管理',
          icon: 'example',
          noKeepAlive: true
        }
      }
    ]
  },
  {
    path: '/mineraldetails',
    component: Layout,
    redirect: '/mineraldetails',
    children: [{
      path: '/mineraldetails',
      name: '矿山详情',
      component: () => import('@/views/modules/MineralDetails')

    }]
  },
  {
    path: '/announcements',
    component: Layout,
    redirect: '/announcements',
    children: [
      {
        path: 'announcements',
        name: '通知公告',
        component: () => import('@/views/modules/Announcements/index'),
        meta: {
          title: '通知公告',
          icon: 'documentation'
        }
      }
    ]
  },
  {
    path: '/feature',
    component: Layout,
    redirect: '/feature',
    children: [
      {
        path: 'feature',
        name: '企业储量',
        component: () => import('@/views/modules/FeatureList/indexmgr'),
        meta: {
          title: '月度数据',
          icon: 'documentation'
        }
      }]
  },
  /* {
    path: '/environmentMonitor',
    component: Layout,
    redirect: '/environmentMonitor',
    children: [
      {
        path: '/environmentMonitor',
        name: '环境监测',
        component: () => import('@/views/modules/HuanJingJianCe/index'),
        meta: {
          title: '环境监测',
          icon: 'documentation',
          noKeepAlive: true
        }
      }
    ]
  }, */
  {
    path: '/user',
    component: Layout,
    redirect: 'screen',
    alwaysShow: true,
    meta: {
      title: '系统管理',
      icon: 'documentation'
    },
    children: [
      {
        path: 'user',
        name: '用户管理',
        component: () => import('@/views/modules/XTManage/UserManage/index'),
        meta: {
          title: '用户管理',
          icon: 'documentation'
        }
      },
      {
        path: 'role',
        name: '权限管理',
        component: () => import('@/views/modules/XTManage/PremiManage/index'),
        meta: {
          title: '权限管理',
          icon: 'documentation'
        }
      },
      {
        path: 'data',
        name: '数据管理',
        component: () => import('@/views/modules/XTManage/ShuJuManage/index'),
        meta: {
          title: '数据管理',
          icon: 'documentation'
        },
        children: [
          {
            path: 'service',
            name: '数据服务管理',
            component: () =>
              import('@/views/modules/XTManage/ShuJuManage/ShuJuFuWu/index'),
            meta: {
              title: '数据服务管理',
              icon: 'documentation'
            }
          },
          {
            path: 'spermession',
            name: '数据权限管理',
            component: () =>
              import(
                '@/views/modules/XTManage/ShuJuManage/ShuJuQuanXian/index'
              ),
            meta: {
              title: '数据权限管理',
              icon: 'documentation'
            }
          }]
      },
      {
        path: 'equipment',
        name: '设备列表',
        component: () => import('@/views/modules/Equipment/index'),
        meta: {
          title: '设备列表',
          icon: 'documentation'
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
