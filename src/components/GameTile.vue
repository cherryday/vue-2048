<script setup>
import { computed, ref, watch } from 'vue';
import { TILE_SIZE, TILE_PADDING } from '../constants';

const emit = defineEmits(['merge']);

const props = defineProps({
  tile: {
    type: Object,
    required: true,
  },
});

const isScaling = ref(false);

watch(
  () => props.tile.value,
  () => {
    isScaling.value = true;
  },
);

function getPositionByCoord(coord) {
  return coord * TILE_SIZE + TILE_PADDING + coord * TILE_PADDING;
}

const styles = computed(() => {
  return {
    transform: `translate(${getPositionByCoord(
      props.tile.x,
    )}px, ${getPositionByCoord(props.tile.y)}px)`,
  };
});

const classesInner = computed(() => {
  return {
    'game-tile--scale': isScaling.value,
    'game-tile--new': props.tile.isNew,
    'game-tile--2': props.tile.value === 2,
    'game-tile--4': props.tile.value === 4,
    'game-tile--8': props.tile.value === 8,
    'game-tile--16': props.tile.value === 16,
    'game-tile--32': props.tile.value === 32,
    'game-tile--64': props.tile.value === 64,
    'game-tile--128': props.tile.value === 128,
    'game-tile--256': props.tile.value === 256,
    'game-tile--512': props.tile.value === 512,
    'game-tile--1024': props.tile.value === 1024,
    'game-tile--2048': props.tile.value === 2048,
  };
});

function onTransitionEnd() {
  if (props.tile.isMerge) {
    emit('merge');
  }
}

function onAnimationEnd() {
  isScaling.value = false;
}
</script>

<template>
  <div
    class="game-tile"
    :class="{ 'game-tile--merge': props.tile.isMerge }"
    :style="styles"
    @transitionend="onTransitionEnd"
  >
    <div
      class="game-tile__inner"
      :class="classesInner"
      @animationend="onAnimationEnd"
    >
      {{ props.tile.value }}
    </div>
  </div>
</template>

<style>
.game-tile {
  position: absolute;
  z-index: 4;
  transition: transform 100ms ease-in-out;
}

.game-tile__inner {
  height: var(--tileSize);
  width: var(--tileSize);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #776e65;
  background-color: #eee4da;
  font-size: 55px;
  font-weight: bold;
  font-family: sans-serif;
  border-radius: 4px;
  user-select: none;
}

.game-tile--merge {
  z-index: 2;
}

.game-tile--scale {
  animation: scale 200ms ease;
}

.game-tile--new {
  animation: new 200ms ease;
}

.game-tile--2 {
  color: #776e65;
  background-color: #eee4da;
}
.game-tile--4 {
  color: #776e65;
  background-color: #eee1c9;
}
.game-tile--8 {
  color: #f9f6f2;
  background-color: #f3b27a;
}
.game-tile--16 {
  color: #f9f6f2;
  background-color: #f69664;
}
.game-tile--32 {
  color: #f9f6f2;
  background-color: #f77c5f;
}
.game-tile--64 {
  color: #f9f6f2;
  background-color: #f75f3b;
}
.game-tile--128 {
  color: #f9f6f2;
  background-color: #edd073;
  box-shadow: 0 0 30px 10px rgb(243 215 116 / 24%),
    inset 0 0 0 1px rgb(255 255 255 / 14%);
  font-size: 45px;
}
.game-tile--256 {
  color: #f9f6f2;
  background: #edcc62;
  box-shadow: 0 0 30px 10px rgb(243 215 116 / 32%),
    inset 0 0 0 1px rgb(255 255 255 / 19%);
  font-size: 45px;
}
.game-tile--512 {
  color: #f9f6f2;
  background: #edc950;
  box-shadow: 0 0 30px 10px rgb(243 215 116 / 40%),
    inset 0 0 0 1px rgb(255 255 255 / 24%);
  font-size: 45px;
}
.game-tile--1024 {
  color: #f9f6f2;
  background: #edc53f;
  box-shadow: 0 0 30px 10px rgb(243 215 116 / 48%),
    inset 0 0 0 1px rgb(255 255 255 / 29%);
  font-size: 35px;
}
.game-tile--2048 {
  color: #f9f6f2;
  background: #edc22e;
  box-shadow: 0 0 30px 10px rgb(243 215 116 / 56%),
    inset 0 0 0 1px rgb(255 255 255 / 33%);
  font-size: 35px;
}

@keyframes new {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes scale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
