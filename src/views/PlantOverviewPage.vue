<template>
  <div class="page">
    <header class="header">
      <h1>{{ t('pastPlantsTitle') }}</h1>
      <p>{{ t('pastPlantsSubtitle') }}</p>
    </header>

    <div class="filter-controls">
      <span class="filter-label">{{ t('filterBy') }}</span>
      <div class="filter-buttons">
        <button
          class="filter-button"
          :class="{ active: currentFilter === 'all' }"
          @click="currentFilter = 'all'"
        >{{ t('all') }}</button>
        <button
          class="filter-button"
          :class="{ active: currentFilter === 'vegetable' }"
          @click="currentFilter = 'vegetable'"
        >{{ t('vegetables') }}</button>
        <button
          class="filter-button"
          :class="{ active: currentFilter === 'fruit' }"
          @click="currentFilter = 'fruit'"
        >{{ t('fruits') }}</button>
        <button
          class="filter-button"
          :class="{ active: currentFilter === 'herb' }"
          @click="currentFilter = 'herb'"
        >{{ t('herbs') }}</button>
        <button
          class="filter-button"
          :class="{ active: currentFilter === 'flower' }"
          @click="currentFilter = 'flower'"
        >{{ t('flowers') }}</button>
      </div>
    </div>

    <div class="content-sections">

      <!-- Database Plants Section -->
      <section class="section">
        <h2 class="section-title">{{ language === 'nl' ? 'Plant Database' : 'Plant Database' }}</h2>
        <div class="database-grid">
          <div
            class="database-card"
            v-for="item in filteredDatabasePlants"
            :key="item.name"
            @click="$emit('selectFromDatabase', item)"
          >
            <div class="database-card-header">
              <span class="database-emoji">{{ item.emoji }}</span>
              <div>
                <h4>{{ language === 'nl' ? item.nameDutch : item.name }}</h4>
                <p class="scientific">{{ item.scientific }}</p>
              </div>
            </div>
            <div class="database-card-info">
              <div class="info-item">
                <span class="label">{{ translatePlantType(item.type) }}</span>
                <span>{{ item.daysToMaturity }} {{ language === 'nl' ? 'dagen' : 'days' }}</span>
              </div>
              <div class="info-item planting-window">
                <span class="label">{{ t('plantingWindow') }}:</span>
                <span>{{ item.plantingStartDate }} - {{ item.plantingEndDate }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTranslations } from '@/composables/useTranslations'
import { usePlantDatabaseStore } from '@/stores/plantDatabase'
import type { PlantTemplate } from '@/types'

defineEmits<{
  selectFromDatabase: [template: PlantTemplate]
}>()

const { t, language, translatePlantType } = useTranslations()
const plantDatabaseStore = usePlantDatabaseStore()

const currentFilter = ref('all')


const filteredDatabasePlants = computed(() => {
  if (currentFilter.value === 'all') {
    return plantDatabaseStore.plantDatabase
  }
  return plantDatabaseStore.plantDatabase.filter(p => p.type === currentFilter.value)
})
</script>

<style scoped>
.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 2.5rem;
  color: white;
  margin: 0 0 0.5rem 0;
}

.header p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  margin: 0;
}

.filter-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  align-items: center;
}

.filter-label {
  font-weight: 600;
  color: white;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-button {
  padding: 0.5rem 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  transition: all 0.2s;
}

.filter-button:hover {
  border-color: white;
}

.filter-button.active {
  background: white;
  border-color: white;
  color: var(--seasonal-primary);
}

.content-sections {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.section-title {
  color: white;
  font-size: 1.5rem;
  margin: 0 0 1.5rem 0;
}


.database-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.database-card {
  background: var(--seasonal-card);
  border-radius: 12px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.database-card:hover {
  border-color: var(--seasonal-primary);
  transform: translateY(-2px);
}

.database-card-header {
  display: flex;
  gap: 0.75rem;
  align-items: start;
  margin-bottom: 0.75rem;
}

.database-emoji {
  font-size: 2rem;
}

.database-card-header h4 {
  margin: 0;
  color: var(--seasonal-text);
  font-size: 1rem;
}

.database-card-header .scientific {
  margin: 0.25rem 0 0 0;
  font-size: 0.75rem;
  font-style: italic;
  color: var(--seasonal-text);
  opacity: 0.6;
}

.database-card-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: var(--seasonal-text);
  opacity: 0.8;
}

.info-item {
  display: flex;
  justify-content: space-between;
}

.info-item.planting-window {
  padding-top: 0.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.label {
  font-weight: 600;
  opacity: 0.7;
}
</style>
