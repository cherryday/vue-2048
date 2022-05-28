<script setup>
import BaseButton from './components/BaseButton.vue';
import GameBoard from './components/GameBoard.vue';
import { useGame } from './composables/useGame';

const { tiles, restart, mergeTiles } = useGame();
</script>

<template>
  <main class="main">
    <div class="container">
      <BaseButton @click="restart">New Game</BaseButton>

      <GameBoard :tiles="tiles" @merge="mergeTiles" />
    </div>
  </main>
</template>

<style>
@import './assets/base.css';

.main {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
