<script setup>
import { computed } from 'vue';

// { id: 0, x: 0, y: 0, value: 2, isMerge: false }
const props = defineProps({
  tile: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['merge']);

const styles = computed(() => {
  return {
    transform: `translate(${props.tile.x * 106 + 15 + props.tile.x * 15}px, ${
      props.tile.y * 106 + 15 + props.tile.y * 15
    }px)`,
  };
});

function onTransitionEnd() {
  if (props.tile.isMerge) {
    emit('merge');
  }
}
</script>

<template>
  <div
    class="game-tile"
    :class="{ 'game-tile--merge': props.tile.isMerge }"
    :style="styles"
    @transitionend="onTransitionEnd"
  >
    <div class="game-tile__inner game-tile--scale">
      {{ props.tile.value }}
    </div>
  </div>
</template>

<style>
.game-tile {
  position: absolute;
  z-index: 4;
  transition: transform 500ms ease-in-out;
}

.game-tile__inner {
  height: 106px;
  width: 106px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #776e65;
  background-color: #eee4da;
  font-size: 32px;
}

.game-tile--merge {
  z-index: 2;
}

.game-tile--scale {
  animation: scale 500ms ease-in-out;
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
