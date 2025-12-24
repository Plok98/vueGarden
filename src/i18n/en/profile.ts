import type { TranslationSet } from '@/types'

export const profile: TranslationSet = {
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
}

export const experienceTranslations: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
}

export const gardenSizeTranslations: Record<string, string> = {
  container: 'Container Garden',
  small: 'Small (< 100 sq ft)',
  medium: 'Medium (100-500 sq ft)',
  large: 'Large (500+ sq ft)',
  farm: 'Farm/Commercial',
}
