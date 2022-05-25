<script setup>
import GameTile from './GameTile.vue';
import { SIZE_TILE, PADDING_TILE } from '../constants';

const emit = defineEmits(['merge']);

const props = defineProps({
  tiles: {
    type: Array,
    required: true,
  },
});

const styleVars = {
  '--sizeTile': `${SIZE_TILE}px`,
  '--paddingTile': `${PADDING_TILE}px`,
};
</script>

<template>
  <div class="game-board" :style="styleVars">
    <div v-for="index in 16" :key="index" class="game-board__tile"></div>

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
  grid-template-columns: repeat(4, var(--sizeTile));
  grid-template-rows: repeat(4, var(--sizeTile));
  gap: var(--paddingTile);
  background-color: #bbac9f;
  border-radius: 4px;
  padding: 15px;
}

.game-board__tile {
  background-color: #ccc0b3;
  border-radius: 4px;
}
</style>
