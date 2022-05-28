<script setup>
import BaseButton from './BaseButton.vue';
</script>

<template>
  <div class="game-win">
    <p class="game-win__title">You win!</p>
    <div class="game-win__actions">
      <BaseButton>Keep going</BaseButton>

      <BaseButton>Try again</BaseButton>
    </div>
  </div>
</template>

<style>
.game-win {
  z-index: 8;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(237, 194, 46, 0.5);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.game-win__title {
  font-size: 60px;
  font-weight: bold;
  color: #f9f6f2;
  margin-bottom: 40px;
}

.game-win__actions {
  display: flex;
  gap: 10px;
}
</style>
