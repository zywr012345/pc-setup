<script setup>
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@import "./common/style/integration.scss";

#app {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background-color: $white;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
