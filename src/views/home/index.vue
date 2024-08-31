<template>
  <div class="bg">
    <div class="greeting-page">
      <!-- 顶部信息 -->
      <div class="header">
        <p class="greeting-message">Good night</p>
        <h1 class="greeting-title">Sleep A20</h1>
      </div>

      <!-- 背景图和播放按钮 -->
      <div class="background">
        <button class="play-button">
          <van-icon name="play" size="56" @click="onPlayMusic()" />
        </button>
      </div>

      <!-- 底部菜单 -->
      <div class="bottom-menu">
        <div class="menu-item">
          <van-icon name="play-circle-o" size="36" @click="onClickMenu(1)" />
          <p>旋律库</p>
        </div>
        <div class="menu-item">
          <van-icon name="add-o" size="36" @click="onClickMenu(2)" />
          <p>添加音乐</p>
        </div>
        <div class="menu-item">
          <van-icon name="guide-o" size="36" @click="onClickMenu(3)" />
          <p>AIGC音乐</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

function onClickMenu(type: number) {
  console.log("点击了菜单");
  switch (type) {
    case 1:
      router.push("/music");
      console.log("旋律库");
      break;
    case 2:
      router.push("/upload");
      console.log("添加音乐");
      break;
    case 3:
      router.push("/aigc");
      console.log("AIGC音乐");
      break;
  }
}

const onPlayMusic = () => router.push(`/play`);
</script>

<style scoped>
.van-icon {
  color: #ffffff52;
}
.bg {
  background: linear-gradient(to bottom, #c9d6ff, #e2e2e2);
}

.greeting-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  text-align: center;
  padding: 20px;
}

.header {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  position: relative;
}

.greeting-message {
  /* font-style: italic; */
  font-size: 18px;
  color: #f6f5f5bf;
}

.greeting-title {
  font-size: 28px;
  /* margin: 10px 0; */
}

.header-icons {
  position: absolute;
  top: 10px;
  right: 20px;
  display: flex;
  gap: 10px;
}

.icon-share,
.icon-add {
  font-size: 20px;
}

.background {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  /* //background-image: url(''); */
  background-size: cover;
  background-position: center;
  position: relative;
  width: 100%;
}

.play-button {
  background: rgb(255 255 255 / 0%);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.play-button .icon-play {
  font-size: 24px;
  color: white;
}

.bottom-menu {
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 20px 0;
  margin-bottom: 14px;
  /* background: rgba(255, 255, 255, 0.2); */
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu-item i {
  font-size: 24px;
  margin-bottom: 7px;
  background: rgba(255, 255, 255, 0.2);
  padding: 12px;
  border-radius: 50%;
}

.menu-item p {
  font-size: 14px;
}
</style>
