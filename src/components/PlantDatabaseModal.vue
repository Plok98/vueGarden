<template>
  <div class="modal" :class="{ active: isOpen }" @click.self="$emit('close')">
    <div class="modal-content database-modal">
      <div class="modal-header">
        <h2>{{ t('plantDatabase') }}</h2>
        <button class="close-button" @click="$emit('close')">×</button>
      </div>
      <div class="database-search">
        <input
          type="text"
          v-model="localSearchTerm"
          :placeholder="t('searchPlantsPlaceholder')"
          class="search-input"
        >
        <div class="database-filters">
          <button
            class="filter-button"
            :class="{ active: localFilter === 'all' }"
            @click="localFilter = 'all'"
          >{{ t('all') }}</button>
          <button
            class="filter-button"
            :class="{ active: localFilter === 'vegetable' }"
            @click="localFilter = 'vegetable'"
          >{{ t('vegetables') }}</button>
          <button
            class="filter-button"
            :class="{ active: localFilter === 'fruit' }"
            @click="localFilter = 'fruit'"
          >{{ t('fruits') }}</button>
          <button
            class="filter-button"
            :class="{ active: localFilter === 'herb' }"
            @click="localFilter = 'herb'"
          >{{ t('herbs') }}</button>
          <button
            class="filter-button"
            :class="{ active: localFilter === 'flower' }"
            @click="localFilter = 'flower'"
          >{{ t('flowers') }}</button>
        </div>
      </div>
      <div class="database-grid">
        <div v-if="filteredItems.length === 0" class="empty-state" style="grid-column: 1 / -1;">
          <h3>{{ t('noResultsTitle') }}</h3>
          <p>{{ t('noResultsMessage') }}</p>
        </div>

        <div
          class="database-plant-card"
          v-for="item in filteredItems"
          :key="item.name"
          @click="selectPlant(item)"
        >
          <div class="database-plant-header">
            <div>
              <h4 class="database-plant-name">{{ language === 'nl' ? item.nameDutch : item.name }}</h4>
              <p class="database-plant-scientific">{{ item.scientific }}</p>
            </div>
            <span class="database-plant-emoji">{{ item.emoji }}</span>
          </div>
          <div class="database-plant-info">
            <div class="database-info-row">
              <span class="database-info-label">{{ t('type') }}</span>
              <span class="database-info-value">{{ translatePlantType(item.type) }}</span>
            </div>
            <div class="database-info-row">
              <span class="database-info-label">{{ t('daysToMaturity') }}</span>
              <span class="database-info-value">{{ item.daysToMaturity }}</span>
            </div>
            <div class="database-info-row">
              <span class="database-info-label">{{ t('sunRequirement') }}</span>
              <span class="database-info-value">{{ translateSunRequirement(item.sunRequirement) }}</span>
            </div>
            <div class="database-info-row">
              <span class="database-info-label">{{ t('waterFrequency') }}</span>
              <span class="database-info-value">{{ translateWaterFrequency(item.waterFrequency) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { PlantTemplate } from '@/types'
import { useTranslations } from '@/composables/useTranslations'
import { usePlantDatabaseStore } from '@/stores/plantDatabase'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
  select: [template: PlantTemplate]
}>()

const {
  t,
  language,
  translatePlantType,
  translateSunRequirement,
  translateWaterFrequency
} = useTranslations()

const plantDatabaseStore = usePlantDatabaseStore()

const localSearchTerm = ref('')
const localFilter = ref('all')

watch(localSearchTerm, (val) => plantDatabaseStore.setSearchTerm(val))
watch(localFilter, (val) => plantDatabaseStore.setFilterType(val))

const filteredItems = computed(() => plantDatabaseStore.filteredDatabase)

function selectPlant(template: PlantTemplate) {
  emit('select', template)
  emit('close')
}
</script>

<style scoped>
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  overflow-y: auto;
  padding: 2rem;
}

.modal.active {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: var(--seasonal-card);
  border-radius: 12px;
  padding: 2rem;
  max-width: 900px;
  width: 100%;
  max-height: 85%;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(var(--seasonal-text-rgb), 0.1);
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--seasonal-text);
}

.close-button {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: var(--seasonal-text);
  opacity: 0.5;
}

.search-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid rgba(var(--seasonal-text-rgb), 0.2);
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 1rem;
  background: var(--seasonal-card);
  color: var(--seasonal-text);
}

.database-filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.filter-button {
  padding: 0.5rem 1rem;
  border: 2px solid rgba(var(--seasonal-text-rgb), 0.2);
  background: var(--seasonal-card);
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--seasonal-text);
  transition: all 0.2s;
}

.filter-button:hover {
  border-color: var(--seasonal-primary);
  color: var(--seasonal-primary);
}

.filter-button.active {
  background: var(--seasonal-primary);
  border-color: var(--seasonal-primary);
  color: white;
}

.database-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  max-height: 400px;
  overflow-y: auto;
  padding: 0.5rem;
}

.database-plant-card {
  background: var(--seasonal-card);
  border: 2px solid rgba(var(--seasonal-text-rgb), 0.1);
  border-radius: 12px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.database-plant-card:hover {
  border-color: var(--seasonal-primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.database-plant-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 0.75rem;
}

.database-plant-name {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  color: var(--seasonal-text);
}

.database-plant-scientific {
  margin: 0;
  font-size: 0.75rem;
  font-style: italic;
  color: var(--seasonal-text);
  opacity: 0.6;
}

.database-plant-emoji {
  font-size: 2rem;
}

.database-plant-info {
  display: grid;
  gap: 0.5rem;
  font-size: 0.75rem;
}

.database-info-row {
  display: flex;
  justify-content: space-between;
}

.database-info-label {
  color: var(--seasonal-text);
  opacity: 0.7;
}

.database-info-value {
  color: var(--seasonal-text);
  font-weight: 500;
}

.empty-state {
  text-align: center;
  padding: 2rem;
}

.empty-state h3 {
  margin: 0 0 0.5rem 0;
  color: var(--seasonal-text);
}

.empty-state p {
  margin: 0;
  color: var(--seasonal-text);
  opacity: 0.7;
}
</style>
