<script setup lang="ts">

import {getMusicListApi} from "@/api/music";

const active = ref(0);
const titleActive = ref(0);

const list = ref([]);
const loading = ref(false);
const finished = ref(false);

const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1);
    }

    // 加载状态结束
    loading.value = false;

    // 数据全部加载完成
    if (list.value.length >= 40) {
      finished.value = true;
    }
  }, 1000);
};

import MusicCard from './card/MusicCard.vue';

import {showToast} from 'vant';

const router = useRouter();

const onClickLeft = () => history.back();
const onClickRight = () => showToast('按钮');
const onPlayMusic = (id: number) => router.push(`/play/${id}`);

const categorys = [
  {
    text: '旋律库',
    value: 1,
  },
  {
    text: '自定义上传',
    value: 2,
  },
  {
    text: 'AIGC',
    value: 3,
  },
]

const tags = [
  {
    text: '自然',
    value: 1,
  },
  {
    text: '白噪音',
    value: 2,
  },
  {
    text: '轻音乐',
    value: 3,
  },
  {
    text: '纯音乐',
    value: 4,
  },
]

const category = ref(3);
const tag = ref("");

const onClickCategory = (item: any) => {
  console.log("111", item);
  category.value = item.name;
  getMusics()
}

const onClickTag = (item: any) => {
  console.log("111", item);
  tag.value = item.title;
  getMusics()
}

const musics = ref([]);
const cards = ref([
  {
    id: 1,
    image: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    title: '轴韵',
    listeners: 639,
    selected: false
  },
  {
    id: 2,
    image: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    title: '七弦',
    listeners: 668,
    selected: false
  },
  {
    id: 3,
    image: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    title: '手谈',
    listeners: 468,
    selected: false
  },
  {
    id: 4,
    image: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    title: '磨砺',
    listeners: 309,
    selected: false
  },
  {
    id: 5,
    image: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    title: '手谈',
    listeners: 468,
    selected: false
  },
  {
    id: 6,
    image: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    title: '磨砺',
    listeners: 309,
    selected: false
  },
  {
    id: 7,
    image: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    title: '手谈',
    listeners: 468,
    selected: false
  },
  {
    id: 8,
    image: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    title: '磨砺',
    listeners: 309,
    selected: false
  },
]);
const getMusics = () => {
  console.log("getMusics", category.value, tag.value);
  getMusicListApi({
    file_name: "",
    account: "fff03f8701f7847568fde6575a87bb8deb294214",
    music_type: category.value,
    tag: tag.value,
  }).then(res => {
    let list = []
    list.push(res.data.ai_music_list)
    list.push(res.data.custom_music_list)
    list.push(res.data.global_music_list)
    musics.value = list;
    console.log("musics.value", musics.value);
  });
}

onMounted(() => {
  getMusics()
});

</script>

<template>
  <van-nav-bar
      title="旋律库"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  >
    <template #right>

    </template>
  </van-nav-bar>

  <van-tabs v-model:active="titleActive" :ellipsis="true" @click-tab="onClickCategory">
    <van-tab v-for="item in categorys" :key="item.value" :title="item.text"></van-tab>
  </van-tabs>

  <van-tabs v-model:active="active" :ellipsis="true" @click-tab="onClickTag">
    <van-tab v-for="item in tags" :key="item.value" :title="item.text"></van-tab>
  </van-tabs>

  <div style="padding: 16px">
    <!--    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">-->
    <!--      <van-swipe-item>1</van-swipe-item>-->
    <!--      <van-swipe-item>2</van-swipe-item>-->
    <!--      <van-swipe-item>3</van-swipe-item>-->
    <!--      <van-swipe-item>4</van-swipe-item>-->
    <!--    </van-swipe>-->


    <van-grid :column-num="2">
      <van-grid-item v-for="card in cards" :key="card.id" icon="photo-o" text="文字" @click="onPlayMusic(card.id)">
        <MusicCard
            :key="card.id"
            :image="card.image"
            :title="card.title"
            :listeners="card.listeners"
            :selected="card.selected"
        />
      </van-grid-item>
    </van-grid>

  </div>

</template>

<style>
.my-swipe .van-swipe-item {
  padding: 4px;
  color: #fff;
  font-size: 20px;
  line-height: 100px;
  text-align: center;
  background-color: #39a9ed;
}

.music-preview {
  width: 100%;
  height: 100%;
  background-color: #41b883;
}

.vertical-center {
  display: flex; /* 启用 flexbox 布局 */
  flex-direction: column; /* 设置为垂直排列 */
  align-items: center; /* 水平居中对齐 */
  height: 100vh; /* 让容器充满整个视窗高度 */
  justify-content: center; /* 垂直居中对齐 */
}

</style>
