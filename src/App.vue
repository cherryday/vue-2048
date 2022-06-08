<script setup>
import BaseButton from './components/BaseButton.vue';
import GameBoard from './components/GameBoard.vue';
import GameScore from './components/GameScore.vue';
import { useGame } from './composables/useGame';

const { tiles, isWin, isLoss, isError, score, bestScore, restart, mergeTiles } =
  useGame();
</script>

<template>
  <main class="main">
    <div class="container">
      <div class="main-head">
        <h1 class="title">2048</h1>
        <GameScore :score="score" :best="bestScore" />
      </div>

      <div class="main-subhead">
        <BaseButton @click="restart">New Game</BaseButton>
      </div>

      <GameBoard
        :tiles="tiles"
        :win="isWin"
        :loss="isLoss"
        :error="isError"
        @merge="mergeTiles"
      />
    </div>
  </main>
</template>

<style>
@import './assets/base.css';

.main {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
}

.main-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.main-subhead {
  display: flex;
  justify-content: end;
  margin-bottom: 20px;
}

.title {
  font-size: 80px;
  font-weight: bold;
  color: #776e65;
}
</style>
