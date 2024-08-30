<template>
  <Swiper slides-per-group-auto slides-per-view="auto" :navigation="true" :grab-cursor="true">
    <SwiperSlide v-for="item in banners" :key="item.bannerId">
      <img :src="item.pic" class="banner-image" @click="onClick(item)"/>
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css';
import {onMounted, ref} from "vue";

const banners = ref<any[]>([])
onMounted(async () => {
  // await getBanners()

  let bs = [{
    bannerId: 1,
    pic: "https://veport.oss-cn-beijing.aliyuncs.com/background/zhuqu.jpg",
    targetType: 1,
    targetId: 1,
    typeTitle: "test"
  },
    {
      bannerId: 2,
      pic: "https://veport.oss-cn-beijing.aliyuncs.com/background/qinglong.jpg",
      targetType: 2,
      targetId: 2,
      typeTitle: "test"
    },
    {
      bannerId: 3,
      pic: "https://veport.oss-cn-beijing.aliyuncs.com/background/xuanwu.jpg",
      targetType: 3,
      targetId: 3,
      typeTitle: "test"
    },
  ]
  banners.value.push(...bs)
})


const onClick = (banner: any) => {

}
</script>

<style lang="scss" scoped>
.swiper {
  @apply -mx-2.5;
  .swiper-slide {
    @apply w-full lg:w-1/2 xl:w-1/3 2xl:w-1/4 px-2.5;
  }
}

.banner-image {
  @apply rounded-lg cursor-pointer transition-all object-cover;
  @apply hover:shadow hover:opacity-80;
}
</style>
