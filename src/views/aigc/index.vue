<template>
  <van-nav-bar
      title="旋律库"
      left-text="返回"
      left-arrow
      @click-left="onBack"
  >
    <template #right>
      <van-icon name="search" size="18"/>
      <van-icon name="contact-o" size="18" style="margin-left: 10px"/>
    </template>
  </van-nav-bar>
  <div class="form-container">
    <van-form @submit="onSubmit">
      <!-- Title Input -->
      <van-field
          v-model="form.title"
          label="Title"
          placeholder="请输入标题"
          required
      />

      <!-- Tags Input -->
      <div class="tags-container">
        <span>Tags:  </span>
        <van-tag
            v-for="tag in tags"
            :key="tag"
            :type="isSelected(tag) ? 'primary' : 'default'"
            @click="toggleTag(tag)"
            style="margin-right: 8px;"
        >
          {{ tag }}
        </van-tag>
      </div>

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
import { ref } from 'vue';
import {createMusicApi} from "@/api/music";
const form = ref({
  title: '',
  tags: [],
  prompt: ''
});

const onBack = () => history.back();
// 预定义的标签列表
const tags = ref(['自然', '白噪音', '轻音乐', '纯音乐']);

// 检查标签是否被选中
const isSelected = (tag) => form.value.tags.includes(tag);

// 切换标签选中状态
const toggleTag = (tag) => {
  if (isSelected(tag)) {
    form.value.tags = form.value.tags.filter(t => t !== tag);
  } else {
    form.value.tags.push(tag);
  }
};

const onSubmit = () => {
  // 提交表单时执行的逻辑
  console.log('表单提交:', form.value);
  // 在这里可以处理表单数据，例如发送到服务器

  let data={
    title: form.value.title,
    tags: form.value.tags.toString(),
    prompt: form.value.prompt
  }

  createMusicApi(data).then(res => {
    console.log('提交成功:', res);
  });

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
