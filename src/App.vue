<script setup>
import GameBoard from './components/GameBoard.vue';
import { useGame } from './composables/useGame';

const { tiles, restart, mergeTiles } = useGame();
</script>

<template>
  <main class="main">
    <div class="container">
      <button class="button" @click="restart">New Game</button>

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

.button {
  background: #8f7a66;
  color: #f9f6f2;
  cursor: pointer;
  height: 40px;
  padding: 0 20px;
  border: none;
  border-radius: 3px;
  margin-bottom: 40px;
  font-weight: bold;
  font-size: 18px;
}
</style>
