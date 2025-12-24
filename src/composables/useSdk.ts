import { useUserPlantsStore } from '@/stores/userPlants'
import { useConfig } from '@/composables/useConfig'
import { useTranslations } from '@/composables/useTranslations'
import type { DataItem } from '@/types'

export function useSdk() {
  const userPlantsStore = useUserPlantsStore()
  const { config, defaultConfig, applyConfigStyles, updateConfig } = useConfig()
  const { language } = useTranslations()

  const onDataChanged = (data: DataItem[]) => {
    userPlantsStore.setAllData(data)
  }

  const onConfigChange = (c: Partial<typeof config.value>) => {
    updateConfig(c)
    const langChoice = c.current_language || defaultConfig.current_language
    language.value = langChoice === 'English' ? 'en' : 'nl'
  }

  const setupDataSdk = async () => {
    if (!window.dataSdk) {
      // Seed demo data if no SDK available
      seedDemoData()
      return
    }

    const result = await window.dataSdk.init({
      onDataChanged: (data: DataItem[]) => onDataChanged(data),
    })

    if (!result?.isOk || userPlantsStore.allData.length === 0) {
      seedDemoData()
    }
  }

  const setupElementSdk = () => {
    if (!window.elementSdk) return

    window.elementSdk.init({
      defaultConfig,
      onConfigChange: (c) => onConfigChange(c),
      mapToCapabilities: (c) => ({
        recolorables: [
          {
            get: () => c.background_color || defaultConfig.background_color,
            set: (value: string) => {
              if (c) c.background_color = value
              window.elementSdk?.setConfig({ background_color: value })
            },
          },
          {
            get: () => c.card_color || defaultConfig.card_color,
            set: (value: string) => {
              if (c) c.card_color = value
              window.elementSdk?.setConfig({ card_color: value })
            },
          },
          {
            get: () => c.text_color || defaultConfig.text_color,
            set: (value: string) => {
              if (c) c.text_color = value
              window.elementSdk?.setConfig({ text_color: value })
            },
          },
          {
            get: () => c.primary_action_color || defaultConfig.primary_action_color,
            set: (value: string) => {
              if (c) c.primary_action_color = value
              window.elementSdk?.setConfig({ primary_action_color: value })
            },
          },
          {
            get: () => c.secondary_action_color || defaultConfig.secondary_action_color,
            set: (value: string) => {
              if (c) c.secondary_action_color = value
              window.elementSdk?.setConfig({ secondary_action_color: value })
            },
          },
        ],
        borderables: [],
        fontEditable: {
          get: () => c.font_family || defaultConfig.font_family,
          set: (value: string) => {
            if (c) c.font_family = value
            window.elementSdk?.setConfig({ font_family: value })
          },
        },
        fontSizeable: {
          get: () => c.font_size || defaultConfig.font_size,
          set: (value: number) => {
            if (c) c.font_size = value
            window.elementSdk?.setConfig({ font_size: value })
          },
        },
      }),
      mapToEditPanelValues: (c) =>
        new Map([
          ['app_title', c.app_title || defaultConfig.app_title],
          ['subtitle', c.subtitle || defaultConfig.subtitle],
          ['add_button_text', c.add_button_text || defaultConfig.add_button_text],
          ['current_language', c.current_language || defaultConfig.current_language],
        ]),
    })
  }

  const seedDemoData = () => {
    const demoPlants: DataItem[] = [
      {
        id: 'demo-1',
        data_type: 'plant',
        name: 'Cherry Tomatoes',
        type: 'vegetable',
        variety: 'Sweet Million',
        planting_date: '2024-03-15',
        harvest_date: '2024-07-01',
        storage_date: '',
        days_to_maturity: '75',
        planting_depth: '1/4 inch',
        spacing: '24 inches',
        sun_requirement: 'full-sun',
        water_frequency: 'daily',
        soil_type: 'loamy',
        notes: 'Started from seed indoors',
        status: 'growing',
        created_at: new Date().toISOString(),
      },
      {
        id: 'demo-2',
        data_type: 'plant',
        name: 'Basil',
        type: 'herb',
        variety: 'Genovese',
        planting_date: '2024-04-01',
        harvest_date: '2024-06-01',
        storage_date: '',
        days_to_maturity: '60',
        planting_depth: '1/4 inch',
        spacing: '12 inches',
        sun_requirement: 'full-sun',
        water_frequency: 'daily',
        soil_type: 'loamy',
        notes: 'Companion plant for tomatoes',
        status: 'ready',
        created_at: new Date().toISOString(),
      },
    ]

    userPlantsStore.setAllData(demoPlants)
  }

  const initializeSdks = async () => {
    applyConfigStyles()
    setupElementSdk()
    await setupDataSdk()
  }

  return {
    initializeSdks,
    setupDataSdk,
    setupElementSdk,
    seedDemoData,
  }
}
