<script setup>
import { computed, ref, watch } from 'vue';
import { SIZE_TILE, PADDING_TILE } from '../constants';

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
  return coord * SIZE_TILE + PADDING_TILE + coord * PADDING_TILE;
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
  transition: transform 140ms ease-in-out;
}

.game-tile__inner {
  height: var(--sizeTile);
  width: var(--sizeTile);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #776e65;
  background-color: #eee4da;
  font-size: 54px;
  font-weight: bold;
  font-family: sans-serif;
  border-radius: 4px;
  user-select: none;
}

.game-tile--merge {
  z-index: 2;
}

.game-tile--scale {
  animation: scale 100ms ease-in-out;
}

.game-tile--new {
  animation: new 300ms ease-in-out;
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

@keyframes new {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

@keyframes scale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
