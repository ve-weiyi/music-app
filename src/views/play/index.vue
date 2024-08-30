<template>

  <div class="bg">
    <van-nav-bar
        title="标题"
        left-text="返回"
        left-arrow
        @click-left="onBack"
        class="navbar"
        :border="false"
    >
      <template #right>
        <van-icon name="share"  size="24"/>
      </template>
    </van-nav-bar>
    <div class="music-player">

      <!-- Image and Song Info -->
      <div class="song-info">
        <img class="album-art" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" alt="Album Art">
      </div>

      <!-- Song Title and Artist -->
      <div class="song-details">
        <h2>七里香</h2>
      </div>

      <!-- Music Controls -->
      <div class="music-controls">

        <div class="progress-bar">
          <span>04:16</span>
          <input type="range" min="0" :max="duration" step="0.1" v-model="currentTime" @input="seek" />
          <span>04:59</span>
        </div>
        <div class="play-controls">
          <van-icon name="arrow-left"  size="48"/>
          <van-icon :name="isPlaying ? 'pause-circle-o' : 'play-circle-o' " size="48" @click="togglePlay"/>
          <van-icon name="arrow" size="48"/>
        </div>
      </div>
    </div>
    <audio ref="audio" @timeupdate="updateProgress" @ended="onEnded">
      <source src="@/assets/test.mp3" type="audio/mpeg" />
      您的浏览器不支持 audio 元素。
    </audio>
  </div>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";

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

input[type='range'] {
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
