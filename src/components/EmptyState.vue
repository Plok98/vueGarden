<template>
  <div class="empty-state">
    <div class="empty-state-icon">{{ icon }}</div>
    <h3>{{ title }}</h3>
    <p>{{ message }}</p>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  message: string
}>()
</script>

<style scoped>
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--seasonal-card);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.empty-state-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  margin: 0 0 0.5rem 0;
  color: var(--seasonal-text);
  font-size: 1.5rem;
}

.empty-state p {
  margin: 0;
  color: var(--seasonal-text);
  opacity: 0.7;
  font-size: 1rem;
}
</style>
