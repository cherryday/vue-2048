import { onMounted, onUnmounted, onErrorCaptured, ref } from 'vue';
import { v4 } from 'uuid';
import storage from '../services/storage';
import { BOARD_SIZE } from '../constants';

export function useGame() {
  const tiles = ref([]);
  const isWin = ref(false);
  const isLoss = ref(false);
  const isError = ref(false);
  const score = ref(0);
  const bestScore = ref(0);

  let isTilesMoved = false;
  let mergeCount = 0;

  function initState() {
    const gameScore = storage.getBestScore();

    if (gameScore) {
      bestScore.value = gameScore;
    }

    const gameState = storage.getGameState();

    if (gameState) {
      tiles.value = gameState.tiles;
      score.value = gameState.score;
    } else {
      tiles.value.push(getRandomTile());
      tiles.value.push(getRandomTile());
      storage.setGameState({ tiles: tiles.value, score: score.value });
    }
  }

  function changePositionTiles(rows, axis, isForward) {
    tiles.value.forEach((tile) => (tile.isNew = false));

    const range = isForward ? 3 : 0;
    const isChange = (coord) => (isForward && coord < range) || coord > range;

    rows.forEach((row) => {
      row.forEach((currentTile, index) => {
        const nextTile = row[index - 1];

        if (nextTile) {
          if (currentTile.value === nextTile.value && !nextTile.isMerge) {
            currentTile.isMerge = true;
            currentTile[axis] = nextTile[axis];
            mergeCount++;

            isTilesMoved = true;
          } else if (
            currentTile[axis] !==
            nextTile[axis] + (isForward ? -1 : 1)
          ) {
            currentTile[axis] = nextTile[axis] + (isForward ? -1 : 1);
            isTilesMoved = true;
          }
        } else if (isChange(currentTile[axis])) {
          currentTile[axis] = range;
          isTilesMoved = true;
        }
      });
    });

    if (isTilesMoved) {
      tiles.value.push(getRandomTile());
      if (!mergeCount) {
        storage.setGameState({ tiles: tiles.value, score: score.value });
      }
      isTilesMoved = false;
    }
  }

  function getFreeCoords() {
    const freeTiles = [];

    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        const isExist = tiles.value.some(
          (tile) => tile.x === x && tile.y === y,
        );
        if (!isExist) {
          freeTiles.push({ x, y });
        }
      }
    }

    return freeTiles;
  }

  function getRandomTile() {
    const freeCoords = getFreeCoords();
    const randomIndex = Math.floor(Math.random() * freeCoords.length);

    return {
      id: v4(),
      value: 2,
      isNew: true,
      ...freeCoords[randomIndex],
    };
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

  function mergeTiles() {
    mergeCount--;

    if (mergeCount <= 0) {
      tiles.value = tiles.value.filter((tile) => {
        if (tile.isMerge) {
          const mergedTile = tiles.value.find(
            (t) => t.x === tile.x && t.y === tile.y && !t.isMerge,
          );
          mergedTile.value += tile.value;
          return false;
        }
        return true;
      });

      storage.setGameState({ tiles: tiles.value, score: score.value });
    }
  }

  function restart() {
    storage.clearGameState();
    tiles.value = [];
    tiles.value.push(getRandomTile());
    tiles.value.push(getRandomTile());
    storage.setGameState({ tiles: tiles.value, score: score.value });
    isTilesMoved = false;
  }

  function onKeydown(event) {
    event.preventDefault();

    if (isWin.value || isLoss.value || isError.value) {
      return;
    }

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
  }

  initState();

  onMounted(() => {
    window.addEventListener('keydown', onKeydown);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', onKeydown);
  });

  onErrorCaptured((...args) => {
    console.log('Error useGame', args);
    return false;
  });

  return {
    tiles,
    isWin,
    isLoss,
    isError,
    score,
    bestScore,
    restart,
    mergeTiles,
  };
}
