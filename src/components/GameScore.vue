<script setup></script>

<template>
  <div class="game-score">
    <div class="score-card">
      <div class="score-card__title">Score</div>
      <div class="score-card__value">0</div>
    </div>

    <div class="score-card">
      <div class="score-card__title">Best</div>
      <div class="score-card__value">0</div>
    </div>
  </div>
</template>

<style>
.game-score {
  display: flex;
  gap: 5px;
}

.score-card {
  background-color: #bbada0;
  border-radius: 3px;
  text-align: center;
  font-weight: bold;
  padding: 2px 25px;
}

.score-card__title {
  color: #eee4da;
  font-size: 13px;
  text-transform: uppercase;
}

.score-card__value {
  color: #fff;
  font-size: 25px;
}
</style>
