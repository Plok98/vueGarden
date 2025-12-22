<script setup>
import { ref, computed } from 'vue'
import { plantDatabase } from '../plantDatabase'

const props = defineProps({
  show: Boolean,
  t: Function,
  language: String,
  translatePlantType: Function,
  translateSunRequirement: Function,
  translateWaterFrequency: Function
})

const emit = defineEmits(['close', 'add-plant'])

const searchTerm = ref('')
const databaseFilter = ref('all')

const filteredDatabase = computed(() => {
  const term = searchTerm.value.trim().toLowerCase()
  return plantDatabase.filter((item) => {
    const matchesFilter = databaseFilter.value === 'all' || item.type === databaseFilter.value
    const matchesSearch =
      !term ||
      item.name.toLowerCase().includes(term) ||
      item.nameDutch.toLowerCase().includes(term) ||
      item.scientific.toLowerCase().includes(term)
    return matchesFilter && matchesSearch
  })
})

const handleAdd = (item) => {
  emit('add-plant', item)
}
</script>

<template>
  <div id="plant-database-modal" class="modal" :class="{ active: show }" @click.self="$emit('close')">
    <div class="modal-content database-modal">
      <div class="modal-header">
        <h2 id="database-modal-title">{{ t('plantDatabase') }}</h2>
        <button class="close-button" id="close-database-modal" @click="$emit('close')">×</button>
      </div>
      <div class="database-search">
        <input
          type="text"
          id="plant-search"
          v-model="searchTerm"
          :placeholder="t('searchPlantsPlaceholder')"
          class="search-input"
        />
        <div class="database-filters">
          <button
            v-for="filter in ['all', 'vegetable', 'fruit', 'herb', 'flower']"
            :key="filter"
            class="filter-button"
            :class="{ active: databaseFilter === filter }"
            @click="databaseFilter = filter"
          >
            {{ t(filter === 'all' ? 'all' : filter === 'vegetable' ? 'vegetables' : filter === 'fruit' ? 'fruits' : filter === 'herb' ? 'herbs' : filter + 's') }}
          </button>
        </div>
      </div>
      <div id="plant-database-grid" class="database-grid">
        <div v-if="filteredDatabase.length === 0" class="empty-state" style="grid-column: 1 / -1">
          <h3>{{ t('noResultsTitle') }}</h3>
          <p>{{ t('noResultsMessage') }}</p>
        </div>

        <div
          v-for="item in filteredDatabase"
          :key="item.name"
          class="database-plant-card"
          @click="handleAdd(item)"
        >
          <div class="database-plant-header">
            <div>
              <h4 class="database-plant-name">
                {{ language === 'nl' ? item.nameDutch : item.name }}
              </h4>
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
