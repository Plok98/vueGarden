import type { TranslationSet } from '@/types'

export const profile: TranslationSet = {
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
}

export const experienceTranslations: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Gevorderd',
  advanced: 'Ervaren',
  expert: 'Expert',
}

export const gardenSizeTranslations: Record<string, string> = {
  container: 'Balkon / container',
  small: 'Klein (< 10 m²)',
  medium: 'Middel (10-50 m²)',
  large: 'Groot (50+ m²)',
  farm: 'Boerderij',
}
