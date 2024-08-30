import Layout from "@/layout/index.vue";
import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    component: Layout,
    redirect: { name: "Home" },
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页"
        }
      },
      {
        path: "upload",
        name: "Upload",
        component: () => import("@/views/upload/index.vue"),
        meta: {
          title: "用户上传",
          noCache: true
        }
      },
      {
        path: "aigc",
        name: "AIGC",
        component: () => import("@/views/aigc/index.vue"),
        meta: {
          title: "AIGC"
        }
      },
      {
        path: "music",
        name: "Music",
        component: () => import("@/views/music/index.vue"),
        meta: {
          title: "旋律库"
        }
      },
      {
        path: "play",
        name: "Play",
        component: () => import("@/views/play/index.vue"),
        meta: {
          title: "播放"
        }
      },
      {
        path: "upload",
        name: "Upload",
        component: () => import("@/views/upload/index.vue"),
        meta: {
          title: "用户上传"
        }
      },
    ]
  }
];

export default routes;
