<template>
  <div class="page">
    <header class="header">
      <h1>{{ t('discoverTitle') }}</h1>
      <p>{{ t('discoverSubtitle') }}</p>
    </header>

    <div id="discover-content">
      <EmptyState
        v-if="activePlants.length === 0"
        icon="🌿"
        :title="t('welcomeMessage')"
        :message="t('addPlantsMessage')"
      />

      <template v-else>
        <div v-if="dailyTip" class="care-tip-card">
          <h3>💡 {{ dailyTip.title }}</h3>
          <p>{{ dailyTip.body }}</p>
        </div>

        <div class="discover-grid">
          <div
            class="insight-card"
            :class="{ 'ai-suggestion': insight.type === 'ai-suggestion' }"
            v-for="insight in discoverInsights"
            :key="insight.title"
          >
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
</template>

<script setup lang="ts">
import { computed } from 'vue'
import EmptyState from '@/components/EmptyState.vue'
import { useTranslations } from '@/composables/useTranslations'
import { useUserPlantsStore } from '@/stores/userPlants'
import { usePlantDatabaseStore } from '@/stores/plantDatabase'
import type { Insight, PlantTemplate } from '@/types'

const { t, dailyTip, language } = useTranslations()
const userPlantsStore = useUserPlantsStore()
const plantDatabaseStore = usePlantDatabaseStore()

const activePlants = computed(() => userPlantsStore.activePlants)

const discoverInsights = computed((): Insight[] => {
  const insights: Insight[] = []
  const plants = activePlants.value

  // Time to Plant! (Checking from Database)
  const currentMonthIndex = new Date().getMonth()
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  const seasonalPlants = plantDatabaseStore.plantDatabase.filter((p: PlantTemplate) => {
    const startIndex = monthNames.indexOf(p.plantingStartDate)
    const endIndex = monthNames.indexOf(p.plantingEndDate)

    if (startIndex <= endIndex) {
      return currentMonthIndex >= startIndex && currentMonthIndex <= endIndex
    } else {
      // Wrap around case (e.g., October to March)
      return currentMonthIndex >= startIndex || currentMonthIndex <= endIndex
    }
  })

  if (seasonalPlants.length > 0) {
    insights.push({
      icon: '🌱',
      title: t('timeToPlant'),
      content: t('canBePlantedNow'),
      plants: seasonalPlants.slice(0, 5).map((p: PlantTemplate) => language.value === 'nl' ? p.nameDutch : p.name)
    })
  }

  if (plants.length === 0) return insights

  // Water reminder
  const needsWater = plants.filter(p => p.water_frequency === 'daily')
  if (needsWater.length > 0) {
    insights.push({
      icon: '💧',
      title: language.value === 'nl' ? 'Water Vandaag' : 'Water Today',
      content: language.value === 'nl'
        ? `${needsWater.length} planten hebben dagelijks water nodig`
        : `${needsWater.length} plants need daily watering`,
      plants: needsWater.map(p => p.name)
    })
  }

  // Ready to harvest
  const ready = plants.filter(p => p.status === 'ready')
  if (ready.length > 0) {
    insights.push({
      icon: '🎉',
      title: language.value === 'nl' ? 'Klaar voor Oogst' : 'Ready to Harvest',
      content: language.value === 'nl'
        ? `${ready.length} planten zijn klaar om te oogsten!`
        : `${ready.length} plants are ready to harvest!`,
      plants: ready.map(p => p.name)
    })
  }

  // Growing summary
  const growing = plants.filter(p => p.status === 'growing')
  if (growing.length > 0) {
    insights.push({
      icon: '🌱',
      title: language.value === 'nl' ? 'Actief Groeiend' : 'Actively Growing',
      content: language.value === 'nl'
        ? `${growing.length} planten groeien momenteel`
        : `${growing.length} plants are currently growing`,
      plants: growing.map(p => p.name)
    })
  }

  // AI suggestion placeholder
  insights.push({
    icon: '🤖',
    title: language.value === 'nl' ? 'Aanbeveling' : 'Recommendation',
    content: language.value === 'nl'
      ? 'Overweeg om basilicum bij je tomaten te planten voor een betere groei.'
      : 'Consider planting basil near your tomatoes for better growth.',
    type: 'ai-suggestion'
  })

  return insights
})
</script>

<style scoped>
.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 2.5rem;
  color: white;
  margin: 0 0 0.5rem 0;
}

.header p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  margin: 0;
}

.care-tip-card {
  background: linear-gradient(135deg, var(--seasonal-primary), var(--seasonal-secondary));
  color: white;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  margin-bottom: 2rem;
}

.care-tip-card h3 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
}

.care-tip-card p {
  margin: 0;
  opacity: 0.9;
  font-size: 1.1rem;
}

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
}

.insight-card.ai-suggestion {
  background: linear-gradient(135deg, rgba(var(--seasonal-primary-rgb), 0.05) 0%, rgba(var(--seasonal-primary-rgb), 0.1) 100%);
  box-shadow: 0 4px 12px rgba(var(--seasonal-primary-rgb), 0.15);
}

.insight-card.ai-suggestion::before {
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

.plant-tag {
  background: rgba(var(--seasonal-text-rgb), 0.1);
  color: var(--seasonal-text);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}
</style>
