<template>
  <button class="base-button">
    <slot></slot>
  </button>
</template>

<style>
.base-button {
  background: #8f7a66;
  color: #f9f6f2;
  cursor: pointer;
  height: 40px;
  padding: 0 20px;
  border: none;
  border-radius: 3px;
  margin-bottom: 40px;
  font-weight: bold;
  font-size: 18px;
}
</style>
