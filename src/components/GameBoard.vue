<script setup>
import GameTile from './GameTile.vue';
import GameMessage from './GameMessage.vue';
import BaseButton from './BaseButton.vue';
import { TILE_SIZE, TILE_PADDING, BOARD_SIZE } from '../constants';

const emit = defineEmits(['merge']);

const props = defineProps({
  tiles: {
    type: Array,
    required: true,
  },
  win: {
    type: Boolean,
    required: true,
  },
  loss: {
    type: Boolean,
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
    <Transition name="fade">
      <GameMessage v-if="win" class="game-win">
        You win!
        <template #action>
          <BaseButton>Keep going</BaseButton>
          <BaseButton>Try again</BaseButton>
        </template>
      </GameMessage>

      <GameMessage v-else-if="loss" class="game-over">
        Game over!
        <template #action>
          <BaseButton>Try again</BaseButton>
        </template>
      </GameMessage>
    </Transition>

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
  overflow: hidden;
}

.game-board__tile {
  background-color: #ccc0b3;
  border-radius: 4px;
}

.game-win {
  background-color: rgba(237, 194, 46, 0.5);
}

.game-win .game-message__title {
  color: #f9f6f2;
}

.game-over {
  background-color: rgba(238, 228, 218, 0.73);
}

.game-over .game-message__title {
  color: #776e65;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
