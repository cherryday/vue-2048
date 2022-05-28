<script setup>
import BaseButton from './BaseButton.vue';
</script>

<template>
  <div class="game-over">
    <p class="game-over__title">Game over!</p>
    <BaseButton>Try again</BaseButton>
  </div>
</template>

<style>
.game-over {
  z-index: 8;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(238, 228, 218, 0.73);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.game-over__title {
  font-size: 60px;
  font-weight: bold;
  color: #776e65;
  margin-bottom: 40px;
}
</style>
