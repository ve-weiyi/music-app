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
        <van-icon name="search" size="18"/>
      </template>
    </van-nav-bar>

    <div class="greeting-page">

      <!-- Header -->
      <div class="header">

        <h3 class="greeting-title">旋律上传</h3>
      </div>

      <!-- 背景图和播放按钮 -->
      <div class="background">
        <van-uploader accept="radio/*" :after-read="afterRead" >
          <van-button icon="plus" type="primary">上传文件</van-button>
        </van-uploader>

      </div>

      <!-- 顶部信息 -->
      <div class="header">
        <p class="greeting-message">您可选择美妙的音乐或旋律</p>
        <p class="greeting-message">您的喜欢伴您入眠</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const router = useRouter();

const onBack = () => history.back();

const afterRead = (file) => {
  // 此时可以自行将文件上传至服务器
  console.log(file);
};

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

.greeting-page {
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
