<script setup>
defineProps({
  t: Function,
  activePlants: Array,
  dailyTip: Object,
  discoverInsights: Array
})
</script>

<template>
  <div id="discover" class="page">
    <header class="header">
      <h1 id="app-title">{{ t('discoverTitle') }}</h1>
      <p id="app-subtitle">{{ t('discoverSubtitle') }}</p>
    </header>

    <div id="discover-content">
      <div v-if="activePlants.length === 0" class="empty-state">
        <div class="empty-state-icon">🌿</div>
        <h3>{{ t('welcomeMessage') }}</h3>
        <p>{{ t('addPlantsMessage') }}</p>
      </div>

      <template v-else>
        <div v-if="dailyTip" class="care-tip-card">
          <h3>💡 {{ dailyTip.title }}</h3>
          <p>{{ dailyTip.body }}</p>
        </div>

        <div class="discover-grid">
          <div
            v-for="insight in discoverInsights"
            :key="insight.title"
            class="insight-card"
            :class="{ 'ai-suggestion': insight.type === 'ai-suggestion' }"
          >
            <div class="insight-header">
              <span class="insight-icon">{{ insight.icon }}</span>
              <h3 class="insight-title">{{ insight.title }}</h3>
            </div>
            <div class="insight-content">{{ insight.content }}</div>
            <div v-if="insight.plants && insight.plants.length" class="insight-plants">
              <span v-for="plant in insight.plants" :key="plant" class="plant-tag">{{ plant }}</span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
