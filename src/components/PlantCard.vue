<template>
  <article class="plant-card" :class="{ 'needs-water': needsWater }">
    <div class="plant-card-header">
      <div>
        <div class="plant-emoji">🌱</div>
        <h3>{{ plant.name }}</h3>
        <p class="info-label">{{ translatePlantType(plant.type) }}</p>
      </div>
      <div class="header-right">
        <span class="status-badge" :class="plant.status">
          {{ translateStatus(plant.status) }}
        </span>
        <button
          v-if="plant.status !== 'harvested'"
          class="water-pill"
          :class="{ 'just-watered': isRecentlyWatered }"
          @click="handleWater"
          :title="t('waterNow')"
        >
          <i class="water-icon bi bi-droplet-fill"></i>
          <span class="water-text">{{ isRecentlyWatered ? t('justWatered') : t('waterNow') }}</span>
        </button>
      </div>
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

      <div class="watering-details" v-if="plant.status !== 'harvested'">
        <div class="info-row">
          <span class="info-label">{{ t('lastWatered') }}</span>
          <span class="info-value">{{ plant.last_watered ? formatDateTime(plant.last_watered) : t('neverWatered') }}</span>
        </div>
        <div class="info-row" v-if="nextWateringDate">
          <span class="info-label">{{ t('nextWatering') }}</span>
          <span class="info-value" :class="{ 'urgent': needsWater }">{{ nextWateringDate }}</span>
        </div>
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
      <button class="button button-danger" @click="$emit('delete', plant)">
        {{ t('delete') }}
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Plant } from '@/types'
import { useTranslations } from '@/composables/useTranslations'
import { useUserPlantsStore } from '@/stores/userPlants'

const props = defineProps<{
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

const userPlantsStore = useUserPlantsStore()

const isRecentlyWatered = computed(() => {
  if (!props.plant.last_watered) return false
  const last = new Date(props.plant.last_watered).getTime()
  const now = new Date().getTime()
  return (now - last) < 60000 // Just watered if within 1 minute
})

const nextWateringDate = computed(() => {
  if (!props.plant.last_watered || props.plant.water_frequency === 'as-needed') return null

  const last = new Date(props.plant.last_watered)
  const daysToAdd = {
    'daily': 1,
    'every-2-days': 2,
    'twice-weekly': 3,
    'weekly': 7
  }[props.plant.water_frequency as string] || 0

  if (daysToAdd === 0) return null

  const next = new Date(last)
  next.setDate(last.getDate() + daysToAdd)
  return next.toLocaleDateString()
})

const needsWater = computed(() => {
  if (props.plant.status === 'harvested') return false
  if (!props.plant.last_watered) return true
  if (props.plant.water_frequency === 'as-needed') return false

  const last = new Date(props.plant.last_watered)
  const daysToAdd = {
    'daily': 1,
    'every-2-days': 2,
    'twice-weekly': 3,
    'weekly': 7
  }[props.plant.water_frequency as string] || 0

  const next = new Date(last)
  next.setDate(last.getDate() + daysToAdd)
  return new Date() > next
})

function handleWater() {
  userPlantsStore.waterPlant(props.plant)
}

function formatDate(dateString: string): string {
  if (!dateString) return '—'
  const date = new Date(dateString)
  return date.toLocaleDateString()
}

function formatDateTime(dateString: string): string {
  const date = new Date(dateString)
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
}
</script>

<style scoped>
.plant-card {
  background: var(--seasonal-card);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  border: 2px solid transparent;
}

.plant-card.needs-water {
  border-color: rgba(59, 130, 246, 0.3);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
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
  border-bottom: 2px solid rgba(0, 0, 0, 0.05);
  padding-bottom: 1rem;
}

.header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.75rem;
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

.info-value.urgent {
  color: #ef4444;
  font-weight: 700;
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

.watering-details {
  margin: 0.75rem 0;
  padding: 0.75rem;
  background: rgba(59, 130, 246, 0.05);
  border-radius: 8px;
  border-left: 3px solid var(--seasonal-primary);
}

.water-pill {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  background: white;
  border: 1.5px solid var(--seasonal-primary);
  color: var(--seasonal-primary);
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.water-pill:hover {
  background: var(--seasonal-primary);
  color: white;
}

.water-pill.just-watered {
  background: #10b981;
  border-color: #10b981;
  color: white;
  pointer-events: none;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
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

.button-secondary {
  background: rgba(var(--seasonal-text-rgb), 0.1);
  color: var(--seasonal-text);
}

.button-secondary:hover {
  background: rgba(var(--seasonal-text-rgb), 0.2);
}

.button-danger {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.button-danger:hover {
  background: #ef4444;
  color: white;
}
</style>
