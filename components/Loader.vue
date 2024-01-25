<script setup lang="ts">
const { size = 50, color = "red" } = defineProps<{
  size?: number;
  color?: string;
}>();

const classes = {
  width: `${size}px`,
  height: `${size}px`,
  backgroundColor: `${color}`,
};
</script>

<template>
  <div class="spinner" :class="classes"></div>
</template>

<style scoped>
.spinner {
  width: 44px;
  height: 44px;
  margin: 100px auto;
  background-color: none;
  border: 3px solid #fff;

  border-radius: 100%;
  -webkit-animation: scaleout 1.8s infinite ease-in-out;
  animation: scaleout 1.8s infinite ease-in-out;
}

@-webkit-keyframes scaleout {
  0% {
    -webkit-transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1);
    opacity: 0;
  }
}

@keyframes scaleout {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
