<template>
  <article class="plant-card">
    <div class="plant-card-header">
      <div>
        <div class="plant-emoji">🌱</div>
        <h3>{{ plant.name }}</h3>
        <p class="info-label">{{ translatePlantType(plant.type) }}</p>
      </div>
      <span class="status-badge" :class="plant.status">
        {{ translateStatus(plant.status) }}
      </span>
    </div>
    <div class="plant-info">
      <div class="info-row">
        <span class="info-label">{{ t('sunRequirement') }}</span>
        <span class="info-value">{{ translateSunRequirement(plant.sun_requirement) }}</span>
      </div>
      <div class="info-row">
        <span class="info-label">{{ t('waterFrequency') }}</span>
        <span class="info-value">{{ translateWaterFrequency(plant.water_frequency) }}</span>
      </div>
      <div class="info-row" v-if="plant.harvest_date">
        <span class="info-label">{{ t('expectedHarvest') }}</span>
        <span class="info-value">{{ formatDate(plant.harvest_date) }}</span>
      </div>
    </div>
    <div class="card-actions" v-if="showActions">
      <button class="button button-secondary" @click="$emit('edit', plant)">
        {{ t('edit') }}
      </button>
      <button class="button button-primary" @click="$emit('delete', plant)">
        {{ t('delete') }}
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Plant } from '@/types'
import { useTranslations } from '@/composables/useTranslations'

defineProps<{
  plant: Plant
  showActions?: boolean
}>()

defineEmits<{
  edit: [plant: Plant]
  delete: [plant: Plant]
}>()

const {
  t,
  translatePlantType,
  translateStatus,
  translateSunRequirement,
  translateWaterFrequency
} = useTranslations()

function formatDate(dateString: string): string {
  if (!dateString) return '—'
  const date = new Date(dateString)
  return date.toLocaleDateString()
}
</script>

<style scoped>
.plant-card {
  background: var(--seasonal-card);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.plant-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.plant-card-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;
  border-bottom: 2px solid #f3f4f6;
  padding-bottom: 1rem;
}

.plant-emoji {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.plant-card-header h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1.25rem;
  color: var(--seasonal-text);
}

.plant-info {
  display: grid;
  gap: 0.75rem;
  font-size: 0.875rem;
}

.info-row {
  display: flex;
  align-items: start;
  gap: 0.5rem;
}

.info-label {
  font-weight: 600;
  color: var(--seasonal-text);
  opacity: 0.7;
  min-width: 100px;
}

.info-value {
  color: var(--seasonal-text);
  flex: 1;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.planning {
  background: rgba(var(--seasonal-text-rgb), 0.1);
  color: var(--seasonal-text);
}

.status-badge.planted {
  background: rgba(var(--seasonal-primary-rgb), 0.1);
  color: var(--seasonal-primary);
}

.status-badge.growing {
  background: rgba(var(--seasonal-primary-rgb), 0.15);
  color: var(--seasonal-primary);
}

.status-badge.ready {
  background: rgba(var(--seasonal-secondary-rgb), 0.15);
  color: var(--seasonal-secondary);
}

.status-badge.harvested {
  background: rgba(var(--seasonal-text-rgb), 0.1);
  color: var(--seasonal-text);
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
}

.button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  flex: 1;
}

.button-primary {
  background: var(--seasonal-primary);
  color: white;
}

.button-primary:hover {
  opacity: 0.9;
}

.button-secondary {
  background: rgba(var(--seasonal-text-rgb), 0.1);
  color: var(--seasonal-text);
}

.button-secondary:hover {
  background: rgba(var(--seasonal-text-rgb), 0.2);
}
</style>
