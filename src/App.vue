<script setup lang="ts">
  import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-wrapper">
    <RouterView />
  </div>
</template>

<style>
/* Global styles can stay here or main.ts, but standardizing App.vue */
:root {
  --section-gap: 160px;
}

body {
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
.app-wrapper {
  width: 100%;
  min-height: 100vh;
}
</style>
