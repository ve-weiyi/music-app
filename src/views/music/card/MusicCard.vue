<template>
  <div
    :class="['card', { selected: selected }]"
    :style="{ backgroundColor: randomColor }"
  >
    <div class="image-container">
      <img :src="image" alt="Card Image" />
    </div>
    <h3>{{ title }}</h3>
    <p>{{ listeners }}</p>

    <div class="flex">
      <van-icon name="close" />
      <van-icon name="like-o" />
      <van-icon name="share-o" />
    </div>
    <div></div>
  </div>
</template>

<script>
import { defineComponent, toRefs } from "vue";

export default defineComponent({
  name: "Card",
  props: {
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    listeners: {
      type: String,
      required: false
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { image, title, listeners, selected } = toRefs(props);
    return { image, title, listeners, selected };
  },

  computed: {
    randomColor() {
      const r = Math.floor(Math.random() * 56 + 200); // Values between 200-255
      const g = Math.floor(Math.random() * 56 + 200); // Values between 200-255
      const b = Math.floor(Math.random() * 56 + 200); // Values between 200-255
      return `rgba(${r}, ${g}, ${b},0.6)`;
    }
  }
});
</script>

<style scoped>
.flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.card {
  width: 150px;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  /* box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1); */
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}
.card img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}
.card h3 {
  margin: 10px 0 5px;
  font-size: 14px;
}
.card p {
  margin: 5px;
  font-size: 12px;
  color: gray;
}
.card.selected {
  border: 2px solid blue;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px; /* Adjust the height as needed */
}
</style>
