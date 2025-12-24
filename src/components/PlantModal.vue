<template>
  <div class="modal" :class="{ active: isOpen }" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2>{{ isEditing ? t('editPlantTitle') : t('addNewPlantTitle') }}</h2>
        <button class="close-button" @click="$emit('close')">×</button>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="form-row">
          <div class="form-group">
            <label for="plant-name">{{ t('plantName') }}</label>
            <input id="plant-name" v-model="form.name" required>
          </div>
          <div class="form-group">
            <label for="plant-type">{{ t('type') }}</label>
            <select id="plant-type" v-model="form.type">
              <option value="vegetable">{{ t('vegetable') }}</option>
              <option value="fruit">{{ t('fruit') }}</option>
              <option value="plant">{{ t('plant') }}</option>
              <option value="tree">{{ t('tree') }}</option>
              <option value="herb">{{ t('herbs') }}</option>
              <option value="flower">{{ t('flowers') }}</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="planting-date">{{ t('plantingDate') }}</label>
            <input type="date" id="planting-date" v-model="form.planting_date">
          </div>
          <div class="form-group">
            <label for="harvest-date">{{ t('expectedHarvest') }}</label>
            <input type="date" id="harvest-date" v-model="form.harvest_date">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="sun-requirement">{{ t('sunRequirement') }}</label>
            <select id="sun-requirement" v-model="form.sun_requirement">
              <option value="full-sun">{{ translateSunRequirement('full-sun') }}</option>
              <option value="partial-sun">{{ translateSunRequirement('partial-sun') }}</option>
              <option value="partial-shade">{{ translateSunRequirement('partial-shade') }}</option>
              <option value="full-shade">{{ translateSunRequirement('full-shade') }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="water-frequency">{{ t('waterFrequency') }}</label>
            <select id="water-frequency" v-model="form.water_frequency">
              <option value="daily">{{ translateWaterFrequency('daily') }}</option>
              <option value="every-2-days">{{ translateWaterFrequency('every-2-days') }}</option>
              <option value="twice-weekly">{{ translateWaterFrequency('twice-weekly') }}</option>
              <option value="weekly">{{ translateWaterFrequency('weekly') }}</option>
              <option value="as-needed">{{ translateWaterFrequency('as-needed') }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="plant-status">{{ t('status') }}</label>
            <select id="plant-status" v-model="form.status">
              <option value="planning">{{ t('planning') }}</option>
              <option value="planted">{{ t('planted') }}</option>
              <option value="growing">{{ t('growing') }}</option>
              <option value="ready">{{ t('ready') }}</option>
              <option value="harvested">{{ t('harvested') }}</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label for="plant-notes">{{ t('notes') }}</label>
          <textarea id="plant-notes" v-model="form.notes" :placeholder="t('notesPlaceholder')"></textarea>
        </div>

        <div class="form-actions">
          <button type="button" class="button button-secondary" @click="$emit('close')">
            {{ t('cancel') }}
          </button>
          <button type="submit" class="button button-primary">
            {{ isEditing ? t('saveChanges') : t('addPlant') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { Plant } from '@/types'
import { useTranslations } from '@/composables/useTranslations'
import { useUserPlantsStore } from '@/stores/userPlants'

const props = defineProps<{
  isOpen: boolean
  plant?: Plant | null
}>()

const emit = defineEmits<{
  close: []
  saved: [plant: Plant]
}>()

const { t, translateSunRequirement, translateWaterFrequency } = useTranslations()
const userPlantsStore = useUserPlantsStore()

const isEditing = computed(() => !!props.plant?.id)

const form = reactive<Plant>(userPlantsStore.createBlankPlant())

watch(() => props.plant, (newPlant) => {
  if (newPlant) {
    Object.assign(form, newPlant)
  } else {
    Object.assign(form, userPlantsStore.createBlankPlant())
  }
}, { immediate: true })

import { computed } from 'vue'

async function handleSubmit() {
  const plantData = { ...form }

  if (isEditing.value) {
    await userPlantsStore.updatePlant(plantData)
  } else {
    await userPlantsStore.addPlant(plantData)
  }

  emit('saved', plantData)
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
  max-width: 600px;
  width: 100%;
  max-height: 90%;
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

.close-button:hover {
  opacity: 1;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--seasonal-text);
  font-size: 0.875rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid rgba(var(--seasonal-text-rgb), 0.2);
  border-radius: 8px;
  font-size: 0.875rem;
  font-family: inherit;
  transition: border-color 0.2s;
  background: var(--seasonal-card);
  color: var(--seasonal-text);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--seasonal-primary);
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 2px solid #f3f4f6;
}

.button {
  padding: 0.75rem 1.5rem;
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

.button-secondary {
  background: rgba(var(--seasonal-text-rgb), 0.1);
  color: var(--seasonal-text);
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
