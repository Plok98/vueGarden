<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import Navigation from './components/Navigation.vue'
import DiscoverPage from './components/DiscoverPage.vue'
import GardenPage from './components/GardenPage.vue'
import PastPlantsPage from './components/PastPlantsPage.vue'
import ProfilePage from './components/ProfilePage.vue'
import PlantModal from './components/PlantModal.vue'
import DatabaseModal from './components/DatabaseModal.vue'
import ProfileModal from './components/ProfileModal.vue'

import {
  translations,
  sunTranslations,
  waterTranslations,
  statusTranslations,
  careTips
} from './translations'
import { plantDatabase } from './plantDatabase'

// --- Seasonal Logic ---
function getSeasonalColors() {
  const now = new Date()
  const year = now.getFullYear()
  const springEquinox = new Date(year, 2, 20)
  const summerSolstice = new Date(year, 5, 21)
  const fallEquinox = new Date(year, 8, 22)
  const winterSolstice = new Date(year, 11, 21)

  let season = 'winter'
  if (now >= springEquinox && now < summerSolstice) season = 'spring'
  else if (now >= summerSolstice && now < fallEquinox) season = 'summer'
  else if (now >= fallEquinox && now < winterSolstice) season = 'fall'

  const seasonalPalettes = {
    spring: {
      background_color: '#22c55e',
      card_color: '#ffffff',
      text_color: '#1f2937',
      primary_action_color: '#eab308',
      secondary_action_color: '#84cc16'
    },
    summer: {
      background_color: '#eab308',
      card_color: '#ffffff',
      text_color: '#1f2937',
      primary_action_color: '#dc2626',
      secondary_action_color: '#f97316'
    },
    fall: {
      background_color: '#dc2626',
      card_color: '#ffffff',
      text_color: '#1f2937',
      primary_action_color: '#ea580c',
      secondary_action_color: '#d97706'
    },
    winter: {
      background_color: '#1e40af',
      card_color: '#f8fafc',
      text_color: '#1e293b',
      primary_action_color: '#0ea5e9',
      secondary_action_color: '#3b82f6'
    }
  }

  return { season, colors: seasonalPalettes[season] }
}

const { season: currentSeason, colors: seasonalColors } = getSeasonalColors()

const defaultConfig = {
  app_title: 'My Garden Planner',
  subtitle: 'Track your plants from seed to harvest',
  add_button_text: '+ Add New Plant',
  current_language: 'English',
  background_color: seasonalColors.background_color,
  card_color: seasonalColors.card_color,
  text_color: seasonalColors.text_color,
  primary_action_color: seasonalColors.primary_action_color,
  secondary_action_color: seasonalColors.secondary_action_color,
  font_family: 'sans-serif',
  font_size: 16
}

// --- State ---
const config = reactive({ ...defaultConfig })
const currentPage = ref('discover')
const language = ref('en')
const plantFilter = ref('all')
const pastFilter = ref('all')
const plants = ref([])
const userProfile = reactive({
  data_type: 'profile',
  id: null,
  name: '',
  email: '',
  location: '',
  experience: '',
  garden_size: '',
  bio: ''
})

const showPlantModal = ref(false)
const showDatabaseModal = ref(false)
const showProfileModal = ref(false)
const editingPlantId = ref(null)

const tipIndex = ref(0) // Logic for tip could be randomized later

// --- Helpers ---
const blankPlant = () => ({
  id: '',
  data_type: 'plant',
  name: '',
  type: 'vegetable',
  variety: '',
  planting_date: '',
  harvest_date: '',
  storage_date: '',
  days_to_maturity: '',
  planting_depth: '',
  spacing: '',
  sun_requirement: 'full-sun',
  water_frequency: 'daily',
  soil_type: '',
  notes: '',
  status: 'planning',
  created_at: ''
})

const t = (key) => translations[language.value][key] || translations.en[key] || key

const navLinks = [
  { id: 'discover', label: 'discover', icon: '🌿' },
  { id: 'my-garden', label: 'myGarden', icon: '🌱' },
  { id: 'past-plants', label: 'pastPlants', icon: '📚' },
  { id: 'profile', label: 'profile', icon: '👤' }
]

// --- Computed ---
const activePlants = computed(() => plants.value.filter((p) => p.status !== 'harvested'))
const filteredPlants = computed(() =>
  plants.value.filter(
    (p) => p.status !== 'harvested' && (plantFilter.value === 'all' || p.status === plantFilter.value)
  )
)
const filteredPastPlants = computed(() =>
  plants.value.filter(
    (p) => p.status === 'harvested' && (pastFilter.value === 'all' || p.type === pastFilter.value)
  )
)

const stats = computed(() => {
  const harvested = plants.value.filter((p) => p.status === 'harvested').length
  const active = plants.value.filter((p) => p.status !== 'harvested').length
  const varieties = new Set(plants.value.map((p) => p.name.toLowerCase())).size
  return { total: plants.value.length, active, harvested, varieties }
})

const editingPlant = computed(() => plants.value.find((p) => p.id === editingPlantId.value) || null)

const dailyTip = computed(() => {
  if (!activePlants.value.length) return null
  const tip = careTips[tipIndex.value % careTips.length]
  return {
    title: tip.title[language.value] || tip.title.en,
    body: tip.body[language.value] || tip.body.en
  }
})

const discoverInsights = computed(() => {
  const insights = []
  const active = activePlants.value
  if (!active.length) return insights

  const waterNeeding = active.filter((p) => p.water_frequency === 'daily')
  if (waterNeeding.length) {
    insights.push({
      icon: '💧',
      title: language.value === 'nl' ? 'Dagelijks water geven' : 'Daily watering',
      content:
        language.value === 'nl'
          ? `${waterNeeding.length} plant(en) hebben vandaag water nodig.`
          : `${waterNeeding.length} plant(s) need watering today.`,
      plants: waterNeeding.slice(0, 4).map((p) => p.name)
    })
  }

  const readySoon = active.filter((p) => p.harvest_date).slice(0, 3)
  if (readySoon.length) {
    insights.push({
      icon: '📅',
      title: language.value === 'nl' ? 'Komende oogst' : 'Upcoming harvests',
      content: readySoon
        .map((p) => `${p.name} → ${formatDate(p.harvest_date)}`)
        .join(' • '),
      plants: readySoon.map((p) => p.name)
    })
  }

  const spaceTip =
    language.value === 'nl'
      ? 'Gebruik verticale steunen voor bonen en tomaten om ruimte te besparen.'
      : 'Use vertical supports for beans and tomatoes to save space.'
  insights.push({
    icon: '🎯',
    title: language.value === 'nl' ? 'Ruimtebesparing' : 'Space saver',
    content: spaceTip
  })

  return insights
})

// --- Methods ---
const switchLanguage = () => {
  language.value = language.value === 'en' ? 'nl' : 'en'
}

const translateSunRequirement = (value) => sunTranslations[value]?.[language.value] || value
const translateWaterFrequency = (value) => waterTranslations[value]?.[language.value] || value
const translateStatus = (value) => statusTranslations[value]?.[language.value] || value

const translatePlantType = (type) => {
  const map = {
    vegetable: t('vegetable'),
    fruit: t('fruit'),
    plant: t('plant'),
    tree: t('tree'),
    herb: t('herbs'),
    flower: t('flowers')
  }
  return map[type] || type
}

const translateExperience = (value) => (value ? t(value) : '—')
const translateGardenSize = (value) => (value ? t(value) : '—')

const formatDate = (value) => {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString(language.value === 'nl' ? 'nl-NL' : 'en-US')
}

const openAddModal = (plant = null) => {
  if (plant) {
    editingPlantId.value = plant.id
  } else {
    editingPlantId.value = null
  }
  showPlantModal.value = true
}

const savePlant = async (payload) => {
  if (!payload.name) return
  const isUpdate = Boolean(editingPlantId.value)
  const fullPayload = {
    ...payload,
    id: payload.id || `plant-${Date.now()}`,
    data_type: 'plant',
    created_at: payload.created_at || new Date().toISOString()
  }

  const ok = await persistPlant(fullPayload, isUpdate)
  if (ok) {
    showPlantModal.value = false
    editingPlantId.value = null
  }
}

const persistPlant = async (payload, isUpdate) => {
  if (window.dataSdk) {
    const result = isUpdate ? await window.dataSdk.update(payload) : await window.dataSdk.create(payload)
    return result?.isOk
  }
  return true
}

const deletePlant = async (plant) => {
  if (window.dataSdk) {
    const result = await window.dataSdk.delete(plant)
    if (!result?.isOk) return
  }
  plants.value = plants.value.filter((p) => p.id !== plant.id)
}

const addPlantFromDatabase = async (template) => {
  const payload = {
    id: `plant-${Date.now()}`,
    data_type: 'plant',
    name: language.value === 'nl' ? template.nameDutch : template.name,
    type: template.type,
    variety: '',
    planting_date: '',
    harvest_date: '',
    storage_date: '',
    days_to_maturity: template.daysToMaturity,
    planting_depth: template.plantingDepth,
    spacing: template.spacing,
    sun_requirement: template.sunRequirement,
    water_frequency: template.waterFrequency,
    soil_type: template.soilType,
    notes:
      language.value === 'nl'
        ? `Toegevoegd uit plantendatabase. Wetenschappelijke naam: ${template.scientific}. Engels: ${template.name}`
        : `Added from plant database. Scientific name: ${template.scientific}. Dutch: ${template.nameDutch}`,
    status: 'planning',
    created_at: new Date().toISOString()
  }
  const ok = await persistPlant(payload, false)
  if (ok) {
    showDatabaseModal.value = false
  }
}

const saveProfile = async (payload) => {
  const fullPayload = { ...payload, data_type: 'profile' }
  if (window.dataSdk) {
    const result = payload.id ? await window.dataSdk.update(fullPayload) : await window.dataSdk.create(fullPayload)
    if (!result?.isOk) return
  }
  Object.assign(userProfile, fullPayload)
  showProfileModal.value = false
}

// --- SDK Integration ---
const onDataChanged = (data) => {
  plants.value = data.filter((item) => item.data_type !== 'profile')
  const profile = data.find((item) => item.data_type === 'profile')
  if (profile) Object.assign(userProfile, profile)
}

const setupDataSdk = async () => {
  if (!window.dataSdk) {
    seedDemoData()
    return
  }
  const result = await window.dataSdk.init({ onDataChanged: (data) => onDataChanged(data) })
  if (!result?.isOk) {
    seedDemoData()
  }
}

const setupElementSdk = () => {
  if (!window.elementSdk) return
  window.elementSdk.init({
    defaultConfig,
    onConfigChange: (newConfig) => {
      Object.assign(config, newConfig)
      const lang = newConfig.current_language || defaultConfig.current_language
      language.value = lang === 'English' ? 'en' : 'nl'
      applyConfigStyles()
    },
    mapToCapabilities: (cfg) => ({
      recolorables: [
        {
          get: () => cfg.background_color || defaultConfig.background_color,
          set: (val) => {
            cfg.background_color = val
            window.elementSdk.setConfig({ background_color: val })
          }
        },
        {
          get: () => cfg.card_color || defaultConfig.card_color,
          set: (val) => {
            cfg.card_color = val
            window.elementSdk.setConfig({ card_color: val })
          }
        },
        {
          get: () => cfg.text_color || defaultConfig.text_color,
          set: (val) => {
            cfg.text_color = val
            window.elementSdk.setConfig({ text_color: val })
          }
        },
        {
          get: () => cfg.primary_action_color || defaultConfig.primary_action_color,
          set: (val) => {
            cfg.primary_action_color = val
            window.elementSdk.setConfig({ primary_action_color: val })
          }
        },
        {
          get: () => cfg.secondary_action_color || defaultConfig.secondary_action_color,
          set: (val) => {
            cfg.secondary_action_color = val
            window.elementSdk.setConfig({ secondary_action_color: val })
          }
        }
      ],
      borderables: [],
      fontEditable: {
        get: () => cfg.font_family || defaultConfig.font_family,
        set: (val) => {
          cfg.font_family = val
          window.elementSdk.setConfig({ font_family: val })
        }
      },
      fontSizeable: {
        get: () => cfg.font_size || defaultConfig.font_size,
        set: (val) => {
          cfg.font_size = val
          window.elementSdk.setConfig({ font_size: val })
        }
      }
    }),
    mapToEditPanelValues: (cfg) =>
      new Map([
        ['app_title', cfg.app_title || defaultConfig.app_title],
        ['subtitle', cfg.subtitle || defaultConfig.subtitle],
        ['add_button_text', cfg.add_button_text || defaultConfig.add_button_text],
        ['current_language', cfg.current_language || defaultConfig.current_language]
      ])
  })
}

const applyConfigStyles = () => {
  document.body.style.background = `linear-gradient(135deg, ${config.background_color} 0%, ${config.secondary_action_color} 100%)`
  document.documentElement.style.setProperty('--seasonal-card', config.card_color)
  document.documentElement.style.setProperty('--seasonal-text', config.text_color)
}

const seedDemoData = () => {
  if (plants.value.length) return
  plants.value = plantDatabase.slice(0, 4).map((plant, idx) => ({
    id: `seed-${idx}`,
    data_type: 'plant',
    name: plant.name,
    type: plant.type,
    planting_date: new Date().toISOString().slice(0, 10),
    harvest_date: '',
    storage_date: '',
    sun_requirement: plant.sunRequirement,
    water_frequency: plant.waterFrequency,
    notes: '',
    status: 'planning',
    created_at: new Date().toISOString()
  }))
}

onMounted(() => {
  document.body.className = `seasonal-${currentSeason}`
  applyConfigStyles()
  setupDataSdk()
  setupElementSdk()
})
</script>

<template>
  <div class="app-container">
    <Navigation
      :config="config"
      :currentPage="currentPage"
      :navLinks="navLinks"
      :t="t"
      @set-page="currentPage = $event"
      @switch-language="switchLanguage"
    />

    <main class="main-content">
      <div class="container">
        <DiscoverPage
          v-if="currentPage === 'discover'"
          :t="t"
          :activePlants="activePlants"
          :dailyTip="dailyTip"
          :discoverInsights="discoverInsights"
        />

        <GardenPage
          v-if="currentPage === 'my-garden'"
          v-model:plantFilter="plantFilter"
          :t="t"
          :filteredPlants="filteredPlants"
          :translatePlantType="translatePlantType"
          :translateStatus="translateStatus"
          :translateSunRequirement="translateSunRequirement"
          :translateWaterFrequency="translateWaterFrequency"
          :formatDate="formatDate"
          @open-add-modal="openAddModal"
          @open-plant-database="showDatabaseModal = true"
          @delete-plant="deletePlant"
        />

        <PastPlantsPage
          v-if="currentPage === 'past-plants'"
          v-model:pastFilter="pastFilter"
          :t="t"
          :filteredPastPlants="filteredPastPlants"
          :translatePlantType="translatePlantType"
          :translateStatus="translateStatus"
          :formatDate="formatDate"
        />

        <ProfilePage
          v-if="currentPage === 'profile'"
          :t="t"
          :userProfile="userProfile"
          :translateExperience="translateExperience"
          :translateGardenSize="translateGardenSize"
          :stats="stats"
          @open-profile-modal="showProfileModal = true"
        />
      </div>
    </main>

    <PlantModal
      :show="showPlantModal"
      :editingPlant="editingPlant"
      :t="t"
      :translateSunRequirement="translateSunRequirement"
      :translateWaterFrequency="translateWaterFrequency"
      :blankPlant="blankPlant"
      @close="showPlantModal = false"
      @save="savePlant"
    />

    <DatabaseModal
      :show="showDatabaseModal"
      :t="t"
      :language="language"
      :translatePlantType="translatePlantType"
      :translateSunRequirement="translateSunRequirement"
      :translateWaterFrequency="translateWaterFrequency"
      @close="showDatabaseModal = false"
      @add-plant="addPlantFromDatabase"
    />

    <ProfileModal
      :show="showProfileModal"
      :t="t"
      :userProfile="userProfile"
      @close="showProfileModal = false"
      @save="saveProfile"
    />
  </div>
</template>

<style>
/* Global styles are in styles.scss */
</style>
