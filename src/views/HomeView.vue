<template>
  <div class="app-container" :class="seasonClass">
    <AppNavigation
      :current-page="currentPage"
      @navigate="setPage"
    />

    <main class="main-content">
      <div class="container">
        <DiscoverPage v-show="currentPage === 'discover'" />

        <MyGardenPage
          v-show="currentPage === 'my-garden'"
          @open-plant-modal="openPlantModal()"
          @open-database-modal="showDatabaseModal = true"
          @edit-plant="openPlantModal($event)"
        />

        <PlantOverviewPage
          v-show="currentPage === 'plant-overview'"
          @select-from-database="addPlantFromDatabase"
        />

        <DashboardPage
          v-show="currentPage === 'dashboard'"
          @edit-profile="showProfileModal = true"
        />
      </div>
    </main>

    <PlantModal
      :is-open="showPlantModal"
      :plant="editingPlant"
      @close="closePlantModal"
      @saved="onPlantSaved"
    />

    <PlantDatabaseModal
      :is-open="showDatabaseModal"
      @close="showDatabaseModal = false"
      @select="addPlantFromDatabase"
    />

    <ProfileModal
      :is-open="showProfileModal"
      @close="showProfileModal = false"
      @saved="showProfileModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Plant, PlantTemplate } from '@/types'

// Components
import AppNavigation from '@/components/AppNavigation.vue'
import PlantModal from '@/components/PlantModal.vue'
import PlantDatabaseModal from '@/components/PlantDatabaseModal.vue'
import ProfileModal from '@/components/ProfileModal.vue'

// Pages
import DiscoverPage from '@/views/DiscoverPage.vue'
import MyGardenPage from '@/views/MyGardenPage.vue'
import PlantOverviewPage from '@/views/PlantOverviewPage.vue'
import DashboardPage from '@/views/DashboardPage.vue'

// Composables & Stores
import { useConfig } from '@/composables/useConfig'
import { useSdk } from '@/composables/useSdk'
import { useUserPlantsStore } from '@/stores/userPlants'

const { seasonClass } = useConfig()
const { initializeSdks } = useSdk()
const userPlantsStore = useUserPlantsStore()

// Navigation
const currentPage = ref('dashboard')

function setPage(page: string) {
  currentPage.value = page
}

// Modal states
const showPlantModal = ref(false)
const showDatabaseModal = ref(false)
const showProfileModal = ref(false)
const editingPlant = ref<Plant | null>(null)

function openPlantModal(plant?: Plant) {
  editingPlant.value = plant || null
  showPlantModal.value = true
}

function closePlantModal() {
  showPlantModal.value = false
  editingPlant.value = null
}

function onPlantSaved() {
  closePlantModal()
}

async function addPlantFromDatabase(template: PlantTemplate) {
  const newPlant: Plant = {
    id: '',
    data_type: 'plant',
    name: template.name ?? '',
    type: template.type ?? '',
    variety: '',
    planting_date: new Date().toISOString().split('T')[0],
    harvest_date: '',
    storage_date: '',
    days_to_maturity: String(template.daysToMaturity ?? 0),
    planting_depth: template.plantingDepth ?? '',
    spacing: template.spacing ?? '',
    sun_requirement: template.sunRequirement ?? '',
    water_frequency: template.waterFrequency ?? '',
    soil_type: template.soilType ?? '',
    notes: `Scientific name: ${template.scientific ?? ''}`,
    status: 'planning',
    created_at: new Date().toISOString()
  }

  await userPlantsStore.addPlant(newPlant)
  showDatabaseModal.value = false
}

// Initialize on mount
onMounted(async () => {
  await initializeSdks()
})
</script>

<style>
/* Global styles */
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}

body {
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: linear-gradient(135deg, var(--seasonal-background) 0%, var(--seasonal-background-secondary) 100%);
  min-height: 100%;
}

:root {
  --seasonal-background: #1e40af;
  --seasonal-background-secondary: #3b82f6;
  --seasonal-card: #f8fafc;
  --seasonal-text: #1e293b;
  --seasonal-primary: #0ea5e9;
  --seasonal-secondary: #3b82f6;
  --seasonal-primary-rgb: 14, 165, 233;
  --seasonal-secondary-rgb: 59, 130, 246;
  --seasonal-text-rgb: 30, 41, 59;
}

* {
  box-sizing: border-box;
}
</style>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 2rem;
}

.container {
  width: 100%;
  padding: 0 2rem;
}

/* Seasonal themes */
.seasonal-spring {
  --seasonal-background: #22c55e;
  --seasonal-background-secondary: #84cc16;
  --seasonal-card: #ffffff;
  --seasonal-text: #1f2937;
  --seasonal-primary: #eab308;
  --seasonal-secondary: #84cc16;
  --seasonal-primary-rgb: 234, 179, 8;
  --seasonal-secondary-rgb: 132, 204, 22;
  --seasonal-text-rgb: 31, 41, 55;
}

.seasonal-summer {
  --seasonal-background: #eab308;
  --seasonal-background-secondary: #f97316;
  --seasonal-card: #ffffff;
  --seasonal-text: #1f2937;
  --seasonal-primary: #dc2626;
  --seasonal-secondary: #f97316;
  --seasonal-primary-rgb: 220, 38, 38;
  --seasonal-secondary-rgb: 249, 115, 22;
  --seasonal-text-rgb: 31, 41, 55;
}

.seasonal-fall {
  --seasonal-background: #dc2626;
  --seasonal-background-secondary: #d97706;
  --seasonal-card: #ffffff;
  --seasonal-text: #1f2937;
  --seasonal-primary: #ea580c;
  --seasonal-secondary: #d97706;
  --seasonal-primary-rgb: 234, 88, 12;
  --seasonal-secondary-rgb: 217, 119, 6;
  --seasonal-text-rgb: 31, 41, 55;
}

.seasonal-winter {
  --seasonal-background: #1e40af;
  --seasonal-background-secondary: #3b82f6;
  --seasonal-card: #f8fafc;
  --seasonal-text: #1e293b;
  --seasonal-primary: #0ea5e9;
  --seasonal-secondary: #3b82f6;
  --seasonal-primary-rgb: 14, 165, 233;
  --seasonal-secondary-rgb: 59, 130, 246;
  --seasonal-text-rgb: 30, 41, 59;
}

@media (max-width: 1024px) {
  .container {
    padding: 0 1.5rem;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
    padding-bottom: 6rem;
  }

  .container {
    padding: 0 1rem;
  }
}
</style>
