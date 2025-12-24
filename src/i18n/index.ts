import type { Translations } from '@/types'
import * as en from './en'
import * as nl from './nl'
import { careTips } from './en/tips'

export const translations: Translations = {
  en: en.enTranslations,
  nl: nl.nlTranslations,
}

// Helper to merge lookup tables for useTranslations.ts
function mergeLookups(enLookup: Record<string, string>, nlLookup: Record<string, string>) {
  const merged: Record<string, { en: string; nl: string }> = {}
  const allKeys = new Set([...Object.keys(enLookup), ...Object.keys(nlLookup)])
  allKeys.forEach((key) => {
    merged[key] = {
      en: enLookup[key] || '',
      nl: nlLookup[key] || '',
    }
  })
  return merged
}

export const sunTranslations = mergeLookups(en.sunTranslations, nl.sunTranslations)
export const waterTranslations = mergeLookups(en.waterTranslations, nl.waterTranslations)
export const statusTranslations = mergeLookups(en.statusTranslations, nl.statusTranslations)
export const typeTranslations = mergeLookups(en.typeTranslations, nl.typeTranslations)
export const experienceTranslations = mergeLookups(
  en.experienceTranslations,
  nl.experienceTranslations,
)
export const gardenSizeTranslations = mergeLookups(
  en.gardenSizeTranslations,
  nl.gardenSizeTranslations,
)

export { careTips }
