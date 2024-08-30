<template>
  <div class="bg">
    <van-nav-bar
      title="旋律上传"
      left-text="返回"
      left-arrow
      @click-left="onBack"
      class="navbar"
      :border="false"
    >
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>

    <div class="greeting-page" v-loading="loading">
      <!-- Header -->
      <!-- <div class="header">
        <h3 class="greeting-title">旋律上传</h3>
      </div> -->

      <!-- 背景图和播放按钮 -->
      <!-- action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" -->

      <div class="background">
        <el-upload
          class="avatar-uploader"
          method="put"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
        <!-- <van-uploader accept="radio/*" :after-read="afterRead">
          <van-button icon="plus" type="primary" @click="upload"
            >上传文件</van-button
          >
        </van-uploader> -->
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
import { uploadMusicApi } from "@/api/music";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps } from "element-plus";

const router = useRouter();
const uploadUrl = ref("");
const loading = ref(false);
const onBack = () => history.back();
const afterRead = file => {
  // 此时可以自行将文件上传至服务器
  console.log(file);
};
const imageUrl = ref("");

const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  loading.value = false;
  ElMessage({
    message: "旋律上传成功，请到旋律库中聆听",
    type: "success"
  });
  // imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = async rawFile => {
  loading.value = true;
  await uploadMusicApi({
    file_name: rawFile.name,
    music_type: 2,
    file_type: 102,
    ai_music_url: "",
    tag: "",
    account: "36de8e994640236e0b6f7e74000ac7bcb7ff5c84"
  }).then((res: any) => {
    if (res.code === 0) {
      uploadUrl.value = res.data.uptoken;
      return true;
    } else {
      ElMessage.error(res.msg);
      loading.value = false;
      return false;
    }
  });
};
</script>
<style>
.avatar-uploader .el-upload {
  /* border: 1px dashed var(--el-border-color); */
  border: 5px dashed #65687029;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

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
