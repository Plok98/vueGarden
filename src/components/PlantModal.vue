<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  editingPlant: Object,
  t: Function,
  translateSunRequirement: Function,
  translateWaterFrequency: Function,
  blankPlant: Function
})

const emit = defineEmits(['close', 'save'])

const plantForm = reactive(props.blankPlant())

watch(() => props.editingPlant, (newPlant) => {
  if (newPlant) {
    Object.assign(plantForm, newPlant)
  } else {
    Object.assign(plantForm, props.blankPlant())
  }
}, { immediate: true })

const handleSave = () => {
  emit('save', { ...plantForm })
}
</script>

<template>
  <div id="plant-modal" class="modal" :class="{ active: show }" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2>{{ editingPlant ? t('editPlantTitle') : t('addNewPlantTitle') }}</h2>
        <button class="close-button" id="close-modal" @click="$emit('close')">×</button>
      </div>
      <form id="plant-form" @submit.prevent="handleSave">
        <div class="form-row">
          <div class="form-group">
            <label for="plant-name">{{ t('plantName') }}</label>
            <input id="plant-name" v-model="plantForm.name" required />
          </div>
          <div class="form-group">
            <label for="plant-type">{{ t('type') }}</label>
            <select id="plant-type" v-model="plantForm.type">
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
            <input type="date" id="planting-date" v-model="plantForm.planting_date" />
          </div>
          <div class="form-group">
            <label for="harvest-date">{{ t('expectedHarvest') }}</label>
            <input type="date" id="harvest-date" v-model="plantForm.harvest_date" />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="sun-requirement">{{ t('sunRequirement') }}</label>
            <select id="sun-requirement" v-model="plantForm.sun_requirement">
              <option value="full-sun">{{ translateSunRequirement('full-sun') }}</option>
              <option value="partial-sun">{{ translateSunRequirement('partial-sun') }}</option>
              <option value="partial-shade">{{ translateSunRequirement('partial-shade') }}</option>
              <option value="full-shade">{{ translateSunRequirement('full-shade') }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="water-frequency">{{ t('waterFrequency') }}</label>
            <select id="water-frequency" v-model="plantForm.water_frequency">
              <option value="daily">{{ translateWaterFrequency('daily') }}</option>
              <option value="every-2-days">{{ translateWaterFrequency('every-2-days') }}</option>
              <option value="twice-weekly">{{ translateWaterFrequency('twice-weekly') }}</option>
              <option value="weekly">{{ translateWaterFrequency('weekly') }}</option>
              <option value="as-needed">{{ translateWaterFrequency('as-needed') }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="plant-status">{{ t('status') }}</label>
            <select id="plant-status" v-model="plantForm.status">
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
          <textarea id="plant-notes" v-model="plantForm.notes" :placeholder="t('notesPlaceholder')"></textarea>
        </div>

        <div class="form-actions">
          <button type="button" class="button button-secondary" id="cancel-btn" @click="$emit('close')">
            {{ t('cancel') }}
          </button>
          <button type="submit" class="button button-primary" id="submit-btn">
            <span id="submit-text">{{ editingPlant ? t('saveChanges') : t('addPlant') }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
