import Layout from "@/layout";
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default [
  {
    path: "/",
    component: Layout,
    redirect: "/threeD",
    children: [
      // {
      //   path: "/threeD",
      //   name: "矿山全貌",
      //   alwaysShow: true,
      //   component: () => import("@/views/modules/gis/index"),
      //   meta: {
      //     title: "矿山全貌",
      //     icon: "dashboard",
      //     noKeepAlive: true,
      //   },
      // },
    ],
  },
  {
    path: "/mineralEdit",
    component: Layout,
    redirect: "/mineralEdit",
    children: [
      {
        path: "/mineralEdit",
        name: "基本信息",
        component: () => import("@/views/modules/KuangwuEdit/index"),
        meta: {
          title: "基本信息",
          icon: "documentation",
          noKeepAlive: true,
        },
      },
    ],
  },
  {
    path: "/person",
    component: Layout,
    redirect: "/person",
    children: [
      {
        path: "/person",
        name: "人员管理",
        component: () =>
          import("@/views/modules/XTManage/ShuJuManage/RenYuanManage/index"),
        meta: {
          title: "人员管理",
          icon: "nested",
          noKeepAlive: true,
        },
      },
    ],
  },
  {
    path: "/car",
    component: Layout,
    redirect: "/car",
    children: [
      {
        path: "/car",
        name: "车辆管理",
        component: () =>
          import("@/views/modules/XTManage/ShuJuManage/CheLiangManage/index"),
        meta: {
          title: "车辆管理",
          icon: "documentation",
          noKeepAlive: true,
        },
      },
    ],
  },
  {
    path: "/announcements",
    component: Layout,
    redirect: "/announcements",
    children: [
      {
        path: "announcements",
        name: "上级通知",
        component: () => import("@/views/modules/Announcements/noticeIndex"),
        meta: {
          title: "上级通知",
          icon: "documentation",
        },
      },
      {
        path: "notice",
        name: "内容",
        component: () =>
          import("@/views/modules/Announcements/components/tableView"),
        hidden: true,
      },
    ],
  },
  {
    path: "/reserves",
    name: "储量管理",
    component: Layout,
    redirect: "/reserves",
    children: [
      {
        path: "info",
        name: "储量管理",
        component: () =>
          import("@/views/modules/XTManage/CuLiang/JiBenXiXing/index"),
        meta: {
          title: "储量管理",
          icon: "documentation",
          noKeepAlive: true,
        },
      },
    ],
  },
  {
    path: "/equipment",
    component: Layout,
    redirect: "/equipment",
    children: [
      {
        path: "equipment",
        name: "设备列表",
        component: () => import("@/views/modules/Equipment/index"),
        meta: {
          title: "设备列表",
          icon: "icon",
          noKeepAlive: true,
        },
      },
    ],
  },
  {
    path: "/feature",
    component: Layout,
    redirect: "/feature",
    children: [
      {
        path: "feature",
        name: "月度数据",
        component: () => import("@/views/modules/FeatureList/index"),
        meta: {
          title: "月度数据",
          icon: "documentation",
        },
      },
    ],
  },
  {
    path: "/thres",
    component: Layout,
    alwaysShow: true,
    name: "参数设置",
    meta: {
      title: "参数设置",
      icon: "guide",
      noKeepAlive: true,
    },
    children: [
      {
        path: "/threshold",
        name: "阈值管理",
        component: () =>
          import("@/views/modules/XTManage/KuangShan/FaZhi/index"),
        meta: {
          title: "阈值管理",
          icon: "documentation",
          noKeepAlive: true,
        },
      },
      {
        path: "draw",
        name: "样式管理",
        component: () =>
          import("@/views/modules/XTManage/KuangShan/YangSiManage/index"),
        meta: {
          title: "样式管理",
          icon: "documentation",
          noKeepAlive: true,
        },
      },
    ],
  },
  { path: "*", redirect: "/404", hidden: true },
];
