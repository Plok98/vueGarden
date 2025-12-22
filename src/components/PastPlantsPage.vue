<script setup>
defineProps({
  t: Function,
  pastFilter: String,
  filteredPastPlants: Array,
  translatePlantType: Function,
  translateStatus: Function,
  formatDate: Function
})

defineEmits(['update:pastFilter'])
</script>

<template>
  <div id="past-plants" class="page">
    <header class="header">
      <h1>{{ t('pastPlantsTitle') }}</h1>
      <p>{{ t('pastPlantsSubtitle') }}</p>
    </header>

    <div class="filter-controls">
      <span class="filter-label">{{ t('filterBy') }}</span>
      <div class="filter-buttons">
        <button
          v-for="filter in ['all', 'vegetable', 'fruit', 'plant', 'tree', 'herb', 'flower']"
          :key="filter"
          class="filter-button"
          :class="{ active: pastFilter === filter }"
          @click="$emit('update:pastFilter', filter)"
        >
          {{ t(filter === 'all' ? 'all' : filter === 'vegetable' ? 'vegetables' : filter === 'fruit' ? 'fruits' : filter === 'herb' ? 'herbs' : filter === 'flower' ? 'flowers' : filter + 's') }}
        </button>
      </div>
    </div>

    <div class="plant-grid" id="past-plants-grid">
      <div v-if="filteredPastPlants.length === 0" class="empty-state">
        <div class="empty-state-icon">📚</div>
        <h3>{{ t('noPastPlantsTitle') }}</h3>
        <p>{{ t('noPastPlantsMessage') }}</p>
      </div>

      <article v-for="plant in filteredPastPlants" :key="plant.id" class="plant-card">
        <div class="plant-card-header">
          <div>
            <div class="plant-emoji">🍃</div>
            <h3>{{ plant.name }}</h3>
            <p class="info-label">{{ translatePlantType(plant.type) }}</p>
          </div>
          <span class="status-badge harvested">{{ translateStatus('harvested') }}</span>
        </div>
        <div class="plant-info">
          <div class="info-row">
            <span class="info-label">{{ t('plantingDate') }}</span>
            <span class="info-value">{{ formatDate(plant.planting_date) }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">{{ t('expectedHarvest') }}</span>
            <span class="info-value">{{ formatDate(plant.harvest_date) }}</span>
          </div>
          <div v-if="plant.storage_date" class="info-row">
            <span class="info-label">{{ t('storageDate') }}</span>
            <span class="info-value">{{ formatDate(plant.storage_date) }}</span>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
