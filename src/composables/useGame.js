import { onMounted, onUnmounted, ref } from 'vue';

export function useGame() {
  const tiles = ref([
    { id: 1, x: 0, y: 0, value: 2 },
    { id: 4, x: 3, y: 0, value: 2 },
    // { id: 3, x: 2, y: 0, value: 2 },
    // { id: 5, x: 1, y: 1, value: 2 },
    // { id: 2, x: 1, y: 0, value: 2 },
  ]);

  // generateTile();
  // generateTile();

  function changePositionTiles(rows, axis, isForward) {
    const range = isForward ? 3 : 0;
    const isChange = (coord) => (isForward && coord < range) || coord > range;

    rows.forEach((row) => {
      row.forEach((currentTile, index) => {
        const nextTile = row[index - 1];

        if (nextTile) {
          if (currentTile.value === nextTile.value && !nextTile.isMerge) {
            currentTile.isMerge = true;
            currentTile[axis] = nextTile[axis];
          } else {
            currentTile[axis] = nextTile[axis] + (isForward ? -1 : 1);
          }
        } else if (isChange(currentTile[axis])) {
          currentTile[axis] = range;
        }
      });
    });
  }

  function generateTile() {
    const boardSize = 4;
    const freeTiles = [];

    for (let y = 0; y < boardSize; y++) {
      for (let x = 0; x < boardSize; x++) {
        const isExist = tiles.value.some(
          (tile) => tile.x === x && tile.y === y,
        );
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

  function moveRight() {
    const sortedRows = getRowsByAxis('y').map((row) =>
      row.sort((a, b) => b.x - a.x),
    );
    changePositionTiles(sortedRows, 'x', true);
  }

  function moveLeft() {
    const sortedRows = getRowsByAxis('y').map((row) =>
      row.sort((a, b) => a.x - b.x),
    );
    changePositionTiles(sortedRows, 'x', false);
  }

  function moveDown() {
    const sortedRows = getRowsByAxis('x').map((row) =>
      row.sort((a, b) => b.y - a.y),
    );
    changePositionTiles(sortedRows, 'y', true);
  }

  function moveUp() {
    const sortedRows = getRowsByAxis('x').map((row) =>
      row.sort((a, b) => a.y - b.y),
    );
    changePositionTiles(sortedRows, 'y', false);
  }

  function onMergeTiles(tile) {
    tiles.value = tiles.value.filter((a) => a.id !== tile.id);
    const mergedTile = tiles.value.find(
      (a) => a.x === tile.x && a.y === tile.y && !a.isMerge,
    );
    mergedTile.value += tile.value;
  }

  function onKeydown(event) {
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

    // generateTile();
  }

  onMounted(() => {
    window.addEventListener('keydown', onKeydown);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', onKeydown);
  });

  return { tiles, onMergeTiles };
}
