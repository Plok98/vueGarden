import { ref, computed } from 'vue'
import type { Language } from '@/types'
import {
  translations,
  sunTranslations,
  waterTranslations,
  statusTranslations,
  typeTranslations,
  experienceTranslations,
  gardenSizeTranslations,
  careTips,
} from '@/i18n'

// Shared state
const language = ref<Language>('nl')

export function useTranslations() {
  const t = (key: string): string => {
    return translations[language.value][key] || key
  }

  const translateSunRequirement = (value: string): string => {
    return sunTranslations[value]?.[language.value] || value
  }

  const translateWaterFrequency = (value: string): string => {
    return waterTranslations[value]?.[language.value] || value
  }

  const translateStatus = (value: string): string => {
    return statusTranslations[value]?.[language.value] || value
  }

  const translatePlantType = (value: string): string => {
    return typeTranslations[value]?.[language.value] || value
  }

  const translateExperience = (value: string): string => {
    return experienceTranslations[value]?.[language.value] || value
  }

  const translateGardenSize = (value: string): string => {
    return gardenSizeTranslations[value]?.[language.value] || value
  }

  const switchLanguage = () => {
    language.value = language.value === 'en' ? 'nl' : 'en'
  }

  const dailyTip = computed(() => {
    const dayIndex = new Date().getDate() % careTips.length
    const tip = careTips[dayIndex] ?? careTips[0]!
    return {
      title: tip!.title[language.value],
      body: tip!.body[language.value],
    }
  })

  return {
    language,
    t,
    translateSunRequirement,
    translateWaterFrequency,
    translateStatus,
    translatePlantType,
    translateExperience,
    translateGardenSize,
    switchLanguage,
    dailyTip,
    careTips,
  }
}
