<template>
  <div :class="['card', { selected: selected }]" :style="{ backgroundColor: randomColor }">
    <div class="image-container">
      <img :src="image" alt="Card Image">
    </div>
    <h3>{{ title }}</h3>
    <p>{{ listeners }}</p>
  </div>
</template>

<script>
import { defineComponent, toRefs } from 'vue';

export default defineComponent({
  name: 'Card',
  props: {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    listeners: {
      type: String,
      required: false,
    },
    selected: {
      type: Boolean,
      default: false,
    },
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
      return `rgb(${r}, ${g}, ${b})`;
    },
  },
});
</script>

<style scoped>
.card {
  width: 150px;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}
.card:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}
.card img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}
.card h3 {
  margin: 10px 0 5px;
  font-size: 16px;
}
.card p {
  margin: 0;
  font-size: 14px;
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
