const GAME = 'game';
const BEST_SCORE = 'bestScore';
const errorValidation = new Error('not valid data');

function getGameState() {
  try {
    const gameState = JSON.parse(localStorage.getItem(GAME));
    return validateGameState(gameState);
  } catch {
    clearGameState();
    return null;
  }
}

function setGameState(gameState) {
  localStorage.setItem(GAME, JSON.stringify(gameState));
}

function clearGameState() {
  localStorage.removeItem(GAME);
}

function getBestScore() {
  try {
    const score = localStorage.getItem(BEST_SCORE);
    return validateScore(score);
  } catch {
    clearBestScore();
    return null;
  }
}

function setBestScore(score) {
  localStorage.setItem(BEST_SCORE, score);
}

function clearBestScore() {
  localStorage.removeItem(BEST_SCORE);
}

function validateGameState(gameState) {
  if (!gameState) throw errorValidation;
  if (!Array.isArray(gameState.tiles)) throw errorValidation;
  return { ...gameState, score: validateScore(gameState.score) };
}

function validateScore(score) {
  const number = parseInt(score);
  if (!Number.isInteger(number)) throw errorValidation;
  return number;
}

export default {
  getGameState,
  setGameState,
  clearGameState,
  getBestScore,
  setBestScore,
  clearBestScore,
};
