<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { v4 } from 'uuid';
import GameTile from './components/GameTile.vue';

const tiles = ref([
  // { id: 1, x: 0, y: 0, value: 2 },
  // { id: 4, x: 3, y: 0, value: 2 },
  // { id: 3, x: 2, y: 0, value: 2 },
  // { id: 5, x: 1, y: 1, value: 2 },
  // { id: 2, x: 1, y: 0, value: 2 },
]);

generateTile();
generateTile();

function generateTile() {
  const boardSize = 4;
  const freeTiles = [];

  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      const isExist = tiles.value.some((tile) => tile.x === x && tile.y === y);
      if (!isExist) {
        freeTiles.push({ id: v4(), x, y, value: 2, isNew: true });
      }
    }
  }

  const randomIndex =
    0 + Math.floor(Math.random() * (freeTiles.length - 1 + 1 - 0));

  tiles.value.push(freeTiles[randomIndex]);
}

function getRowsByAxis(axis) {
  return [
    ...tiles.value
      .reduce((acc, tile) => {
        if (acc.has(tile[axis])) {
          acc.set(tile[axis], [...acc.get(tile[axis]), tile]);
        } else {
          acc.set(tile[axis], [tile]);
        }
        return acc;
      }, new Map())
      .values(),
  ];
}

function getDistanceAxis(rows, axis) {
  const max = 3;

  rows.forEach((rows) => {
    rows.forEach((currentTile, index) => {
      const nextTile = rows[index - 1];

      if (nextTile) {
        if (currentTile.value === nextTile.value && !nextTile.isMerge) {
          currentTile.isMerge = true;
          currentTile[axis] = nextTile[axis];
        } else {
          currentTile[axis] = nextTile[axis] - 1;
        }
      } else if (currentTile[axis] < max) {
        currentTile[axis] = max;
      }
    });
  });
}

function getDistanceUpAxis(rows, axis) {
  const min = 0;

  rows.forEach((rows) => {
    rows.forEach((currentTile, index) => {
      const nextTile = rows[index - 1];

      if (nextTile) {
        if (currentTile.value === nextTile.value && !nextTile.isMerge) {
          currentTile.isMerge = true;
          currentTile[axis] = nextTile[axis];
        } else {
          currentTile[axis] = nextTile[axis] + 1;
        }
      } else if (currentTile[axis] > min) {
        currentTile[axis] = min;
      }
    });
  });
}

function moveRight() {
  const sortedRows = getRowsByAxis('y').map((row) =>
    row.sort((a, b) => b.x - a.x),
  );
  getDistanceAxis(sortedRows, 'x');
}

function moveLeft() {
  const sortedRows = getRowsByAxis('y').map((row) =>
    row.sort((a, b) => a.x - b.x),
  );
  getDistanceUpAxis(sortedRows, 'x');
}

function moveDown() {
  const sortedRows = getRowsByAxis('x').map((row) =>
    row.sort((a, b) => b.y - a.y),
  );
  getDistanceAxis(sortedRows, 'y');
}

function moveUp() {
  const sortedRows = getRowsByAxis('x').map((row) =>
    row.sort((a, b) => a.y - b.y),
  );
  getDistanceUpAxis(sortedRows, 'y');
}

function onMergeTiles(tile) {
  tiles.value = tiles.value.filter((a) => a.id !== tile.id);
  const mergedTile = tiles.value.find(
    (a) => a.x === tile.x && a.y === tile.y && !a.isMerge,
  );
  mergedTile.value += tile.value;
}

window.addEventListener('keydown', (event) => {
  tiles.value.forEach((tile) => (tile.isNew = false));

  if (event.code === 'ArrowUp') {
    moveUp();
  }
  if (event.code === 'ArrowRight') {
    moveRight();
  }
  if (event.code === 'ArrowLeft') {
    moveLeft();
  }
  if (event.code === 'ArrowDown') {
    moveDown();
  }

  generateTile();
});
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
