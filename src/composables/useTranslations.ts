import { ref, computed } from 'vue'
import type { Language, Translations, CareTip } from '@/types'

const translations: Translations = {
  en: {
    switchLanguage: '🇳🇱 Nederlands',
    discover: 'Discover',
    myGarden: 'My Garden',
    pastPlants: 'Plant Overview',
    profile: 'Dashboard',
    discoverTitle: 'Discover Green',
    discoverSubtitle: 'Explore plant care tips and insights based on your garden',
    myGardenTitle: 'My Garden Planner',
    myGardenSubtitle: 'Track your plants from seed to harvest',
    pastPlantsTitle: 'Plant Overview',
    pastPlantsSubtitle: 'Browse all plants from the database and your collection',
    profileTitle: 'Dashboard',
    profileSubtitle: 'View your gardening statistics and manage your profile',
    addNewPlant: '+ Add New Plant',
    addNewPlantTitle: 'Add New Plant',
    editPlantTitle: 'Edit Plant',
    browseDatabase: 'Browse Plant Database',
    filterBy: 'Filter By',
    all: 'All',
    noPlantsTitle: 'No plants yet',
    noPlantsMessage: 'Add plants to start tracking your garden.',
    noPastPlantsTitle: 'No harvested plants yet',
    noPastPlantsMessage: 'Plants you harvest will appear here.',
    welcomeMessage: 'Welcome to your garden!',
    addPlantsMessage: 'Start by adding some plants to see personalized insights.',
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
    edit: 'Edit',
    delete: 'Delete',
    cancel: 'Cancel',
    saveChanges: 'Save Changes',
    addPlant: 'Add Plant',
    editProfile: 'Edit Profile',
    saveProfile: 'Save Profile',
    name: 'Name',
    email: 'Email',
    location: 'Location',
    experience: 'Experience Level',
    gardenSize: 'Garden Size',
    bio: 'Bio',
    selectLevel: 'Select Level',
    selectSize: 'Select Size',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    expert: 'Expert',
    container: 'Container Garden',
    small: 'Small (< 100 sq ft)',
    medium: 'Medium (100-500 sq ft)',
    large: 'Large (500+ sq ft)',
    farm: 'Farm/Commercial',
    totalPlants: 'Total Plants',
    activePlants: 'Active Plants',
    harvestedPlants: 'Harvested Plants',
    varieties: 'Unique Varieties',
    plantDatabase: 'Plant Database',
    searchPlantsPlaceholder: 'Search plants...',
    noResultsTitle: 'No results found',
    noResultsMessage: 'Try a different search term.',
  },
  nl: {
    switchLanguage: '🇬🇧 English',
    discover: 'Ontdek',
    myGarden: 'Mijn Tuin',
    pastPlants: 'Plantenoverzicht',
    profile: 'Dashboard',
    discoverTitle: 'Ontdek Groen',
    discoverSubtitle: 'Bekijk tips en inzichten voor jouw tuin',
    myGardenTitle: 'Mijn Tuinplanner',
    myGardenSubtitle: 'Volg je planten van zaad tot oogst',
    pastPlantsTitle: 'Plantenoverzicht',
    pastPlantsSubtitle: 'Bekijk alle planten uit de database en jouw collectie',
    profileTitle: 'Dashboard',
    profileSubtitle: 'Bekijk je statistieken en beheer je profiel',
    addNewPlant: '+ Nieuwe Plant',
    addNewPlantTitle: 'Nieuwe Plant',
    editPlantTitle: 'Plant Bewerken',
    browseDatabase: 'Plantendatabase',
    filterBy: 'Filteren',
    all: 'Alles',
    noPlantsTitle: 'Nog geen planten',
    noPlantsMessage: 'Voeg planten toe om je tuin bij te houden.',
    noPastPlantsTitle: 'Nog geen geoogste planten',
    noPastPlantsMessage: 'Geoogste planten verschijnen hier.',
    welcomeMessage: 'Welkom in je tuin!',
    addPlantsMessage: 'Begin met het toevoegen van planten voor persoonlijke inzichten.',
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
    edit: 'Bewerken',
    delete: 'Verwijderen',
    cancel: 'Annuleren',
    saveChanges: 'Opslaan',
    addPlant: 'Toevoegen',
    editProfile: 'Profiel Bewerken',
    saveProfile: 'Profiel Opslaan',
    name: 'Naam',
    email: 'E-mail',
    location: 'Locatie',
    experience: 'Ervaring',
    gardenSize: 'Tuingrootte',
    bio: 'Bio',
    selectLevel: 'Kies niveau',
    selectSize: 'Kies grootte',
    beginner: 'Beginner',
    intermediate: 'Gevorderd',
    advanced: 'Ervaren',
    expert: 'Expert',
    container: 'Balkon / container',
    small: 'Klein (< 10 m²)',
    medium: 'Middel (10-50 m²)',
    large: 'Groot (50+ m²)',
    farm: 'Boerderij',
    totalPlants: 'Totaal planten',
    activePlants: 'Actief',
    harvestedPlants: 'Geoogst',
    varieties: 'Variëteiten',
    plantDatabase: 'Plantendatabase',
    searchPlantsPlaceholder: 'Zoek planten...',
    noResultsTitle: 'Geen resultaten',
    noResultsMessage: 'Probeer een andere zoekterm.',
  },
}

const sunTranslations: Record<string, { en: string; nl: string }> = {
  'full-sun': { en: 'Full Sun (6+ hours)', nl: 'Volle zon (6+ uur)' },
  'partial-sun': { en: 'Partial Sun (4-6 hours)', nl: 'Half zon (4-6 uur)' },
  'partial-shade': { en: 'Partial Shade (2-4 hours)', nl: 'Half schaduw (2-4 uur)' },
  'full-shade': { en: 'Full Shade (< 2 hours)', nl: 'Schaduw (< 2 uur)' },
}

const waterTranslations: Record<string, { en: string; nl: string }> = {
  daily: { en: 'Daily', nl: 'Dagelijks' },
  'every-2-days': { en: 'Every 2 Days', nl: 'Elke 2 dagen' },
  'twice-weekly': { en: 'Twice weekly', nl: '2x per week' },
  weekly: { en: 'Weekly', nl: 'Wekelijks' },
  'as-needed': { en: 'As needed', nl: 'Indien nodig' },
}

const statusTranslations: Record<string, { en: string; nl: string }> = {
  planning: { en: 'Planning', nl: 'Planning' },
  planted: { en: 'Planted', nl: 'Geplant' },
  growing: { en: 'Growing', nl: 'Groeit' },
  ready: { en: 'Ready to Harvest', nl: 'Klaar voor oogst' },
  harvested: { en: 'Harvested', nl: 'Geoogst' },
}

const typeTranslations: Record<string, { en: string; nl: string }> = {
  vegetable: { en: 'Vegetable', nl: 'Groente' },
  fruit: { en: 'Fruit', nl: 'Fruit' },
  plant: { en: 'Plant', nl: 'Plant' },
  tree: { en: 'Tree', nl: 'Boom' },
  herb: { en: 'Herb', nl: 'Kruid' },
  flower: { en: 'Flower', nl: 'Bloem' },
}

const experienceTranslations: Record<string, { en: string; nl: string }> = {
  beginner: { en: 'Beginner', nl: 'Beginner' },
  intermediate: { en: 'Intermediate', nl: 'Gevorderd' },
  advanced: { en: 'Advanced', nl: 'Ervaren' },
  expert: { en: 'Expert', nl: 'Expert' },
}

const gardenSizeTranslations: Record<string, { en: string; nl: string }> = {
  container: { en: 'Container Garden', nl: 'Balkon / container' },
  small: { en: 'Small (< 100 sq ft)', nl: 'Klein (< 10 m²)' },
  medium: { en: 'Medium (100-500 sq ft)', nl: 'Middel (10-50 m²)' },
  large: { en: 'Large (500+ sq ft)', nl: 'Groot (50+ m²)' },
  farm: { en: 'Farm/Commercial', nl: 'Boerderij' },
}

const careTips: CareTip[] = [
  {
    title: { en: 'Mulch matters', nl: 'Mulch werkt' },
    body: {
      en: 'A 5cm mulch layer keeps soil moist and reduces weeds.',
      nl: 'Een laag mulch van 5 cm houdt de grond vochtig en beperkt onkruid.',
    },
  },
  {
    title: { en: 'Morning watering', nl: 'Ochtend water geven' },
    body: {
      en: 'Water early to reduce evaporation and fungal risk.',
      nl: 'Geef vroeg water om verdamping en schimmel te beperken.',
    },
  },
  {
    title: { en: 'Rotate crops', nl: 'Teeltrotatie' },
    body: {
      en: 'Rotate beds yearly to reduce pest pressure.',
      nl: 'Wissel bedden jaarlijks om plagen te verminderen.',
    },
  },
  {
    title: { en: 'Companion planting', nl: 'Combinatieteelt' },
    body: {
      en: 'Pair basil with tomatoes to boost growth.',
      nl: 'Zet basilicum bij tomaat voor betere groei.',
    },
  },
]

// Shared state
const language = ref<Language>('en')

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
