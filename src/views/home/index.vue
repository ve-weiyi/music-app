<template>
  <div class="bg">
    <div class="greeting-page">
      <!-- 顶部信息 -->
      <div class="header">
        <p class="greeting-message">hi, 是靖不是静</p>
        <h1 class="greeting-title">晚上好</h1>
      </div>

      <!-- 背景图和播放按钮 -->
      <div class="background">
        <button class="play-button">
          <van-icon name="play-circle" size="56" @click="onPlayMusic(0)"/>
        </button>
      </div>

      <!-- 底部菜单 -->
      <div class="bottom-menu">
        <div class="menu-item">
          <van-icon name="play-circle-o" size="56" @click="onClickMenu(1)"/>
          <p>旋律库</p>
        </div>
        <div class="menu-item">
          <van-icon name="add-o" size="56" @click="onClickMenu(2)"/>
          <p>添加音乐</p>
        </div>
        <div class="menu-item">
          <van-icon name="guide-o" size="56" @click="onClickMenu(3)"/>
          <p>AIGC音乐</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const router = useRouter();

function onClickMenu(type: number) {
  console.log('点击了菜单');
  switch (type) {
    case 1:
      router.push('/music');
      console.log('旋律库');
      break;
    case 2:
      router.push('/upload');
      console.log('添加音乐');
      break;
    case 3:
      router.push('/aigc');
      console.log('AIGC音乐');
      break;
  }
}

const onPlayMusic = (id: number) => router.push(`/play/${id}`);

</script>

<style scoped>
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
  align-items: center;
  position: relative;
}

.greeting-message {
  font-style: italic;
  font-size: 16px;
}

.greeting-title {
  font-size: 36px;
  margin: 10px 0;
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
  //background-image: url('');
  background-size: cover;
  background-position: center;
  position: relative;
  width: 100%;
}

.play-button {
  background: rgba(255, 255, 255, 0.6);
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
  background: rgba(255, 255, 255, 0.2);
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu-item i {
  font-size: 24px;
  margin-bottom: 5px;
}

.menu-item p {
  font-size: 14px;
}
</style>
