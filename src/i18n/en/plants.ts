import type { TranslationSet } from '@/types'

export const plants: TranslationSet = {
  addNewPlant: '+ Add New Plant',
  addNewPlantTitle: 'Add New Plant',
  editPlantTitle: 'Edit Plant',
  plantName: 'Plant Name',
  type: 'Type',
  variety: 'Variety',
  plantingDate: 'Planting Date',
  expectedHarvest: 'Expected Harvest',
  storageDate: 'Storage Date',
  daysToMaturity: 'Days to Maturity',
  plantingDepth: 'Planting Depth',
  spacing: 'Spacing',
  sunRequirement: 'Sun Requirement',
  waterFrequency: 'Water Frequency',
  soilType: 'Soil Type',
  status: 'Status',
  notes: 'Notes',
  notesPlaceholder: 'Add any additional notes about this plant...',
  planning: 'Planning',
  planted: 'Planted',
  growing: 'Growing',
  ready: 'Ready',
  harvested: 'Harvested',
  vegetable: 'Vegetable',
  fruit: 'Fruit',
  plant: 'Plant',
  tree: 'Tree',
  herbs: 'Herbs',
  flowers: 'Flowers',
  vegetables: 'Vegetables',
  fruits: 'Fruits',
  plants: 'Plants',
  trees: 'Trees',
  plantDatabase: 'Plant Database',
  lastWatered: 'Last Watered',
  nextWatering: 'Next Watering',
  neverWatered: 'Never',
  waterNow: 'Water',
  justWatered: 'Just watered',
  plantingWindow: 'Planting Window',
  timeToPlant: 'Time to Plant!',
  canBePlantedNow: 'These plants can be started now (this month):',
}

export const sunTranslations: Record<string, string> = {
  'full-sun': 'Full Sun (6+ hours)',
  'partial-sun': 'Partial Sun (4-6 hours)',
  'partial-shade': 'Partial Shade (2-4 hours)',
  'full-shade': 'Full Shade (< 2 hours)',
}

export const waterTranslations: Record<string, string> = {
  daily: 'Daily',
  'every-2-days': 'Every 2 Days',
  'twice-weekly': 'Twice weekly',
  weekly: 'Weekly',
  'as-needed': 'As needed',
}

export const statusTranslations: Record<string, string> = {
  planning: 'Planning',
  planted: 'Planted',
  growing: 'Growing',
  ready: 'Ready to Harvest',
  harvested: 'Harvested',
}

export const typeTranslations: Record<string, string> = {
  vegetable: 'Vegetable',
  fruit: 'Fruit',
  plant: 'Plant',
  tree: 'Tree',
  herb: 'Herb',
  flower: 'Flower',
}
