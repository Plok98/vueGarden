<template>
  <div class="page">
    <header class="header">
      <h1 v-if="t('myGardenTitle') === 'Groen'" class="logo-title">
        <img src="@/assets/logo.svg" alt="Groen" class="logo-img" />
      </h1>
      <h1 v-else>{{ t('myGardenTitle') }}</h1>
      <p>{{ t('myGardenSubtitle') }}</p>
    </header>

    <div class="controls">
      <div class="button-group">
        <button class="button button-primary add-button" @click="$emit('openPlantModal')">
          {{ t('addNewPlant') }}
        </button>
        <button class="button button-secondary" @click="$emit('openDatabaseModal')">
          🌿 {{ t('browseDatabase') }}
        </button>
      </div>
      <div class="filter-controls">
        <span class="filter-label">{{ t('filterBy') }}</span>
        <div class="filter-buttons">
          <button
            class="filter-chip"
            :class="{ active: currentFilter === 'all' }"
            @click="currentFilter = 'all'"
          >{{ t('all') }}</button>
          <button
            class="filter-chip"
            :class="{ active: currentFilter === 'planning' }"
            @click="currentFilter = 'planning'"
          >{{ t('planning') }}</button>
          <button
            class="filter-chip"
            :class="{ active: currentFilter === 'planted' }"
            @click="currentFilter = 'planted'"
          >{{ t('planted') }}</button>
          <button
            class="filter-chip"
            :class="{ active: currentFilter === 'growing' }"
            @click="currentFilter = 'growing'"
          >{{ t('growing') }}</button>
          <button
            class="filter-chip"
            :class="{ active: currentFilter === 'ready' }"
            @click="currentFilter = 'ready'"
          >{{ t('ready') }}</button>
        </div>
      </div>
    </div>

    <div class="plant-grid">
      <EmptyState
        v-if="filteredPlants.length === 0"
        icon="bi-flower3"
        :title="t('noPlantsTitle')"
        :message="t('noPlantsMessage')"
      />

      <PlantCard
        v-for="plant in filteredPlants"
        :key="plant.id"
        :plant="plant"
        :show-actions="true"
        @edit="$emit('editPlant', $event)"
        @delete="handleDelete"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import EmptyState from '@/components/EmptyState.vue'
import PlantCard from '@/components/PlantCard.vue'
import { useTranslations } from '@/composables/useTranslations'
import { useUserPlantsStore } from '@/stores/userPlants'
import type { Plant } from '@/types'

defineEmits<{
  openPlantModal: []
  openDatabaseModal: []
  editPlant: [plant: Plant]
}>()

const { t } = useTranslations()
const userPlantsStore = useUserPlantsStore()

const currentFilter = ref('all')

const filteredPlants = computed(() =>
  userPlantsStore.getPlantsByStatus(currentFilter.value)
)

async function handleDelete(plant: Plant) {
  if (confirm(t('delete') + '?')) {
    await userPlantsStore.deletePlant(plant)
  }
}
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

.logo-title {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.logo-img {
  height: 120px;
  width: auto;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.header p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  margin: 0;
}

.controls {
  margin-bottom: 2rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.button-primary {
  background: var(--seasonal-primary);
  color: white;
}

.button-secondary {
  background: var(--seasonal-card);
  color: var(--seasonal-text);
}

.filter-controls {
  display: flex;
  gap: 1rem;
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

.filter-chip {
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

.filter-chip:hover {
  border-color: white;
}

.filter-chip.active {
  background: white;
  border-color: white;
  color: var(--seasonal-primary);
}

.plant-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}
</style>
