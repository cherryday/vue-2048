<template>
  <div class="game-message">
    <div class="game-message__title">
      <slot></slot>
    </div>
    <div class="game-message__actions">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<style>
.game-message {
  z-index: 8;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.game-message__title {
  font-size: 60px;
  font-weight: bold;
  margin-bottom: 40px;
}

.game-message__actions {
  display: flex;
  gap: 10px;
}
</style>
