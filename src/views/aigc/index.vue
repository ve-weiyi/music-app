<template>
  <van-nav-bar
      title="旋律库"
      left-text="返回"
      left-arrow
      @click-left="onBack"
  >
    <template #right>
    </template>
  </van-nav-bar>
  <div class="form-container" v-loading="loading">
    <van-form @submit="onSubmit">
      <!-- Title Input -->
      <van-field
          v-model="form.title"
          label="音乐名称"
          placeholder="请输入标题"
          required
      />

      <!-- Tags Input -->
      <van-field name="checkboxGroup" label="音乐标签"  required>
        <template #input>
          <van-checkbox-group v-model="form.tags" direction="horizontal">
            <van-checkbox v-for="tag in tags" :key="tag" :name="tag" :label="tag">
              {{ tag }}
            </van-checkbox>
          </van-checkbox-group>
        </template>
      </van-field>

      <!-- Prompt Input -->
      <van-field
          v-model="form.prompt"
          label="Prompt"
          type="textarea"
          placeholder="请输入提示信息"
          rows="5"
          required
      />

      <!-- Submit Button -->
      <div class="submit-button">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {createMusicApi, getMusicApi, uploadMusicApi} from "@/api/music";
import {useMusicStore} from "@/store/modules/music";
import {ElMessage} from "element-plus";
import {Music, UploadMusicReq} from "@/api/types";

const form = ref({
  title: '',
  tags: [],
  prompt: ''
});

const onBack = () => history.back();
// 预定义的标签列表
const tags = ref(['自然', '白噪音', '轻音乐', '古典']);

const loading = ref(false)

let testres = [
  {
    "id": "5c27742f-796c-43db-b840-1d3958ad7533",
    "title": "",
    "image_url": null,
    "lyric": "",
    "audio_url": "",
    "video_url": "",
    "created_at": "2024-08-30T15:36:57.373Z",
    "model_name": "chirp-v3",
    "status": "submitted",
    "gpt_description_prompt": null,
    "prompt": "",
    "type": "gen",
    "tags": "",
    "duration": null
  },
  {
    "id": "cf7d25b5-e515-4305-9085-46ffea4ba6e5",
    "title": "",
    "image_url": null,
    "lyric": "",
    "audio_url": "",
    "video_url": "",
    "created_at": "2024-08-30T15:36:57.373Z",
    "model_name": "chirp-v3",
    "status": "submitted",
    "gpt_description_prompt": null,
    "prompt": "",
    "type": "gen",
    "tags": "",
    "duration": null
  }
]
const router = useRouter();
const onPlayMusic = (music) => {
  useMusicStore().setMusic(music);
  router.push(`/play`);
}

const count = ref(0);
let intervalId: number | null = null;

const startTimer = () => {
  if (intervalId === null) {
    intervalId = window.setInterval(() => {
      count.value++;
      console.log('每3秒执行一次');

      getMusicApi({ids: mid.value}).then(res => {
        console.log('获取音乐:', res);

        let music :Music= {
          "file_name": res[0].title,
          "tag": res[0].tags,
          "download_url": res[0].audio_url
        }

        if (music.download_url != "") {
          stopTimer()
          uploadMusicApi({
            file_name: music.file_name,
            music_type: 1,
            file_type: 102,
            ai_music_url: music.download_url,
            tag: music.tag,
            account: "36de8e994640236e0b6f7e74000ac7bcb7ff5c84"
          }).then((res: any) => {
            console.log('上传音乐:', res);
            loading.value = false;
            ElMessage({
              message: "旋律上传成功，请到旋律库中聆听",
              type: "success"
            });
            onPlayMusic(music)
          });
        }
      });
    }, 3000);
  }
};

const stopTimer = () => {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

const mid = ref("")

const onSubmit = () => {
  // 提交表单时执行的逻辑
  console.log('表单提交:', form.value);
  // 在这里可以处理表单数据，例如发送到服务器

  let data = {
    title: form.value.title,
    tags: form.value.tags.toString(),
    prompt: form.value.prompt
  }

  createMusicApi(data).then(res => {
    console.log('提交成功:', res);


    let item = res[0]
    mid.value = item.id

    loading.value = true;
    startTimer()
  });

  // loading.value = true;
  // startTimer()

};
</script>

<style>
.form-container {
  padding: 16px;
}

.tags-container {
  margin: 16px 0;
}

.submit-button {
  margin-top: 16px;
}
</style>
