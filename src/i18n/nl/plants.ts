import type { TranslationSet } from '@/types'

export const plants: TranslationSet = {
  addNewPlant: '+ Nieuwe Plant',
  addNewPlantTitle: 'Nieuwe Plant',
  editPlantTitle: 'Plant Bewerken',
  plantName: 'Plantnaam',
  type: 'Type',
  variety: 'Variëteit',
  plantingDate: 'Plantdatum',
  expectedHarvest: 'Verwachte oogst',
  storageDate: 'Bewaar datum',
  daysToMaturity: 'Dagen tot rijpheid',
  plantingDepth: 'Plantdiepte',
  spacing: 'Afstand',
  sunRequirement: 'Zonlicht',
  waterFrequency: 'Waterfrequentie',
  soilType: 'Bodemtype',
  status: 'Status',
  notes: 'Notities',
  notesPlaceholder: 'Extra notities over deze plant...',
  planning: 'Planning',
  planted: 'Geplant',
  growing: 'Groeit',
  ready: 'Klaar',
  harvested: 'Geoogst',
  vegetable: 'Groente',
  fruit: 'Fruit',
  plant: 'Plant',
  tree: 'Boom',
  herbs: 'Kruiden',
  flowers: 'Bloemen',
  vegetables: 'Groenten',
  fruits: 'Fruit',
  plants: 'Planten',
  trees: 'Bomen',
  plantDatabase: 'Plantendatabase',
  lastWatered: 'Laatst water gegeven',
  nextWatering: 'Volgende waterbeurt',
  neverWatered: 'Nooit',
  waterNow: 'Water geven',
  justWatered: 'Net water gegeven',
  plantingWindow: 'Plantperiode',
  timeToPlant: 'Tijd om te planten!',
  canBePlantedNow: 'Deze planten kunnen nu (deze maand) worden gestart:',
}

export const sunTranslations: Record<string, string> = {
  'full-sun': 'Volle zon (6+ uur)',
  'partial-sun': 'Half zon (4-6 uur)',
  'partial-shade': 'Half schaduw (2-4 uur)',
  'full-shade': 'Schaduw (< 2 uur)',
}

export const waterTranslations: Record<string, string> = {
  daily: 'Dagelijks',
  'every-2-days': 'Elke 2 dagen',
  'twice-weekly': '2x per week',
  weekly: 'Wekelijks',
  'as-needed': 'Indien nodig',
}

export const statusTranslations: Record<string, string> = {
  planning: 'Planning',
  planted: 'Geplant',
  growing: 'Groeit',
  ready: 'Klaar voor oogst',
  harvested: 'Geoogst',
}

export const typeTranslations: Record<string, string> = {
  vegetable: 'Groente',
  fruit: 'Fruit',
  plant: 'Plant',
  tree: 'Boom',
  herb: 'Kruid',
  flower: 'Bloem',
}
