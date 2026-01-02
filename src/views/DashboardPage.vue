<template>
  <div class="page">
    <header class="header">
      <div class="header-content">
        <div class="header-titles">
          <h1>{{ t('profileTitle') }}</h1>
          <p>{{ t('profileSubtitle') }}</p>
        </div>
        <button class="button edit-profile-btn" @click="$emit('editProfile')">
          <i class="bi bi-pencil-square"></i>
          {{ t('editProfile') }}
        </button>
      </div>
    </header>


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
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTranslations } from '@/composables/useTranslations'
import { useUserPlantsStore } from '@/stores/userPlants'

defineEmits<{
  editProfile: []
}>()

const { t } = useTranslations()
const userPlantsStore = useUserPlantsStore()

const stats = computed(() => userPlantsStore.stats)
</script>

<style scoped>
.header {
  margin-bottom: 2.5rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1.5rem;
}

.header-titles {
  flex: 1;
}

.header h1 {
  font-size: 2.5rem;
  color: white;
  margin: 0 0 0.25rem 0;
  line-height: 1.2;
}

.header p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  margin: 0;
}

.edit-profile-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: var(--seasonal-primary);
  color: #fff;
  border: none;
  font-size: 0.9375rem;
  font-weight: 700;
  transition: all 0.2s;
}

.edit-profile-btn:hover {
  transform: translateY(-2px);
}



.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: var(--seasonal-card);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

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

.button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.button-secondary {
  background: rgba(var(--seasonal-text-rgb), 0.1);
  color: var(--seasonal-text);
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .edit-profile-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
