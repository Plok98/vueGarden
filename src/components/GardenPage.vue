<script setup>
defineProps({
  t: Function,
  plantFilter: String,
  filteredPlants: Array,
  translatePlantType: Function,
  translateStatus: Function,
  translateSunRequirement: Function,
  translateWaterFrequency: Function,
  formatDate: Function
})

defineEmits(['open-add-modal', 'open-plant-database', 'update:plantFilter', 'delete-plant'])
</script>

<template>
  <div id="my-garden" class="page">
    <header class="header">
      <h1>{{ t('myGardenTitle') }}</h1>
      <p>{{ t('myGardenSubtitle') }}</p>
    </header>

    <div class="controls">
      <div class="button-group">
        <button class="button button-primary add-button" id="add-plant-btn" @click="$emit('open-add-modal')">
          <span id="add-button-text">{{ t('addNewPlant') }}</span>
        </button>
        <button class="button button-secondary" id="browse-plants-btn" @click="$emit('open-plant-database')">
          <span id="browse-button-text">🌿 {{ t('browseDatabase') }}</span>
        </button>
      </div>
      <div class="filter-controls">
        <span class="filter-label">{{ t('filterBy') }}</span>
        <div class="filter-buttons">
          <button
            class="filter-chip"
            :class="{ active: plantFilter === 'all' }"
            @click="$emit('update:plantFilter', 'all')"
          >
            {{ t('all') }}
          </button>
          <button
            class="filter-chip"
            :class="{ active: plantFilter === 'planning' }"
            @click="$emit('update:plantFilter', 'planning')"
          >
            {{ t('planning') }}
          </button>
          <button
            class="filter-chip"
            :class="{ active: plantFilter === 'planted' }"
            @click="$emit('update:plantFilter', 'planted')"
          >
            {{ t('planted') }}
          </button>
          <button
            class="filter-chip"
            :class="{ active: plantFilter === 'growing' }"
            @click="$emit('update:plantFilter', 'growing')"
          >
            {{ t('growing') }}
          </button>
          <button
            class="filter-chip"
            :class="{ active: plantFilter === 'ready' }"
            @click="$emit('update:plantFilter', 'ready')"
          >
            {{ t('ready') }}
          </button>
        </div>
      </div>
    </div>

    <div class="plant-grid" id="plant-grid">
      <div v-if="filteredPlants.length === 0" class="empty-state">
        <div class="empty-state-icon">🌱</div>
        <h3>{{ t('noPlantsTitle') }}</h3>
        <p>{{ t('noPlantsMessage') }}</p>
      </div>

      <article v-for="plant in filteredPlants" :key="plant.id" class="plant-card">
        <div class="plant-card-header">
          <div>
            <div class="plant-emoji">🌱</div>
            <h3>{{ plant.name }}</h3>
            <p class="info-label">{{ translatePlantType(plant.type) }}</p>
          </div>
          <span class="status-badge" :class="plant.status">{{ translateStatus(plant.status) }}</span>
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
          <div v-if="plant.harvest_date" class="info-row">
            <span class="info-label">{{ t('expectedHarvest') }}</span>
            <span class="info-value">{{ formatDate(plant.harvest_date) }}</span>
          </div>
        </div>
        <div class="card-actions">
          <button class="button button-secondary" @click="$emit('open-add-modal', plant)">{{ t('edit') }}</button>
          <button class="button button-primary" @click="$emit('delete-plant', plant)">{{ t('delete') }}</button>
        </div>
      </article>
    </div>
  </div>
</template>
