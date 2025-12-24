import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Plant, UserProfile, DataItem } from '@/types'

export const useUserPlantsStore = defineStore('userPlants', () => {
  const allData = ref<DataItem[]>([])
  const isLoading = ref(false)

  const plants = computed(() =>
    allData.value.filter((item): item is Plant => item.data_type === 'plant'),
  )

  const userProfile = computed(
    () =>
      allData.value.find((item): item is UserProfile => item.data_type === 'profile') ||
      createDefaultProfile(),
  )

  const activePlants = computed(() => plants.value.filter((p) => p.status !== 'harvested'))

  const harvestedPlants = computed(() => plants.value.filter((p) => p.status === 'harvested'))

  const stats = computed(() => ({
    total: plants.value.length,
    active: activePlants.value.length,
    harvested: harvestedPlants.value.length,
    varieties: new Set(plants.value.map((p) => p.type)).size,
  }))

  function createDefaultProfile(): UserProfile {
    return {
      data_type: 'profile',
      id: 'profile-1',
      name: '',
      email: '',
      location: '',
      experience: '',
      garden_size: '',
      bio: '',
    }
  }

  function createBlankPlant(): Plant {
    return {
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
      last_watered: '',
      created_at: new Date().toISOString(),
    }
  }

  function setAllData(data: DataItem[]) {
    allData.value = data
  }

  async function addPlant(plant: Plant) {
    if (!plant.id) {
      plant.id = `plant-${Date.now()}`
    }
    plant.created_at = new Date().toISOString()
    plant.last_watered = ''

    const result = await window.dataSdk?.create(plant)
    if (result?.isOk) {
      allData.value.push(plant)
    }
    return result
  }

  async function updatePlant(plant: Plant) {
    const result = await window.dataSdk?.update(plant)
    if (result?.isOk) {
      const index = allData.value.findIndex((p) => p.id === plant.id)
      if (index !== -1) {
        allData.value[index] = { ...plant }
      }
    }
    return result
  }

  async function waterPlant(plant: Plant) {
    const updatedPlant = {
      ...plant,
      last_watered: new Date().toISOString(),
    }
    return await updatePlant(updatedPlant)
  }

  async function deletePlant(plant: Plant) {
    const result = await window.dataSdk?.delete(plant)
    if (result?.isOk) {
      allData.value = allData.value.filter((p) => p.id !== plant.id)
    }
    return result
  }

  async function saveProfile(profile: UserProfile) {
    const existingProfile = allData.value.find((item) => item.data_type === 'profile')
    if (existingProfile) {
      const result = await window.dataSdk?.update(profile)
      if (result?.isOk) {
        const index = allData.value.findIndex((p) => p.id === profile.id)
        if (index !== -1) {
          allData.value[index] = profile
        }
      }
      return result
    } else {
      const result = await window.dataSdk?.create(profile)
      if (result?.isOk) {
        allData.value.push(profile)
      }
      return result
    }
  }

  function getPlantsByStatus(status: string) {
    if (status === 'all') return plants.value
    return plants.value.filter((p) => p.status === status)
  }

  function getPlantsByType(type: string) {
    if (type === 'all') return plants.value
    return plants.value.filter((p) => p.type === type)
  }

  return {
    allData,
    plants,
    userProfile,
    activePlants,
    harvestedPlants,
    stats,
    isLoading,
    setAllData,
    addPlant,
    updatePlant,
    waterPlant,
    deletePlant,
    saveProfile,
    createBlankPlant,
    getPlantsByStatus,
    getPlantsByType,
  }
})
