<template>
  <div class="bg">
    <van-nav-bar
      title="音乐播放"
      left-text="返回"
      left-arrow
      @click-left="onBack"
      class="navbar"
      :border="false"
    >
      <template #right>
        <van-icon name="share" size="24" @click="showToast('提示内容')" />
      </template>
    </van-nav-bar>
    <div class="music-player">
      <!-- Image and Song Info -->
      <div class="song-info">
        <img class="album-art" :src="music.image_url ? music.image_url :'https://imge.kugou.com/stdmusic/240/20210917/20210917190830194456.jpg'" alt="Album Art">
      </div>

      <!-- Song Title and Artist -->
      <div class="song-details">
        <h2>{{ music.file_name }}</h2>
      </div>

      <!-- Music Controls -->
      <div class="music-controls">
        <div class="progress-bar">
          <input
            type="range"
            min="0"
            :max="duration"
            step="0.1"
            v-model="currentTime"
            @input="seek"
          />
        </div>
        <div class="play-controls">
          <van-icon
            :name="isPlaying ? 'pause-circle-o' : 'play-circle-o'"
            size="48"
            @click="togglePlay"
          />
        </div>
      </div>
    </div>
    <audio ref="audio" @timeupdate="updateProgress" @ended="onEnded">
      <source :src="music.download_url" type="audio/mpeg" />
      您的浏览器不支持 audio 元素。
    </audio>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useMusicStore } from "@/store/modules/music";
import { Music } from "@/api/types";

const music = ref<Music>(useMusicStore().music);
if (!music.value.download_url) {
  music.value = {
    "file_name": "鸟鸣",
    "tag": "自然",
    "download_url": "https://edge-aiot-ore-ci.s3.dualstack.us-west-2.amazonaws.com/nebula/edge/warranty_card/2024/08/30/fff03f8701f7847568fde6575a87bb8deb294214/wRTqFQ4dZ96Gc7Ky.%E9%B8%9F%E9%B8%A3.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Credential=AKIA4XHFIO3CQPCOG733%2F20240831%2Fus-west-2%2Fs3%2Faws4_request\u0026X-Amz-Date=20240831T085608Z\u0026X-Amz-Expires=3600\u0026X-Amz-SignedHeaders=host\u0026X-Amz-Signature=e1b68aea97d85f312d8ca887107423662730a3430fefb257e0972eeebc57b340"
  };
}
console.log("music", music.value);

import { showToast } from "vant";

const onBack = () => history.back();

const audio = ref(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);

onMounted(() => {
  console.log(audio.value);
  duration.value = audio.value.duration;
});

const togglePlay = () => {
  if (isPlaying.value) {
    audio.value.pause();
  } else {
    audio.value.play();
  }
  isPlaying.value = !isPlaying.value;
};

const updateProgress = () => {
  currentTime.value = audio.value.currentTime;
  duration.value = audio.value.duration;
};

const seek = () => {
  audio.value.currentTime = currentTime.value;
};

const onEnded = () => {
  isPlaying.value = false;
};
</script>

<style scoped>
.bg {
  background: linear-gradient(to bottom, #c9d6ff, #e2e2e2);
}

.navbar {
  height: 6vh;
  background: transparent;
}

.main-content {
  background: linear-gradient(to bottom, #c9d6ff, #e2e2e2);
  height: 94vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  text-align: center;
  padding: 20px;
}

.music-player {
  background: linear-gradient(to bottom, #c9d6ff, #e2e2e2);
  padding: 20px;
  border-radius: 20px;
  color: white;
  margin: 0 auto;
  height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.song-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.album-art {
  width: 100%;
  border-radius: 15px;
}

.tags {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 10px;
}

.tag {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 10px;
}

.song-details {
  margin-top: 20px;
  text-align: center;
}

.song-details h2 {
  font-size: 20px;
  margin-bottom: 5px;
}

.song-details p {
  margin: 5px 0;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
  margin-top: 10px;
}

.btn {
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  padding: 5px 10px;
  border-radius: 10px;
  color: white;
}

.lyrics {
  margin-top: 10px;
  color: gray;
}

.music-controls {
  margin-top: 40px;
}

.icons {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.progress-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

input[type="range"] {
  width: 100%;
  margin: 0 20px;
}

.play-controls {
  display: flex;
  justify-content: space-around;
}

.icon-play {
}
</style>
