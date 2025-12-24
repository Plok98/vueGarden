<script lang="ts">
interface SeasonalPalette {
  background_color: string;
  card_color: string;
  text_color: string;
  primary_action_color: string;
  secondary_action_color: string;
}

interface Plant {
  id: string;
  data_type: 'plant';
  name: string;
  type: string;
  variety: string;
  planting_date: string;
  harvest_date: string;
  storage_date: string;
  days_to_maturity: string | number;
  planting_depth: string;
  spacing: string;
  sun_requirement: string;
  water_frequency: string;
  soil_type: string;
  notes: string;
  status: string;
  created_at: string;
}

interface UserProfile {
  data_type: 'profile';
  id: string;
  name: string;
  email: string;
  location: string;
  experience: string;
  garden_size: string;
  bio: string;
}

type DataItem = Plant | UserProfile;

interface AppConfig {
  app_title: string;
  subtitle: string;
  add_button_text: string;
  current_language: string;
  background_color: string;
  card_color: string;
  text_color: string;
  primary_action_color: string;
  secondary_action_color: string;
  font_family: string;
  font_size: number;
}

interface TranslationSet {
  [key: string]: string;
}

interface Translations {
  en: TranslationSet;
  nl: TranslationSet;
}

interface CareTip {
  title: { en: string; nl: string };
  body: { en: string; nl: string };
}

interface PlantTemplate {
  name: string;
  nameDutch: string;
  scientific: string;
  emoji: string;
  type: string;
  daysToMaturity: number;
  sunRequirement: string;
  waterFrequency: string;
  soilType: string;
  spacing: string;
  plantingDepth: string;
}

interface DataSdk {
  create: (payload: Plant | UserProfile) => Promise<{ isOk: boolean } | undefined>;
  update: (payload: Plant | UserProfile) => Promise<{ isOk: boolean } | undefined>;
  delete: (payload: Plant) => Promise<{ isOk: boolean } | undefined>;
  init: (config: { onDataChanged: (data: DataItem[]) => void }) => Promise<{ isOk: boolean } | undefined>;
}

interface ElementSdk {
  init: (config: { defaultConfig: AppConfig; onConfigChange: (c: Partial<AppConfig>) => void; mapToCapabilities: (c: Partial<AppConfig>) => unknown; mapToEditPanelValues: (c: Partial<AppConfig>) => unknown }) => void;
  setConfig: (config: Partial<AppConfig>) => void;
}

declare global {
  interface Window {
    dataSdk?: DataSdk;
    elementSdk?: ElementSdk;
  }
}

export {}
</script>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'

defineProps<{
  msg: string
}>()

function getSeasonalColors() {
  const now = new Date();
  const year = now.getFullYear();
  const springEquinox = new Date(year, 2, 20);
  const summerSolstice = new Date(year, 5, 21);
  const fallEquinox = new Date(year, 8, 22);
  const winterSolstice = new Date(year, 11, 21);

  let season: 'spring' | 'summer' | 'fall' | 'winter' = 'winter';
  if (now >= springEquinox && now < summerSolstice) season = 'spring';
  else if (now >= summerSolstice && now < fallEquinox) season = 'summer';
  else if (now >= fallEquinox && now < winterSolstice) season = 'fall';

  const seasonalPalettes: Record<'spring' | 'summer' | 'fall' | 'winter', SeasonalPalette> = {
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
  };

  return { season, colors: seasonalPalettes[season] };
}

const { season: currentSeason, colors: seasonalColors } = getSeasonalColors();

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
};

const translations = {
  en: {
    switchLanguage: '🇳🇱 Nederlands',
    discover: 'Discover',
    myGarden: 'My Garden',
    pastPlants: 'Past Plants',
    profile: 'Profile',
    discoverTitle: 'Discover Green',
    discoverSubtitle: 'Explore plant care tips and insights based on your garden',
    myGardenTitle: 'My Garden Planner',
    myGardenSubtitle: 'Track your plants from seed to harvest',
    pastPlantsTitle: 'Past Plants',
    pastPlantsSubtitle: 'View your gardening history and harvested plants',
    profileTitle: 'Gardener Profile',
    profileSubtitle: 'Manage your profile and view your gardening statistics',
    addNewPlant: '+ Add New Plant',
    addNewPlantTitle: 'Add New Plant',
    editPlantTitle: 'Edit Plant',
    browseDatabase: 'Browse Plant Database',
    filterBy: 'Filter By',
    all: 'All',
    noPlantsTitle: 'No plants yet',
    noPlantsMessage: 'Add plants to start tracking your garden.',
    noPastPlantsTitle: 'No harvested plants yet',
    noPastPlantsMessage: 'Harvested plants will show here.',
    addPlantsMessage: 'Add plants to your garden to discover personalized care tips and insights!',
    welcomeMessage: 'Welcome to Your Garden Journey',
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
    vegetables: 'Vegetables',
    fruit: 'Fruit',
    fruits: 'Fruits',
    plant: 'Plant',
    plants: 'Plants',
    tree: 'Tree',
    trees: 'Trees',
    herbs: 'Herbs',
    flowers: 'Flowers',
    addPlant: 'Add Plant',
    saveChanges: 'Save Changes',
    delete: 'Delete',
    edit: 'Edit',
    cancel: 'Cancel',
    saveProfile: 'Save Profile',
    plantDatabase: 'Plant Database',
    searchPlantsPlaceholder: 'Search plants...',
    noResultsTitle: 'No plants found',
    noResultsMessage: 'Try another search or filter.',
    email: 'Email',
    location: 'Location',
    experience: 'Experience Level',
    gardenSize: 'Garden Size',
    bio: 'Bio',
    name: 'Name',
    editProfile: 'Edit Profile',
    selectLevel: 'Select level',
    selectSize: 'Select size',
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
    varieties: 'Unique Varieties'
  },
  nl: {
    switchLanguage: '🇬🇧 English',
    discover: 'Ontdek',
    myGarden: 'Mijn Tuin',
    pastPlants: 'Oogst',
    profile: 'Profiel',
    discoverTitle: 'Ontdek Groen',
    discoverSubtitle: 'Bekijk tips en inzichten voor jouw tuin',
    myGardenTitle: 'Mijn Tuinplanner',
    myGardenSubtitle: 'Volg planten van zaad tot oogst',
    pastPlantsTitle: 'Eerdere Planten',
    pastPlantsSubtitle: 'Je geschiedenis en geoogste planten',
    profileTitle: 'Tuinierprofiel',
    profileSubtitle: 'Beheer je profiel en statistieken',
    addNewPlant: '+ Nieuwe Plant',
    addNewPlantTitle: 'Nieuwe Plant',
    editPlantTitle: 'Plant Bewerken',
    browseDatabase: 'Blader in plantendatabase',
    filterBy: 'Filter op',
    all: 'Alle',
    noPlantsTitle: 'Nog geen planten',
    noPlantsMessage: 'Voeg planten toe om je tuin bij te houden.',
    noPastPlantsTitle: 'Nog niets geoogst',
    noPastPlantsMessage: 'Geoogste planten verschijnen hier.',
    addPlantsMessage: 'Voeg planten toe om persoonlijke tips en inzichten te krijgen!',
    welcomeMessage: 'Welkom bij je tuinjournal',
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
    vegetables: 'Groenten',
    fruit: 'Fruit',
    fruits: 'Fruit',
    plant: 'Plant',
    plants: 'Planten',
    tree: 'Boom',
    trees: 'Bomen',
    herbs: 'Kruiden',
    flowers: 'Bloemen',
    addPlant: 'Plant toevoegen',
    saveChanges: 'Wijzigingen opslaan',
    delete: 'Verwijderen',
    edit: 'Bewerken',
    cancel: 'Annuleren',
    saveProfile: 'Profiel opslaan',
    plantDatabase: 'Plantendatabase',
    searchPlantsPlaceholder: 'Zoek planten...',
    noResultsTitle: 'Geen planten gevonden',
    noResultsMessage: 'Probeer een andere zoekterm of filter.',
    email: 'E-mail',
    location: 'Locatie',
    experience: 'Ervaring',
    gardenSize: 'Tuinafmeting',
    bio: 'Bio',
    name: 'Naam',
    editProfile: 'Profiel bewerken',
    selectLevel: 'Selecteer niveau',
    selectSize: 'Selecteer grootte',
    beginner: 'Beginner',
    intermediate: 'Gemiddeld',
    advanced: 'Gevorderd',
    expert: 'Expert',
    container: 'Balkon / container',
    small: 'Klein (< 10 m²)',
    medium: 'Middel (10-50 m²)',
    large: 'Groot (50+ m²)',
    farm: 'Boerderij',
    totalPlants: 'Totaal planten',
    activePlants: 'Actief',
    harvestedPlants: 'Geoogst',
    varieties: 'Variëteiten'
  }
} as Translations;

const plantDatabase = [
      // Vegetables
      { name: "Tomato", nameDutch: "Tomaat", scientific: "Solanum lycopersicum", emoji: "🍅", type: "vegetable", daysToMaturity: 75, sunRequirement: "full-sun", waterFrequency: "daily", soilType: "loamy", spacing: "24 inches", plantingDepth: "1/4 inch" },
      { name: "Carrot", nameDutch: "Wortel", scientific: "Daucus carota", emoji: "🥕", type: "vegetable", daysToMaturity: 70, sunRequirement: "full-sun", waterFrequency: "every-2-days", soilType: "sandy", spacing: "2 inches", plantingDepth: "1/4 inch" },
      { name: "Lettuce", nameDutch: "Sla", scientific: "Lactuca sativa", emoji: "🥬", type: "vegetable", daysToMaturity: 45, sunRequirement: "partial-shade", waterFrequency: "daily", soilType: "loamy", spacing: "6 inches", plantingDepth: "1/8 inch" },
      { name: "Bell Pepper", nameDutch: "Paprika", scientific: "Capsicum annuum", emoji: "🫑", type: "vegetable", daysToMaturity: 80, sunRequirement: "full-sun", waterFrequency: "daily", soilType: "loamy", spacing: "18 inches", plantingDepth: "1/4 inch" },
      { name: "Cucumber", nameDutch: "Komkommer", scientific: "Cucumis sativus", emoji: "🥒", type: "vegetable", daysToMaturity: 60, sunRequirement: "full-sun", waterFrequency: "daily", soilType: "loamy", spacing: "36 inches", plantingDepth: "1/2 inch" },
      { name: "Broccoli", nameDutch: "Broccoli", scientific: "Brassica oleracea", emoji: "🥦", type: "vegetable", daysToMaturity: 85, sunRequirement: "full-sun", waterFrequency: "every-2-days", soilType: "loamy", spacing: "18 inches", plantingDepth: "1/4 inch" },
      { name: "Spinach", nameDutch: "Spinazie", scientific: "Spinacia oleracea", emoji: "🍃", type: "vegetable", daysToMaturity: 40, sunRequirement: "partial-shade", waterFrequency: "every-2-days", soilType: "loamy", spacing: "4 inches", plantingDepth: "1/2 inch" },
      { name: "Radish", nameDutch: "Radijs", scientific: "Raphanus sativus", emoji: "🔴", type: "vegetable", daysToMaturity: 25, sunRequirement: "full-sun", waterFrequency: "daily", soilType: "sandy", spacing: "2 inches", plantingDepth: "1/2 inch" },
      { name: "Onion", nameDutch: "Ui", scientific: "Allium cepa", emoji: "🧅", type: "vegetable", daysToMaturity: 120, sunRequirement: "full-sun", waterFrequency: "weekly", soilType: "loamy", spacing: "4 inches", plantingDepth: "1/4 inch" },
      { name: "Garlic", nameDutch: "Knoflook", scientific: "Allium sativum", emoji: "🧄", type: "vegetable", daysToMaturity: 240, sunRequirement: "full-sun", waterFrequency: "weekly", soilType: "loamy", spacing: "6 inches", plantingDepth: "2 inches" },
      { name: "Kale", nameDutch: "Boerenkool", scientific: "Brassica oleracea", emoji: "🥬", type: "vegetable", daysToMaturity: 55, sunRequirement: "partial-sun", waterFrequency: "every-2-days", soilType: "loamy", spacing: "12 inches", plantingDepth: "1/4 inch" },
      { name: "Zucchini", nameDutch: "Courgette", scientific: "Cucurbita pepo", emoji: "🥒", type: "vegetable", daysToMaturity: 50, sunRequirement: "full-sun", waterFrequency: "daily", soilType: "loamy", spacing: "36 inches", plantingDepth: "1 inch" },
      { name: "Eggplant", nameDutch: "Aubergine", scientific: "Solanum melongena", emoji: "🍆", type: "vegetable", daysToMaturity: 85, sunRequirement: "full-sun", waterFrequency: "daily", soilType: "loamy", spacing: "24 inches", plantingDepth: "1/4 inch" },
      { name: "Green Beans", nameDutch: "Sperziebonen", scientific: "Phaseolus vulgaris", emoji: "🫘", type: "vegetable", daysToMaturity: 55, sunRequirement: "full-sun", waterFrequency: "every-2-days", soilType: "loamy", spacing: "6 inches", plantingDepth: "1 inch" },
      { name: "Peas", nameDutch: "Erwten", scientific: "Pisum sativum", emoji: "🟢", type: "vegetable", daysToMaturity: 65, sunRequirement: "partial-sun", waterFrequency: "every-2-days", soilType: "loamy", spacing: "4 inches", plantingDepth: "1 inch" },
      { name: "Cabbage", nameDutch: "Kool", scientific: "Brassica oleracea", emoji: "🥬", type: "vegetable", daysToMaturity: 90, sunRequirement: "full-sun", waterFrequency: "every-2-days", soilType: "loamy", spacing: "18 inches", plantingDepth: "1/4 inch" },
      { name: "Cauliflower", nameDutch: "Bloemkool", scientific: "Brassica oleracea", emoji: "🥦", type: "vegetable", daysToMaturity: 95, sunRequirement: "full-sun", waterFrequency: "every-2-days", soilType: "loamy", spacing: "18 inches", plantingDepth: "1/4 inch" },
      { name: "Leek", nameDutch: "Prei", scientific: "Allium porrum", emoji: "🥬", type: "vegetable", daysToMaturity: 120, sunRequirement: "full-sun", waterFrequency: "every-2-days", soilType: "loamy", spacing: "6 inches", plantingDepth: "1/2 inch" },
      { name: "Brussels Sprouts", nameDutch: "Spruitjes", scientific: "Brassica oleracea", emoji: "🥬", type: "vegetable", daysToMaturity: 110, sunRequirement: "full-sun", waterFrequency: "every-2-days", soilType: "loamy", spacing: "18 inches", plantingDepth: "1/4 inch" },

      // Fruits
      { name: "Strawberry", nameDutch: "Aardbei", scientific: "Fragaria × ananassa", emoji: "🍓", type: "fruit", daysToMaturity: 90, sunRequirement: "full-sun", waterFrequency: "daily", soilType: "loamy", spacing: "12 inches", plantingDepth: "surface" },
      { name: "Blueberry", nameDutch: "Bosbes", scientific: "Vaccinium corymbosum", emoji: "🫐", type: "fruit", daysToMaturity: 365, sunRequirement: "full-sun", waterFrequency: "twice-weekly", soilType: "peaty", spacing: "48 inches", plantingDepth: "root level" },
      { name: "Raspberry", nameDutch: "Framboos", scientific: "Rubus idaeus", emoji: "🍇", type: "fruit", daysToMaturity: 365, sunRequirement: "partial-sun", waterFrequency: "twice-weekly", soilType: "loamy", spacing: "24 inches", plantingDepth: "root level" },
      { name: "Blackberry", nameDutch: "Braam", scientific: "Rubus fruticosus", emoji: "🫐", type: "fruit", daysToMaturity: 365, sunRequirement: "partial-sun", waterFrequency: "twice-weekly", soilType: "loamy", spacing: "36 inches", plantingDepth: "root level" },
      { name: "Watermelon", nameDutch: "Watermeloen", scientific: "Citrullus lanatus", emoji: "🍉", type: "fruit", daysToMaturity: 90, sunRequirement: "full-sun", waterFrequency: "daily", soilType: "sandy", spacing: "72 inches", plantingDepth: "1 inch" },
      { name: "Cantaloupe", nameDutch: "Meloen", scientific: "Cucumis melo", emoji: "🍈", type: "fruit", daysToMaturity: 85, sunRequirement: "full-sun", waterFrequency: "daily", soilType: "loamy", spacing: "36 inches", plantingDepth: "1/2 inch" },
      { name: "Apple Tree", nameDutch: "Appelboom", scientific: "Malus domestica", emoji: "🍎", type: "fruit", daysToMaturity: 1095, sunRequirement: "full-sun", waterFrequency: "weekly", soilType: "loamy", spacing: "180 inches", plantingDepth: "root level" },
      { name: "Pear Tree", nameDutch: "Perenboom", scientific: "Pyrus communis", emoji: "🍐", type: "fruit", daysToMaturity: 1095, sunRequirement: "full-sun", waterFrequency: "weekly", soilType: "loamy", spacing: "180 inches", plantingDepth: "root level" },
      { name: "Cherry Tree", nameDutch: "Kersenboom", scientific: "Prunus avium", emoji: "🍒", type: "fruit", daysToMaturity: 1095, sunRequirement: "full-sun", waterFrequency: "weekly", soilType: "loamy", spacing: "240 inches", plantingDepth: "root level" },
      { name: "Grape Vine", nameDutch: "Druivenrank", scientific: "Vitis vinifera", emoji: "🍇", type: "fruit", daysToMaturity: 730, sunRequirement: "full-sun", waterFrequency: "weekly", soilType: "loamy", spacing: "72 inches", plantingDepth: "root level" },

      // Herbs
      { name: "Basil", nameDutch: "Basilicum", scientific: "Ocimum basilicum", emoji: "🌿", type: "herb", daysToMaturity: 60, sunRequirement: "full-sun", waterFrequency: "daily", soilType: "loamy", spacing: "12 inches", plantingDepth: "1/4 inch" },
      { name: "Rosemary", nameDutch: "Rozemarijn", scientific: "Rosmarinus officinalis", emoji: "🌿", type: "herb", daysToMaturity: 90, sunRequirement: "full-sun", waterFrequency: "weekly", soilType: "sandy", spacing: "24 inches", plantingDepth: "surface" },
      { name: "Thyme", nameDutch: "Tijm", scientific: "Thymus vulgaris", emoji: "🌿", type: "herb", daysToMaturity: 75, sunRequirement: "full-sun", waterFrequency: "weekly", soilType: "sandy", spacing: "8 inches", plantingDepth: "surface" },
      { name: "Oregano", nameDutch: "Oregano", scientific: "Origanum vulgare", emoji: "🌿", type: "herb", daysToMaturity: 80, sunRequirement: "full-sun", waterFrequency: "weekly", soilType: "loamy", spacing: "10 inches", plantingDepth: "1/4 inch" },
      { name: "Parsley", nameDutch: "Peterselie", scientific: "Petroselinum crispum", emoji: "🌿", type: "herb", daysToMaturity: 70, sunRequirement: "partial-shade", waterFrequency: "every-2-days", soilType: "loamy", spacing: "6 inches", plantingDepth: "1/4 inch" },
      { name: "Cilantro", nameDutch: "Koriander", scientific: "Coriandrum sativum", emoji: "🌿", type: "herb", daysToMaturity: 45, sunRequirement: "partial-sun", waterFrequency: "every-2-days", soilType: "loamy", spacing: "4 inches", plantingDepth: "1/4 inch" },
      { name: "Mint", nameDutch: "Munt", scientific: "Mentha", emoji: "🌿", type: "herb", daysToMaturity: 60, sunRequirement: "partial-shade", waterFrequency: "daily", soilType: "loamy", spacing: "12 inches", plantingDepth: "surface" },
      { name: "Sage", nameDutch: "Salie", scientific: "Salvia officinalis", emoji: "🌿", type: "herb", daysToMaturity: 75, sunRequirement: "full-sun", waterFrequency: "weekly", soilType: "sandy", spacing: "18 inches", plantingDepth: "1/4 inch" },
      { name: "Chives", nameDutch: "Bieslook", scientific: "Allium schoenoprasum", emoji: "🌿", type: "herb", daysToMaturity: 60, sunRequirement: "partial-sun", waterFrequency: "every-2-days", soilType: "loamy", spacing: "6 inches", plantingDepth: "1/4 inch" },
      { name: "Dill", nameDutch: "Dille", scientific: "Anethum graveolens", emoji: "🌿", type: "herb", daysToMaturity: 65, sunRequirement: "full-sun", waterFrequency: "every-2-days", soilType: "loamy", spacing: "8 inches", plantingDepth: "1/4 inch" },
      { name: "Fennel", nameDutch: "Venkel", scientific: "Foeniculum vulgare", emoji: "🌿", type: "herb", daysToMaturity: 85, sunRequirement: "full-sun", waterFrequency: "every-2-days", soilType: "loamy", spacing: "12 inches", plantingDepth: "1/4 inch" },
      { name: "Tarragon", nameDutch: "Dragon", scientific: "Artemisia dracunculus", emoji: "🌿", type: "herb", daysToMaturity: 90, sunRequirement: "full-sun", waterFrequency: "weekly", soilType: "loamy", spacing: "18 inches", plantingDepth: "surface" },

      // Flowers
      { name: "Marigold", nameDutch: "Goudsbloem", scientific: "Tagetes", emoji: "🌼", type: "flower", daysToMaturity: 50, sunRequirement: "full-sun", waterFrequency: "every-2-days", soilType: "loamy", spacing: "8 inches", plantingDepth: "1/4 inch" },
      { name: "Sunflower", nameDutch: "Zonnebloem", scientific: "Helianthus annuus", emoji: "🌻", type: "flower", daysToMaturity: 80, sunRequirement: "full-sun", waterFrequency: "daily", soilType: "loamy", spacing: "24 inches", plantingDepth: "1/2 inch" },
      { name: "Zinnia", nameDutch: "Zinnia", scientific: "Zinnia elegans", emoji: "🌸", type: "flower", daysToMaturity: 60, sunRequirement: "full-sun", waterFrequency: "every-2-days", soilType: "loamy", spacing: "12 inches", plantingDepth: "1/4 inch" },
      { name: "Nasturtium", nameDutch: "Oost-Indische kers", scientific: "Tropaeolum majus", emoji: "🌺", type: "flower", daysToMaturity: 55, sunRequirement: "partial-sun", waterFrequency: "every-2-days", soilType: "sandy", spacing: "10 inches", plantingDepth: "1/2 inch" },
      { name: "Cosmos", nameDutch: "Cosmos", scientific: "Cosmos bipinnatus", emoji: "🌸", type: "flower", daysToMaturity: 70, sunRequirement: "full-sun", waterFrequency: "weekly", soilType: "sandy", spacing: "12 inches", plantingDepth: "1/4 inch" },
      { name: "Lavender", nameDutch: "Lavendel", scientific: "Lavandula", emoji: "💜", type: "flower", daysToMaturity: 90, sunRequirement: "full-sun", waterFrequency: "weekly", soilType: "sandy", spacing: "18 inches", plantingDepth: "surface" },
      { name: "Petunia", nameDutch: "Petunia", scientific: "Petunia × atkinsiana", emoji: "🌺", type: "flower", daysToMaturity: 65, sunRequirement: "full-sun", waterFrequency: "daily", soilType: "loamy", spacing: "8 inches", plantingDepth: "surface" },
      { name: "Impatiens", nameDutch: "Vlijtig liesje", scientific: "Impatiens walleriana", emoji: "🌸", type: "flower", daysToMaturity: 70, sunRequirement: "partial-shade", waterFrequency: "daily", soilType: "loamy", spacing: "8 inches", plantingDepth: "surface" },
      { name: "Tulip", nameDutch: "Tulp", scientific: "Tulipa", emoji: "🌷", type: "flower", daysToMaturity: 180, sunRequirement: "full-sun", waterFrequency: "weekly", soilType: "loamy", spacing: "6 inches", plantingDepth: "6 inches" },
      { name: "Daffodil", nameDutch: "Narcis", scientific: "Narcissus", emoji: "🌼", type: "flower", daysToMaturity: 180, sunRequirement: "partial-sun", waterFrequency: "weekly", soilType: "loamy", spacing: "6 inches", plantingDepth: "6 inches" },
      { name: "Hyacinth", nameDutch: "Hyacint", scientific: "Hyacinthus", emoji: "🌸", type: "flower", daysToMaturity: 180, sunRequirement: "full-sun", waterFrequency: "weekly", soilType: "loamy", spacing: "6 inches", plantingDepth: "6 inches" },
      { name: "Crocus", nameDutch: "Krokus", scientific: "Crocus", emoji: "🌼", type: "flower", daysToMaturity: 120, sunRequirement: "full-sun", waterFrequency: "weekly", soilType: "loamy", spacing: "3 inches", plantingDepth: "3 inches" }
    ];

const sunTranslations = {
  'full-sun': { en: 'Full Sun (6+ hours)', nl: 'Volle zon (6+ uur)' },
  'partial-sun': { en: 'Partial Sun (4-6 hours)', nl: 'Half zon (4-6 uur)' },
  'partial-shade': { en: 'Partial Shade (2-4 hours)', nl: 'Half schaduw (2-4 uur)' },
  'full-shade': { en: 'Full Shade (< 2 hours)', nl: 'Schaduw (< 2 uur)' }
};

const waterTranslations = {
  'daily': { en: 'Daily', nl: 'Dagelijks' },
  'every-2-days': { en: 'Every 2 Days', nl: 'Elke 2 dagen' },
  'twice-weekly': { en: 'Twice weekly', nl: '2x per week' },
  'weekly': { en: 'Weekly', nl: 'Wekelijks' },
  'as-needed': { en: 'As needed', nl: 'Indien nodig' }
};

const statusTranslations = {
  planning: { en: 'Planning', nl: 'Planning' },
  planted: { en: 'Planted', nl: 'Geplant' },
  growing: { en: 'Growing', nl: 'Groeit' },
  ready: { en: 'Ready to Harvest', nl: 'Klaar voor oogst' },
  harvested: { en: 'Harvested', nl: 'Geoogst' }
};

const careTips = [
  { title: { en: 'Mulch matters', nl: 'Mulch werkt' }, body: { en: 'A 5cm mulch layer keeps soil moist and reduces weeds.', nl: 'Een laag mulch van 5 cm houdt de grond vochtig en beperkt onkruid.' } },
  { title: { en: 'Morning watering', nl: 'Ochtend water geven' }, body: { en: 'Water early to reduce evaporation and fungal risk.', nl: 'Geef vroeg water om verdamping en schimmel te beperken.' } },
  { title: { en: 'Rotate crops', nl: 'Teeltrotatie' }, body: { en: 'Rotate beds yearly to reduce pest pressure.', nl: 'Wissel bedden jaarlijks om plagen te verminderen.' } },
  { title: { en: 'Companion planting', nl: 'Combinatieteelt' }, body: { en: 'Pair basil with tomatoes to boost growth.', nl: 'Zet basilicum bij tomaat voor betere groei.' } }
] as CareTip[];

const blankPlant = (): Plant => ({
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
});

const config = ref({ ...defaultConfig });
const currentPage = ref('discover');
const language = ref('en');
const plantFilter = ref('all');
const pastFilter = ref('all');
const databaseFilter = ref('all');
const searchTerm = ref('');
const plants = ref<Plant[]>([]);
const allData = ref<DataItem[]>([]);
const userProfile = reactive<UserProfile>({
  data_type: 'profile',
  id: '',
  name: '',
  email: '',
  location: '',
  experience: '',
  garden_size: '',
  bio: ''
});
const showPlantModal = ref(false);
const showDatabaseModal = ref(false);
const showProfileModal = ref(false);
const editingPlantId = ref<string | null>(null);
const plantForm = ref(blankPlant());
const tipIndex = ref(0);

const t = (key: string) => {
  const lang = language.value as 'en' | 'nl';
  return translations[lang][key] || translations.en[key] || key;
};

const navLinks = [
  { id: 'discover', label: 'discover', icon: '🌿' },
  { id: 'my-garden', label: 'myGarden', icon: '🌱' },
  { id: 'past-plants', label: 'pastPlants', icon: '📚' },
  { id: 'profile', label: 'profile', icon: '👤' }
];

const activePlants = computed(() => plants.value.filter(p => p.status !== 'harvested'));
const filteredPlants = computed(() => plants.value.filter(p => p.status !== 'harvested' && (plantFilter.value === 'all' || p.status === plantFilter.value)));
const filteredPastPlants = computed(() => plants.value.filter(p => p.status === 'harvested' && (pastFilter.value === 'all' || p.type === pastFilter.value)));

const filteredDatabase = computed(() => {
  const term = searchTerm.value.trim().toLowerCase();
  return plantDatabase.filter(item => {
    const matchesFilter = databaseFilter.value === 'all' || item.type === databaseFilter.value;
    const matchesSearch = !term || item.name.toLowerCase().includes(term) || item.nameDutch.toLowerCase().includes(term) || item.scientific.toLowerCase().includes(term);
    return matchesFilter && matchesSearch;
  });
});

const stats = computed(() => {
  const harvested = plants.value.filter(p => p.status === 'harvested').length;
  const active = plants.value.filter(p => p.status !== 'harvested').length;
  const varieties = new Set(plants.value.map(p => p.name.toLowerCase())).size;
  return { total: plants.value.length, active, harvested, varieties };
});

const editingPlant = computed(() => plants.value.find(p => p.id === editingPlantId.value) || null);

const dailyTip = computed(() => {
  if (!activePlants.value.length) return null;
  const tip = careTips[tipIndex.value % careTips.length];
  if (!tip) return null;
  const lang = language.value as 'en' | 'nl';
  return {
    title: tip.title[lang] || tip.title.en,
    body: tip.body[lang] || tip.body.en
  };
});

interface Insight {
  icon: string;
  title: string;
  content: string;
  type?: string;
  plants?: string[];
}

const discoverInsights = computed(() => {
  const insights: Insight[] = [];
  const active = activePlants.value;
  if (!active.length) return insights;

  const waterNeeding = active.filter(p => p.water_frequency === 'daily');
  if (waterNeeding.length) {
    insights.push({
      icon: '💧',
      title: language.value === 'nl' ? 'Dagelijks water geven' : 'Daily watering',
      content: language.value === 'nl'
        ? `${waterNeeding.length} plant(en) hebben vandaag water nodig.`
        : `${waterNeeding.length} plant(s) need watering today.`,
      plants: waterNeeding.slice(0, 4).map(p => p.name)
    });
  }

  const readySoon = active.filter(p => p.harvest_date).slice(0, 3);
  if (readySoon.length) {
    insights.push({
      icon: '📅',
      title: language.value === 'nl' ? 'Komende oogst' : 'Upcoming harvests',
      content: readySoon.map(p => `${p.name} → ${formatDate(p.harvest_date)}`).join(' • '),
      plants: readySoon.map(p => p.name)
    });
  }

  const spaceTip = language.value === 'nl'
    ? 'Gebruik verticale steunen voor bonen en tomaten om ruimte te besparen.'
    : 'Use vertical supports for beans and tomatoes to save space.';
  insights.push({ icon: '🎯', title: language.value === 'nl' ? 'Ruimtebesparing' : 'Space saver', content: spaceTip });

  return insights;
});

const setPage = (page: string) => {
  currentPage.value = page;
};

const switchLanguage = () => {
  language.value = language.value === 'en' ? 'nl' : 'en';
};

const translateSunRequirement = (value: string) => {
  const lang = language.value as 'en' | 'nl';
  return sunTranslations[value as keyof typeof sunTranslations]?.[lang] || value;
};

const translateWaterFrequency = (value: string) => {
  const lang = language.value as 'en' | 'nl';
  return waterTranslations[value as keyof typeof waterTranslations]?.[lang] || value;
};

const translateStatus = (value: string) => {
  const lang = language.value as 'en' | 'nl';
  return statusTranslations[value as keyof typeof statusTranslations]?.[lang] || value;
};

const translatePlantType = (type: string) => {
  const map: Record<string, string> = {
    vegetable: t('vegetable'),
    fruit: t('fruit'),
    plant: t('plant'),
    tree: t('tree'),
    herb: t('herbs'),
    flower: t('flowers')
  };
  return map[type] || type;
};

const translateExperience = (value: string) => value ? t(value) : '—'
const translateGardenSize = (value: string) => value ? t(value) : '—'

const formatDate = (value: string) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(language.value === 'nl' ? 'nl-NL' : 'en-US');
};

const openAddModal = (plant: Plant | null = null) => {
  if (plant) {
    editingPlantId.value = plant.id;
    plantForm.value = { ...plant };
  } else {
    editingPlantId.value = null;
    plantForm.value = { ...blankPlant(), id: '', status: 'planning' };
  }
  showPlantModal.value = true;
};

const closePlantModal = () => {
  showPlantModal.value = false;
  editingPlantId.value = null;
  plantForm.value = blankPlant();
};

const savePlant = async () => {
  if (!plantForm.value.name) return;
  const isUpdate = Boolean(editingPlantId.value);
  const payload: Plant = {
    ...plantForm.value,
    id: plantForm.value.id || `plant-${Date.now()}`,
    data_type: 'plant',
    created_at: plantForm.value.created_at || new Date().toISOString()
  };

  const ok = await persistPlant(payload, isUpdate);
  if (ok) {
    if (isUpdate) {
      plants.value = plants.value.map(p => p.id === payload.id ? payload : p);
    } else {
      plants.value = [...plants.value, payload];
    }
    closePlantModal();
  }
};

const persistPlant = async (payload: Plant | UserProfile, isUpdate: boolean) => {
  if (window.dataSdk) {
    const result = isUpdate ? await window.dataSdk.update(payload) : await window.dataSdk.create(payload);
    return result?.isOk;
  }
  return true;
};

const deletePlant = async (plant: Plant) => {
  if (window.dataSdk) {
    const result = await window.dataSdk.delete(plant);
    if (!result?.isOk) return;
  }
  plants.value = plants.value.filter(p => p.id !== plant.id);
};

const openPlantDatabase = () => {
  showDatabaseModal.value = true;
};

const closePlantDatabase = () => {
  showDatabaseModal.value = false;
  searchTerm.value = '';
  databaseFilter.value = 'all';
};

const addPlantFromDatabase = async (template: PlantTemplate) => {
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
    notes: language.value === 'nl'
      ? `Toegevoegd uit plantendatabase. Wetenschappelijke naam: ${template.scientific}. Engels: ${template.name}`
      : `Added from plant database. Scientific name: ${template.scientific}. Dutch: ${template.nameDutch}`,
    status: 'planning',
    created_at: new Date().toISOString()
  } as Plant;
  const ok = await persistPlant(payload, false);
  if (ok) {
    plants.value = [...plants.value, payload];
    closePlantDatabase();
  }
};

const openProfileModal = () => {
  showProfileModal.value = true;
};

const closeProfileModal = () => {
  showProfileModal.value = false;
};

const saveProfile = async () => {
  const payload: UserProfile = { ...userProfile, data_type: 'profile' };
  if (window.dataSdk) {
    const result = userProfile.id ? await window.dataSdk.update(payload) : await window.dataSdk.create(payload);
    if (!result?.isOk) return;
  }
  showProfileModal.value = false;
};

const onDataChanged = (data: (Plant | UserProfile)[]) => {
  allData.value = data;
  plants.value = data.filter((item): item is Plant => item.data_type === 'plant');
  const profile = data.find((item): item is UserProfile => item.data_type === 'profile');
  if (profile) Object.assign(userProfile, profile);
};

const setupDataSdk = async () => {
  if (!window.dataSdk) {
    seedDemoData();
    return;
  }
  const result = await window.dataSdk.init({ onDataChanged: (data: (Plant | UserProfile)[]) => onDataChanged(data) });
  if (!result?.isOk) {
    seedDemoData();
  }
};

const setupElementSdk = () => {
  if (!window.elementSdk) return;
  window.elementSdk.init({
    defaultConfig,
    onConfigChange: (c: Partial<AppConfig>) => onConfigChange(c),
    mapToCapabilities: (c: Partial<AppConfig>) => ({
      recolorables: [
        {
          get: () => c.background_color || defaultConfig.background_color,
          set: (value: string) => {
            if (c) c.background_color = value;
            window.elementSdk?.setConfig({ background_color: value });
          }
        },
        {
          get: () => c.card_color || defaultConfig.card_color,
          set: (value: string) => {
            if (c) c.card_color = value;
            window.elementSdk?.setConfig({ card_color: value });
          }
        },
        {
          get: () => c.text_color || defaultConfig.text_color,
          set: (value: string) => {
            if (c) c.text_color = value;
            window.elementSdk?.setConfig({ text_color: value });
          }
        },
        {
          get: () => c.primary_action_color || defaultConfig.primary_action_color,
          set: (value: string) => {
            if (c) c.primary_action_color = value;
            window.elementSdk?.setConfig({ primary_action_color: value });
          }
        },
        {
          get: () => c.secondary_action_color || defaultConfig.secondary_action_color,
          set: (value: string) => {
            if (c) c.secondary_action_color = value;
            window.elementSdk?.setConfig({ secondary_action_color: value });
          }
        }
      ],
      borderables: [],
      fontEditable: {
        get: () => c.font_family || defaultConfig.font_family,
        set: (value: string) => {
          if (c) c.font_family = value;
          window.elementSdk?.setConfig({ font_family: value });
        }
      },
      fontSizeable: {
        get: () => c.font_size || defaultConfig.font_size,
        set: (value: number) => {
          if (c) c.font_size = value;
          window.elementSdk?.setConfig({ font_size: value });
        }
      }
    }),
    mapToEditPanelValues: (c: Partial<AppConfig>) => new Map([
      ['app_title', c.app_title || defaultConfig.app_title],
      ['subtitle', c.subtitle || defaultConfig.subtitle],
      ['add_button_text', c.add_button_text || defaultConfig.add_button_text],
      ['current_language', c.current_language || defaultConfig.current_language]
    ])
  });
};

const onConfigChange = (c: Partial<AppConfig>) => {
  config.value = { ...config.value, ...c };
  const langChoice = c.current_language || defaultConfig.current_language;
  language.value = langChoice === 'English' ? 'en' : 'nl';
  applyConfigStyles();
};

const applyConfigStyles = () => {
  document.body.style.background = `linear-gradient(135deg, ${config.value.background_color} 0%, ${config.value.secondary_action_color} 100%)`;
  document.documentElement.style.setProperty('--seasonal-card', config.value.card_color);
  document.documentElement.style.setProperty('--seasonal-text', config.value.text_color);
};

const applySeasonalTheme = () => {
  document.body.className = `seasonal-${currentSeason}`;
};

const seedDemoData = () => {
  plants.value = plantDatabase.slice(0, 4).map((plant, idx) => ({
    id: `seed-${idx}`,
    data_type: 'plant' as const,
    name: plant.name,
    type: plant.type,
    variety: '',
    planting_date: new Date().toISOString().slice(0, 10),
    harvest_date: '',
    storage_date: '',
    days_to_maturity: plant.daysToMaturity,
    planting_depth: plant.plantingDepth,
    spacing: plant.spacing,
    sun_requirement: plant.sunRequirement,
    water_frequency: plant.waterFrequency,
    soil_type: plant.soilType,
    notes: '',
    status: 'planning',
    created_at: new Date().toISOString()
  }));
};

onMounted(() => {
  applySeasonalTheme();
  applyConfigStyles();
  setupDataSdk();
  setupElementSdk();
});
</script>

<template>
  <div class="app-container">
    <nav class="navigation">
      <div class="nav-container">
        <a href="#" class="nav-brand" id="nav-brand">{{ config.app_title }}</a>
        <button class="language-toggle" id="language-toggle" @click="switchLanguage">{{ t('switchLanguage') }}</button>
        <ul class="nav-links">
          <li v-for="link in navLinks" :key="link.id">
            <a href="#" class="nav-link" :class="{ active: currentPage === link.id }" @click.prevent="setPage(link.id)">
              <span class="nav-icon">{{ link.icon }}</span>
              <span class="nav-text">{{ t(link.label) }}</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <main class="main-content">
      <div class="container">
        <!-- Discover Page -->
        <div id="discover" class="page" v-show="currentPage === 'discover'">
          <header class="header">
            <h1 id="app-title">{{ t('discoverTitle') }}</h1>
            <p id="app-subtitle">{{ t('discoverSubtitle') }}</p>
          </header>

          <div id="discover-content">
            <div v-if="activePlants.length === 0" class="empty-state">
              <div class="empty-state-icon">🌿</div>
              <h3>{{ t('welcomeMessage') }}</h3>
              <p>{{ t('addPlantsMessage') }}</p>
            </div>

            <template v-else>
              <div v-if="dailyTip" class="care-tip-card">
                <h3>💡 {{ dailyTip.title }}</h3>
                <p>{{ dailyTip.body }}</p>
              </div>

              <div class="discover-grid">
                <div class="insight-card" :class="{ 'ai-suggestion': insight.type === 'ai-suggestion' }"
                  v-for="insight in discoverInsights" :key="insight.title">
                  <div class="insight-header">
                    <span class="insight-icon">{{ insight.icon }}</span>
                    <h3 class="insight-title">{{ insight.title }}</h3>
                  </div>
                  <div class="insight-content">{{ insight.content }}</div>
                  <div v-if="insight.plants && insight.plants.length" class="insight-plants">
                    <span class="plant-tag" v-for="plant in insight.plants" :key="plant">{{ plant }}</span>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- My Garden Page -->
        <div id="my-garden" class="page" v-show="currentPage === 'my-garden'">
          <header class="header">
            <h1>{{ t('myGardenTitle') }}</h1>
            <p>{{ t('myGardenSubtitle') }}</p>
          </header>

          <div class="controls">
            <div class="button-group">
              <button class="button button-primary add-button" id="add-plant-btn" @click="openAddModal()">
                <span id="add-button-text">{{ t('addNewPlant') }}</span>
              </button>
              <button class="button button-secondary" id="browse-plants-btn" @click="openPlantDatabase">
                <span id="browse-button-text">🌿 {{ t('browseDatabase') }}</span>
              </button>
            </div>
            <div class="filter-controls">
              <span class="filter-label">{{ t('filterBy') }}</span>
              <div class="filter-buttons">
                <button class="filter-chip" :class="{ active: plantFilter === 'all' }" @click="plantFilter = 'all'">{{
                  t('all') }}</button>
                <button class="filter-chip" :class="{ active: plantFilter === 'planning' }"
                  @click="plantFilter = 'planning'">{{ t('planning') }}</button>
                <button class="filter-chip" :class="{ active: plantFilter === 'planted' }"
                  @click="plantFilter = 'planted'">{{ t('planted') }}</button>
                <button class="filter-chip" :class="{ active: plantFilter === 'growing' }"
                  @click="plantFilter = 'growing'">{{ t('growing') }}</button>
                <button class="filter-chip" :class="{ active: plantFilter === 'ready' }"
                  @click="plantFilter = 'ready'">{{ t('ready') }}</button>
              </div>
            </div>
          </div>

          <div class="plant-grid" id="plant-grid">
            <div v-if="filteredPlants.length === 0" class="empty-state">
              <div class="empty-state-icon">🌱</div>
              <h3>{{ t('noPlantsTitle') }}</h3>
              <p>{{ t('noPlantsMessage') }}</p>
            </div>

            <article class="plant-card" v-for="plant in filteredPlants" :key="plant.id">
              <div class="plant-card-header">
                <div>
                  <div class="plant-emoji">🌱</div>
                  <h3>{{ plant.name }}</h3>
                  <p class="info-label">{{ translatePlantType(plant.type) }}</p>
                </div>
                <span class="status-badge" :class="plant.status">{{ translateStatus(plant.status) }}</span>
              </div>
              <div class="plant-info">
                <div class="info-row">
                  <span class="info-label">{{ t('sunRequirement') }}</span>
                  <span class="info-value">{{ translateSunRequirement(plant.sun_requirement) }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">{{ t('waterFrequency') }}</span>
                  <span class="info-value">{{ translateWaterFrequency(plant.water_frequency) }}</span>
                </div>
                <div class="info-row" v-if="plant.harvest_date">
                  <span class="info-label">{{ t('expectedHarvest') }}</span>
                  <span class="info-value">{{ formatDate(plant.harvest_date) }}</span>
                </div>
              </div>
              <div class="card-actions">
                <button class="button button-secondary" @click="openAddModal(plant)">{{ t('edit') }}</button>
                <button class="button button-primary" @click="deletePlant(plant)">{{ t('delete') }}</button>
              </div>
            </article>
          </div>
        </div>

        <!-- Past Plants Page -->
        <div id="past-plants" class="page" v-show="currentPage === 'past-plants'">
          <header class="header">
            <h1>{{ t('pastPlantsTitle') }}</h1>
            <p>{{ t('pastPlantsSubtitle') }}</p>
          </header>

          <div class="filter-controls">
            <span class="filter-label">{{ t('filterBy') }}</span>
            <div class="filter-buttons">
              <button class="filter-button" :class="{ active: pastFilter === 'all' }" @click="pastFilter = 'all'">{{
                t('all') }}</button>
              <button class="filter-button" :class="{ active: pastFilter === 'vegetable' }"
                @click="pastFilter = 'vegetable'">{{ t('vegetables') }}</button>
              <button class="filter-button" :class="{ active: pastFilter === 'fruit' }" @click="pastFilter = 'fruit'">{{
                t('fruits') }}</button>
              <button class="filter-button" :class="{ active: pastFilter === 'plant' }" @click="pastFilter = 'plant'">{{
                t('plants') }}</button>
              <button class="filter-button" :class="{ active: pastFilter === 'tree' }" @click="pastFilter = 'tree'">{{
                t('trees') }}</button>
              <button class="filter-button" :class="{ active: pastFilter === 'herb' }" @click="pastFilter = 'herb'">{{
                t('herbs') }}</button>
              <button class="filter-button" :class="{ active: pastFilter === 'flower' }"
                @click="pastFilter = 'flower'">{{ t('flowers') }}</button>
            </div>
          </div>

          <div class="plant-grid" id="past-plants-grid">
            <div v-if="filteredPastPlants.length === 0" class="empty-state">
              <div class="empty-state-icon">📚</div>
              <h3>{{ t('noPastPlantsTitle') }}</h3>
              <p>{{ t('noPastPlantsMessage') }}</p>
            </div>

            <article class="plant-card" v-for="plant in filteredPastPlants" :key="plant.id">
              <div class="plant-card-header">
                <div>
                  <div class="plant-emoji">🍃</div>
                  <h3>{{ plant.name }}</h3>
                  <p class="info-label">{{ translatePlantType(plant.type) }}</p>
                </div>
                <span class="status-badge harvested">{{ translateStatus('harvested') }}</span>
              </div>
              <div class="plant-info">
                <div class="info-row">
                  <span class="info-label">{{ t('plantingDate') }}</span>
                  <span class="info-value">{{ formatDate(plant.planting_date) }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">{{ t('expectedHarvest') }}</span>
                  <span class="info-value">{{ formatDate(plant.harvest_date) }}</span>
                </div>
                <div class="info-row" v-if="plant.storage_date">
                  <span class="info-label">{{ t('storageDate') }}</span>
                  <span class="info-value">{{ formatDate(plant.storage_date) }}</span>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Profile Page -->
        <div id="profile" class="page" v-show="currentPage === 'profile'">
          <header class="header">
            <h1>{{ t('profileTitle') }}</h1>
            <p>{{ t('profileSubtitle') }}</p>
          </header>

          <section class="profile-card">
            <div class="profile-header">
              <div>
                <h2>{{ userProfile.name || t('profileTitle') }}</h2>
                <p>{{ userProfile.bio || t('profileSubtitle') }}</p>
              </div>
              <button class="button button-secondary" id="edit-profile-btn" @click="openProfileModal">{{
                t('editProfile') }}</button>
            </div>

            <div class="profile-grid">
              <div class="profile-info">
                <h3>{{ t('email') }}</h3>
                <p>{{ userProfile.email || '—' }}</p>
              </div>
              <div class="profile-info">
                <h3>{{ t('location') }}</h3>
                <p>{{ userProfile.location || '—' }}</p>
              </div>
              <div class="profile-info">
                <h3>{{ t('experience') }}</h3>
                <p>{{ translateExperience(userProfile.experience) }}</p>
              </div>
              <div class="profile-info">
                <h3>{{ t('gardenSize') }}</h3>
                <p>{{ translateGardenSize(userProfile.garden_size) }}</p>
              </div>
            </div>
          </section>

          <section class="stats-grid">
            <div class="stat-card">
              <div class="stat-number">{{ stats.total }}</div>
              <div class="stat-label">{{ t('totalPlants') }}</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">{{ stats.active }}</div>
              <div class="stat-label">{{ t('activePlants') }}</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">{{ stats.harvested }}</div>
              <div class="stat-label">{{ t('harvestedPlants') }}</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">{{ stats.varieties }}</div>
              <div class="stat-label">{{ t('varieties') }}</div>
            </div>
          </section>
        </div>
      </div>
    </main>

    <!-- Plant Modal -->
    <div id="plant-modal" class="modal" :class="{ active: showPlantModal }" @click.self="closePlantModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ editingPlant ? t('editPlantTitle') : t('addNewPlantTitle') }}</h2>
          <button class="close-button" id="close-modal" @click="closePlantModal">×</button>
        </div>
        <form id="plant-form" @submit.prevent="savePlant">
          <div class="form-row">
            <div class="form-group">
              <label for="plant-name">{{ t('plantName') }}</label>
              <input id="plant-name" v-model="plantForm.name" required>
            </div>
            <div class="form-group">
              <label for="plant-type">{{ t('type') }}</label>
              <select id="plant-type" v-model="plantForm.type">
                <option value="vegetable">{{ t('vegetable') }}</option>
                <option value="fruit">{{ t('fruit') }}</option>
                <option value="plant">{{ t('plant') }}</option>
                <option value="tree">{{ t('tree') }}</option>
                <option value="herb">{{ t('herbs') }}</option>
                <option value="flower">{{ t('flowers') }}</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="planting-date">{{ t('plantingDate') }}</label>
              <input type="date" id="planting-date" v-model="plantForm.planting_date">
            </div>
            <div class="form-group">
              <label for="harvest-date">{{ t('expectedHarvest') }}</label>
              <input type="date" id="harvest-date" v-model="plantForm.harvest_date">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="sun-requirement">{{ t('sunRequirement') }}</label>
              <select id="sun-requirement" v-model="plantForm.sun_requirement">
                <option value="full-sun">{{ translateSunRequirement('full-sun') }}</option>
                <option value="partial-sun">{{ translateSunRequirement('partial-sun') }}</option>
                <option value="partial-shade">{{ translateSunRequirement('partial-shade') }}</option>
                <option value="full-shade">{{ translateSunRequirement('full-shade') }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="water-frequency">{{ t('waterFrequency') }}</label>
              <select id="water-frequency" v-model="plantForm.water_frequency">
                <option value="daily">{{ translateWaterFrequency('daily') }}</option>
                <option value="every-2-days">{{ translateWaterFrequency('every-2-days') }}</option>
                <option value="twice-weekly">{{ translateWaterFrequency('twice-weekly') }}</option>
                <option value="weekly">{{ translateWaterFrequency('weekly') }}</option>
                <option value="as-needed">{{ translateWaterFrequency('as-needed') }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="plant-status">{{ t('status') }}</label>
              <select id="plant-status" v-model="plantForm.status">
                <option value="planning">{{ t('planning') }}</option>
                <option value="planted">{{ t('planted') }}</option>
                <option value="growing">{{ t('growing') }}</option>
                <option value="ready">{{ t('ready') }}</option>
                <option value="harvested">{{ t('harvested') }}</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="plant-notes">{{ t('notes') }}</label>
            <textarea id="plant-notes" v-model="plantForm.notes" :placeholder="t('notesPlaceholder')"></textarea>
          </div>

          <div class="form-actions">
            <button type="button" class="button button-secondary" id="cancel-btn" @click="closePlantModal">{{
              t('cancel') }}</button>
            <button type="submit" class="button button-primary" id="submit-btn">
              <span id="submit-text">{{ editingPlant ? t('saveChanges') : t('addPlant') }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Plant Database Modal -->
    <div id="plant-database-modal" class="modal" :class="{ active: showDatabaseModal }"
      @click.self="closePlantDatabase">
      <div class="modal-content database-modal">
        <div class="modal-header">
          <h2 id="database-modal-title">{{ t('plantDatabase') }}</h2>
          <button class="close-button" id="close-database-modal" @click="closePlantDatabase">×</button>
        </div>
        <div class="database-search">
          <input type="text" id="plant-search" v-model="searchTerm" :placeholder="t('searchPlantsPlaceholder')"
            class="search-input">
          <div class="database-filters">
            <button class="filter-button" :class="{ active: databaseFilter === 'all' }" data-db-filter="all"
              @click="databaseFilter='all'">{{ t('all') }}</button>
            <button class="filter-button" :class="{ active: databaseFilter === 'vegetable' }" data-db-filter="vegetable"
              @click="databaseFilter='vegetable'">{{ t('vegetables') }}</button>
            <button class="filter-button" :class="{ active: databaseFilter === 'fruit' }" data-db-filter="fruit"
              @click="databaseFilter='fruit'">{{ t('fruits') }}</button>
            <button class="filter-button" :class="{ active: databaseFilter === 'herb' }" data-db-filter="herb"
              @click="databaseFilter='herb'">{{ t('herbs') }}</button>
            <button class="filter-button" :class="{ active: databaseFilter === 'flower' }" data-db-filter="flower"
              @click="databaseFilter='flower'">{{ t('flowers') }}</button>
          </div>
        </div>
        <div id="plant-database-grid" class="database-grid">
          <div v-if="filteredDatabase.length === 0" class="empty-state" style="grid-column: 1 / -1;">
            <h3>{{ t('noResultsTitle') }}</h3>
            <p>{{ t('noResultsMessage') }}</p>
          </div>

          <div class="database-plant-card" v-for="item in filteredDatabase" :key="item.name"
            @click="addPlantFromDatabase(item)">
            <div class="database-plant-header">
              <div>
                <h4 class="database-plant-name">{{ language === 'nl' ? item.nameDutch : item.name }}</h4>
                <p class="database-plant-scientific">{{ item.scientific }}</p>
              </div>
              <span class="database-plant-emoji">{{ item.emoji }}</span>
            </div>
            <div class="database-plant-info">
              <div class="database-info-row">
                <span class="database-info-label">{{ t('type') }}</span>
                <span class="database-info-value">{{ translatePlantType(item.type) }}</span>
              </div>
              <div class="database-info-row">
                <span class="database-info-label">{{ t('daysToMaturity') }}</span>
                <span class="database-info-value">{{ item.daysToMaturity }}</span>
              </div>
              <div class="database-info-row">
                <span class="database-info-label">{{ t('sunRequirement') }}</span>
                <span class="database-info-value">{{ translateSunRequirement(item.sunRequirement) }}</span>
              </div>
              <div class="database-info-row">
                <span class="database-info-label">{{ t('waterFrequency') }}</span>
                <span class="database-info-value">{{ translateWaterFrequency(item.waterFrequency) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Profile Modal -->
    <div id="profile-modal" class="modal" :class="{ active: showProfileModal }" @click.self="closeProfileModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ t('profileTitle') }}</h2>
          <button class="close-button" id="close-profile-modal" @click="closeProfileModal">×</button>
        </div>
        <form id="profile-form" @submit.prevent="saveProfile">
          <div class="form-group">
            <label for="user-name">{{ t('name') }}</label>
            <input type="text" id="user-name" v-model="userProfile.name" required placeholder="Your name">
          </div>
          <div class="form-group">
            <label for="user-email">{{ t('email') }}</label>
            <input type="email" id="user-email" v-model="userProfile.email" placeholder="your.email@example.com">
          </div>
          <div class="form-group">
            <label for="user-location">{{ t('location') }}</label>
            <input type="text" id="user-location" v-model="userProfile.location" placeholder="City, State/Country">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="user-experience">{{ t('experience') }}</label>
              <select id="user-experience" v-model="userProfile.experience">
                <option value="">{{ t('selectLevel') }}</option>
                <option value="beginner">{{ t('beginner') }}</option>
                <option value="intermediate">{{ t('intermediate') }}</option>
                <option value="advanced">{{ t('advanced') }}</option>
                <option value="expert">{{ t('expert') }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="user-garden-size">{{ t('gardenSize') }}</label>
              <select id="user-garden-size" v-model="userProfile.garden_size">
                <option value="">{{ t('selectSize') }}</option>
                <option value="container">{{ t('container') }}</option>
                <option value="small">{{ t('small') }}</option>
                <option value="medium">{{ t('medium') }}</option>
                <option value="large">{{ t('large') }}</option>
                <option value="farm">{{ t('farm') }}</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label for="user-bio">{{ t('bio') }}</label>
            <textarea id="user-bio" v-model="userProfile.bio"
              placeholder="Tell us about your gardening journey..."></textarea>
          </div>
          <div class="form-actions">
            <button type="button" class="button button-secondary" id="cancel-profile-btn" @click="closeProfileModal">{{
              t('cancel') }}</button>
            <button type="submit" class="button button-primary" id="save-profile-btn">
              <span id="save-profile-text">{{ t('saveProfile') }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
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
</style>

<style scoped>
/* ==========================================================================
   1. GLOBAL & RESET
   ========================================================================== */
[v-cloak] {
  display: none;
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



.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.main-content {
  flex: 1;
  padding: 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* ==========================================================================
   2. SEASONAL THEMES
   ========================================================================== */
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

/* ==========================================================================
   3. NAVIGATION
   ========================================================================== */
.navigation {
  background: rgba(248, 250, 252, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;

  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-brand {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--seasonal-primary);
    text-decoration: none;
  }

  .nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-link {
    color: var(--seasonal-text);
    text-decoration: none;
    font-weight: 500;
    padding: 0.75rem 1rem;
    border-radius: 12px;
    transition: all 0.2s;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    min-width: 60px;

    &:hover {
      background: rgba(var(--seasonal-primary-rgb), 0.1);
      color: var(--seasonal-primary);
    }

    &.active {
      background: var(--seasonal-primary);
      color: white;
    }
  }

  .nav-icon {
    font-size: 1.5rem;
  }

  .nav-text {
    font-size: 0.75rem;
    font-weight: 600;
  }
}

.language-toggle {
  background: rgba(var(--seasonal-primary-rgb), 0.1);
  border: 2px solid var(--seasonal-primary);
  color: var(--seasonal-primary);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: var(--seasonal-primary);
    color: white;
  }
}

/* ==========================================================================
   4. COMMON COMPONENTS (Shared across pages)
   ========================================================================== */
.button {
  display: inline-block;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
  text-decoration: none;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &-primary {
    background: var(--seasonal-primary);
    color: white;
    &:hover:not(:disabled) {
      background: var(--seasonal-secondary);
    }
  }

  &-secondary {
    background: rgba(var(--seasonal-text-rgb), 0.1);
    color: var(--seasonal-text);
    &:hover:not(:disabled) {
      background: rgba(var(--seasonal-text-rgb), 0.15);
    }
  }

  &-danger {
    background: #ef4444;
    color: white;
    &:hover:not(:disabled) {
      background: #dc2626;
    }
  }
}

.add-button {
  background: var(--seasonal-primary);
  color: white;
  border: none;
  padding: 0.875rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;

  &:hover {
    background: var(--seasonal-secondary);
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;

  &.planning { background: rgba(var(--seasonal-primary-rgb), 0.1); color: var(--seasonal-primary); }
  &.planted { background: rgba(var(--seasonal-secondary-rgb), 0.1); color: var(--seasonal-secondary); }
  &.growing { background: rgba(var(--seasonal-primary-rgb), 0.15); color: var(--seasonal-primary); }
  &.ready { background: rgba(var(--seasonal-secondary-rgb), 0.15); color: var(--seasonal-secondary); }
  &.harvested { background: rgba(var(--seasonal-text-rgb), 0.1); color: var(--seasonal-text); }
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--seasonal-card);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  .empty-state-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0 0 0.5rem 0;
    color: var(--seasonal-text);
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    color: var(--seasonal-text);
    opacity: 0.7;
    font-size: 1rem;
  }
}

/* ==========================================================================
   5. DISCOVER PAGE
   ========================================================================== */
.discover-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.insight-card {
  background: var(--seasonal-card);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-left: 4px solid var(--seasonal-primary);
  position: relative;

  &.ai-suggestion {
    background: linear-gradient(135deg, rgba(var(--seasonal-primary-rgb), 0.05) 0%, rgba(var(--seasonal-primary-rgb), 0.1) 100%);
    border-left: 4px solid var(--seasonal-primary);
    box-shadow: 0 4px 12px rgba(var(--seasonal-primary-rgb), 0.15);

    &::before {
      content: "🤖 AI";
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      background: var(--seasonal-primary);
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 6px;
      font-size: 0.625rem;
      font-weight: 700;
      letter-spacing: 0.05em;
    }
  }

  .insight-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .insight-icon {
    font-size: 1.5rem;
  }

  .insight-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--seasonal-text);
    margin: 0;
  }

  .insight-content {
    color: var(--seasonal-text);
    opacity: 0.8;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .insight-plants {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}

.plant-tag {
  background: rgba(var(--seasonal-text-rgb), 0.1);
  color: var(--seasonal-text);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.care-tip-card {
  background: linear-gradient(135deg, var(--seasonal-primary), var(--seasonal-secondary));
  color: white;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  margin-bottom: 2rem;

  h3 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    opacity: 0.9;
    font-size: 1.1rem;
  }
}

/* ==========================================================================
   6. MY GARDEN & PAST PLANTS PAGE
   ========================================================================== */
.plant-grid, .plants-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.plant-card {
  background: var(--seasonal-card);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  .plant-header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 1rem;
    border-bottom: 2px solid #f3f4f6;
    padding-bottom: 1rem;
  }

  .plant-title {
    flex: 1;
    h3 {
      margin: 0 0 0.25rem 0;
      font-size: 1.25rem;
      color: var(--seasonal-text);
    }
  }

  .plant-info {
    display: grid;
    gap: 0.75rem;
    font-size: 0.875rem;
  }

  .info-row {
    display: flex;
    align-items: start;
    gap: 0.5rem;
  }

  .info-label {
    font-weight: 600;
    color: var(--seasonal-text);
    opacity: 0.7;
    min-width: 100px;
  }

  .info-value {
    color: var(--seasonal-text);
    flex: 1;
  }
}

.plant-type {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 0.25rem;

  &.type-vegetable { background: rgba(var(--seasonal-primary-rgb), 0.1); color: var(--seasonal-primary); }
  &.type-fruit { background: rgba(var(--seasonal-secondary-rgb), 0.1); color: var(--seasonal-secondary); }
  &.type-plant { background: rgba(var(--seasonal-primary-rgb), 0.15); color: var(--seasonal-primary); }
  &.type-tree { background: rgba(var(--seasonal-secondary-rgb), 0.15); color: var(--seasonal-secondary); }
}

.filter-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.filter-button, .filter-chip {
  padding: 0.5rem 1rem;
  border: 2px solid rgba(var(--seasonal-text-rgb), 0.2);
  background: var(--seasonal-card);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--seasonal-text);

  &:hover {
    border-color: var(--seasonal-primary);
    color: var(--seasonal-primary);
  }

  &.active {
    background: var(--seasonal-primary);
    border-color: var(--seasonal-primary);
    color: white;
  }
}

/* ==========================================================================
   7. PROFILE PAGE
   ========================================================================== */
.profile-card {
  background: var(--seasonal-card);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;

  .profile-header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 2px solid rgba(var(--seasonal-text-rgb), 0.1);
  }

  .profile-info {
    h2 {
      margin: 0 0 0.5rem 0;
      color: var(--seasonal-text);
      font-size: 1.75rem;
    }
    p {
      margin: 0;
      color: var(--seasonal-text);
      opacity: 0.7;
      font-size: 1rem;
    }
  }
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--seasonal-background), var(--seasonal-background-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  font-weight: 700;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: var(--seasonal-card);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;

  .stat-number {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--seasonal-primary);
    margin-bottom: 0.5rem;
  }

  .stat-label {
    color: var(--seasonal-text);
    opacity: 0.7;
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
}

/* ==========================================================================
   8. MODALS & FORMS
   ========================================================================== */
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  overflow-y: auto;
  padding: 2rem;

  &.active {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-content {
    background: var(--seasonal-card);
    border-radius: 12px;
    padding: 2rem;
    max-width: 600px;
    width: 100%;
    max-height: 90%;
    overflow-y: auto;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid rgba(var(--seasonal-text-rgb), 0.1);

    h2 {
      margin: 0;
      font-size: 1.5rem;
      color: var(--seasonal-text);
    }
  }
}

.database-modal {
  max-width: 900px;
  max-height: 85%;

  .database-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
    max-height: 400px;
    overflow-y: auto;
    padding: 0.5rem;
  }
}

.search-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid rgba(var(--seasonal-text-rgb), 0.2);
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 1rem;
  background: var(--seasonal-card);
  color: var(--seasonal-text);

  &:focus {
    outline: none;
    border-color: var(--seasonal-primary);
  }
}

.form-group {
  margin-bottom: 1.25rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--seasonal-text);
    font-size: 0.875rem;
  }

  input, select, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid rgba(var(--seasonal-text-rgb), 0.2);
    border-radius: 8px;
    font-size: 0.875rem;
    font-family: inherit;
    transition: border-color 0.2s;
    background: var(--seasonal-card);
    color: var(--seasonal-text);

    &:focus {
      outline: none;
      border-color: var(--seasonal-primary);
    }
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 2px solid #f3f4f6;
}

/* ==========================================================================
   9. MISC & ANIMATIONS
   ========================================================================== */
.loading-spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid #ffffff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  margin-right: 0.5rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.limit-warning {
  background: #fef3c7;
  border: 2px solid #fbbf24;
  color: #92400e;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .navigation {
    position: fixed;
    bottom: 0;
    top: auto;
    left: 0;
    right: 0;
    border-bottom: none;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding: 0.75rem 0;

    .nav-container {
      padding: 0 1rem;
      justify-content: center;
    }

    .nav-brand {
      display: none;
    }

    .nav-links {
      gap: 1rem;
      width: 100%;
      justify-content: space-around;
      & > * {
         flex: 1;
         max-width: 80px;
      }
    }

    .nav-link {
      padding: 0.5rem;
      min-width: auto;
      font-size: 0.875rem; /* Restored */
    }

    .nav-icon { font-size: 1.25rem; }
    .nav-text { font-size: 0.625rem; }
  }

  .language-toggle {
    position: absolute;
    top: 0.75rem;
    right: 1rem;
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
  }

  .main-content {
    padding: 1rem;
    padding-bottom: 6rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .profile-header {
    flex-direction: column;
    text-align: center;
  }

  .filter-controls {
    justify-content: center;
  }
}

@view-transition { navigation: auto; }

</style>
