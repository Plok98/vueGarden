import { ref, computed } from 'vue'
import type { AppConfig, SeasonalPalette } from '@/types'

function getSeasonalColors(): {
  season: 'spring' | 'summer' | 'fall' | 'winter'
  colors: SeasonalPalette
} {
  const now = new Date()
  const year = now.getFullYear()
  const springEquinox = new Date(year, 2, 20)
  const summerSolstice = new Date(year, 5, 21)
  const fallEquinox = new Date(year, 8, 22)
  const winterSolstice = new Date(year, 11, 21)

  let season: 'spring' | 'summer' | 'fall' | 'winter' = 'winter'
  if (now >= springEquinox && now < summerSolstice) season = 'spring'
  else if (now >= summerSolstice && now < fallEquinox) season = 'summer'
  else if (now >= fallEquinox && now < winterSolstice) season = 'fall'

  const seasonalPalettes: Record<'spring' | 'summer' | 'fall' | 'winter', SeasonalPalette> = {
    spring: {
      background_color: '#22c55e',
      card_color: '#ffffff',
      text_color: '#1f2937',
      primary_action_color: '#eab308',
      secondary_action_color: '#84cc16',
    },
    summer: {
      background_color: '#eab308',
      card_color: '#ffffff',
      text_color: '#1f2937',
      primary_action_color: '#dc2626',
      secondary_action_color: '#f97316',
    },
    fall: {
      background_color: '#dc2626',
      card_color: '#ffffff',
      text_color: '#1f2937',
      primary_action_color: '#ea580c',
      secondary_action_color: '#d97706',
    },
    winter: {
      background_color: '#1e40af',
      card_color: '#f8fafc',
      text_color: '#1e293b',
      primary_action_color: '#0ea5e9',
      secondary_action_color: '#3b82f6',
    },
  }

  return { season, colors: seasonalPalettes[season] }
}

const { season: currentSeason, colors: seasonalColors } = getSeasonalColors()

const defaultConfig: AppConfig = {
  app_title: 'Groenboek',
  subtitle: 'Track your plants from seed to harvest',
  add_button_text: '+ Add New Plant',
  current_language: 'English',
  background_color: seasonalColors.background_color,
  card_color: seasonalColors.card_color,
  text_color: seasonalColors.text_color,
  primary_action_color: seasonalColors.primary_action_color,
  secondary_action_color: seasonalColors.secondary_action_color,
  font_family: 'sans-serif',
  font_size: 16,
}

const config = ref<AppConfig>({ ...defaultConfig })

export function useConfig() {
  const applyConfigStyles = () => {
    document.body.style.background = `linear-gradient(135deg, ${config.value.background_color} 0%, ${config.value.secondary_action_color} 100%)`
    document.body.style.fontFamily = config.value.font_family
    document.body.style.fontSize = `${config.value.font_size}px`

    const root = document.documentElement
    root.style.setProperty('--seasonal-background', config.value.background_color)
    root.style.setProperty('--seasonal-background-secondary', config.value.secondary_action_color)
    root.style.setProperty('--seasonal-card', config.value.card_color)
    root.style.setProperty('--seasonal-text', config.value.text_color)
    root.style.setProperty('--seasonal-primary', config.value.primary_action_color)
    root.style.setProperty('--seasonal-secondary', config.value.secondary_action_color)
  }

  const updateConfig = (newConfig: Partial<AppConfig>) => {
    config.value = { ...config.value, ...newConfig }
    applyConfigStyles()
  }

  const seasonClass = computed(() => `seasonal-${currentSeason}`)

  return {
    config,
    defaultConfig,
    currentSeason,
    seasonClass,
    applyConfigStyles,
    updateConfig,
  }
}
