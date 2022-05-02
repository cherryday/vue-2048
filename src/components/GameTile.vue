<script setup>
import { computed, ref, watch } from 'vue';

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

const styles = computed(() => {
  return {
    transform: `translate(${props.tile.x * 106 + 15 + props.tile.x * 15}px, ${
      props.tile.y * 106 + 15 + props.tile.y * 15
    }px)`,
  };
});

const styleColor = computed(() => {
  let color = '#776e65';
  let backgroundColor = '#eee4da';

  if (props.tile.value >= 8) color = '#f9f6f2';

  if (props.tile.value === 4) backgroundColor = '#eee1c9';
  if (props.tile.value === 8) backgroundColor = '#f3b27a';
  if (props.tile.value === 16) backgroundColor = '#f69664';
  if (props.tile.value === 32) backgroundColor = '#f77c5f';

  return { color, backgroundColor };
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
      :class="{
        'game-tile--scale': isScaling,
        'game-tile--new': props.tile.isNew,
      }"
      :style="styleColor"
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
  height: 106px;
  width: 106px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #776e65;
  background-color: #eee4da;
  font-size: 54px;
  font-weight: bold;
  font-family: sans-serif;
  border-radius: 4px;
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
