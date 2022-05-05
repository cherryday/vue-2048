<script setup>
import { onMounted, onUnmounted, onUpdated, ref } from 'vue';
import GameTile from './components/GameTile.vue';
import { useGame } from './composables/useGame';

const { tiles, onMergeTiles } = useGame();
</script>

<template>
  <main class="main">
    <div class="board">
      <div v-for="index in 16" :key="index" class="cell"></div>

      <GameTile
        v-for="tile in tiles"
        :key="tile.id"
        :tile="tile"
        @merge="onMergeTiles(tile)"
      />
    </div>
  </main>
</template>

<style>
.main {
  display: flex;
  align-items: center;
  justify-content: center;
}

.board {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 106px);
  grid-template-rows: repeat(4, 106px);
  gap: 15px;
  background-color: #bbac9f;
  border-radius: 4px;
  padding: 15px;
}

.cell {
  background-color: #ccc0b3;
  border-radius: 4px;
}
</style>
