// Shared TypeScript interfaces for the Garden Planner app

export interface SeasonalPalette {
  background_color: string
  card_color: string
  text_color: string
  primary_action_color: string
  secondary_action_color: string
}

export interface Plant {
  id: string
  data_type: 'plant'
  name: string
  type: string
  variety: string
  planting_date: string
  harvest_date: string
  storage_date: string
  days_to_maturity: string | number
  planting_depth: string
  spacing: string
  sun_requirement: string
  water_frequency: string
  soil_type: string
  notes: string
  status: string
  last_watered?: string
  created_at: string
}

export interface UserProfile {
  data_type: 'profile'
  id: string
  name: string
  email: string
  location: string
  experience: string
  garden_size: string
  bio: string
}

export type DataItem = Plant | UserProfile

export interface AppConfig {
  app_title: string
  subtitle: string
  add_button_text: string
  current_language: string
  background_color: string
  card_color: string
  text_color: string
  primary_action_color: string
  secondary_action_color: string
  font_family: string
  font_size: number
}

export interface TranslationSet {
  [key: string]: string
}

export interface Translations {
  en: TranslationSet
  nl: TranslationSet
}

export interface CareTip {
  title: { en: string; nl: string }
  body: { en: string; nl: string }
}

export interface PlantTemplate {
  name: string
  nameDutch: string
  scientific: string
  emoji: string
  type: string
  daysToMaturity: number
  sunRequirement: string
  waterFrequency: string
  soilType: string
  spacing: string
  plantingDepth: string
  plantingStartDate: string
  plantingEndDate: string
}

export interface DataSdk {
  create: (payload: Plant | UserProfile) => Promise<{ isOk: boolean } | undefined>
  update: (payload: Plant | UserProfile) => Promise<{ isOk: boolean } | undefined>
  delete: (payload: Plant) => Promise<{ isOk: boolean } | undefined>
  init: (config: {
    onDataChanged: (data: DataItem[]) => void
  }) => Promise<{ isOk: boolean } | undefined>
}

export interface ElementSdk {
  init: (config: {
    defaultConfig: AppConfig
    onConfigChange: (c: Partial<AppConfig>) => void
    mapToCapabilities: (c: Partial<AppConfig>) => unknown
    mapToEditPanelValues: (c: Partial<AppConfig>) => unknown
  }) => void
  setConfig: (config: Partial<AppConfig>) => void
}

// Augment global Window interface
declare global {
  interface Window {
    dataSdk?: DataSdk
    elementSdk?: ElementSdk
  }
}

export interface Insight {
  icon: string
  title: string
  content: string
  type?: string
  plants?: string[]
}

export type Language = 'en' | 'nl'
