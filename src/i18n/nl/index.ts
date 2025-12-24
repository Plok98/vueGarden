import { navigation } from './navigation'
import { pages } from './pages'
import {
  plants,
  sunTranslations,
  waterTranslations,
  statusTranslations,
  typeTranslations,
} from './plants'
import { profile, experienceTranslations, gardenSizeTranslations } from './profile'
import { common } from './common'

export const nlTranslations = {
  ...navigation,
  ...pages,
  ...plants,
  ...profile,
  ...common,
}

export {
  sunTranslations,
  waterTranslations,
  statusTranslations,
  typeTranslations,
  experienceTranslations,
  gardenSizeTranslations,
}
