import { defineStore } from "pinia";
import { store } from "@/store";
import type { toRouteType } from "@/router";
import { Music } from "@/api/types";
export const useMusicStore = defineStore({
  id: "music",
  state: () => ({
    // 缓存页面 keepAlive
    music: {} as Music,
  }),
  actions: {
    setMusic(music: Music) {
      this.music = music;
    },
  }
});

export function useMusicStoreHook() {
  return useMusicStore(store);
}
