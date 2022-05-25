<script setup>
import GameTile from './GameTile.vue';
import { TILE_SIZE, TILE_PADDING, BOARD_SIZE } from '../constants';

const emit = defineEmits(['merge']);

const props = defineProps({
  tiles: {
    type: Array,
    required: true,
  },
});

const styleVars = {
  '--tileSize': `${TILE_SIZE}px`,
  '--tilePadding': `${TILE_PADDING}px`,
  '--boardSize': BOARD_SIZE,
};
</script>

<template>
  <div class="game-board" :style="styleVars">
    <div
      v-for="index in BOARD_SIZE * BOARD_SIZE"
      :key="index"
      class="game-board__tile"
    ></div>

    <GameTile
      v-for="tile in props.tiles"
      :key="tile.id"
      :tile="tile"
      @merge="emit('merge', tile)"
    />
  </div>
</template>

<style>
.game-board {
  position: relative;
  display: grid;
  grid-template-columns: repeat(var(--boardSize), var(--tileSize));
  grid-template-rows: repeat(var(--boardSize), var(--tileSize));
  gap: var(--tilePadding);
  background-color: #bbac9f;
  border-radius: 4px;
  padding: 15px;
}

.game-board__tile {
  background-color: #ccc0b3;
  border-radius: 4px;
}
</style>
