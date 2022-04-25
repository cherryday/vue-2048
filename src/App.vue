<script setup>
import { reactive } from 'vue';

let rows = reactive([
  { x: 0, y: 0, value: 2 },
  { x: 1, y: 0, value: 2 },
]);

// function getStyles(x, y) {
//   return {
//     transform: `translate(${x * 106 + 15}px, ${y * 106 + 15}px)`
//   }
// }

// let matrix = reactive([
//   [1, 0, 0, 0],
//   [0, 0, 0, 0],
//   [0, 0, 0, 0],
//   [0, 0, 0, 0],
// ]);

window.addEventListener('keydown', (event) => {
  const code = event.code;

  if (code === 'ArrowUp') {
    // rows.push({ x: 1, y: 0, value: 2 });
    rows[0].y = 0;
  }

  if (code === 'ArrowRight') {
    rows[0].x = 2;
    rows[1].x = 3;
  }
  if (code === 'ArrowLeft') {
    rows[0].x = 0;
    rows[1].x = 1;
  }
  if (code === 'ArrowDown') {
    rows[0].y = 3;
  }
});
//
</script>

<template>
  <main class="main">
    <div class="board">
      <div v-for="index in 16" :key="index" class="cell">
        <span>{{ index }}</span>
      </div>

      <div
        v-for="(row, index) in rows"
        :key="index"
        class="content"
        :style="{
          transform: `translate(${row.x * 106 + 15 + row.x * 15}px, ${
            row.y * 106 + 15 + row.y * 15
          }px)`,
        }"
      >
        {{ row.value }}
      </div>
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
  /* width: 106px;
  height: 106px; */
  background-color: #ccc0b3;
}

.content {
  position: absolute;
  display: block;
  height: 106px;
  width: 106px;
  background-color: #eee4da;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #776e65;
  font-size: 32px;
  transition: transform 100ms ease-in-out;
}

/* .content:hover {
  transform: translateY(121px);
} */
</style>
