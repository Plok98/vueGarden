<template>
  <div class="page">
    <header class="header">
      <h1>{{ t('profileTitle') }}</h1>
      <p>{{ t('profileSubtitle') }}</p>
    </header>

    <section class="profile-card">
      <div class="profile-header">
        <div class="profile-avatar">
          {{ userProfile.name ? userProfile.name.charAt(0).toUpperCase() : '' }}
          <i v-if="!userProfile.name" class="bi bi-person-fill"></i>
        </div>
        <div class="profile-info">
          <h2>{{ userProfile.name || t('profileTitle') }}</h2>
          <p>{{ userProfile.bio || t('profileSubtitle') }}</p>
        </div>
        <div class="profile-actions">
          <button class="button button-secondary" @click="$emit('editProfile')">
            {{ t('editProfile') }}
          </button>
          <button type="button" class="lang-switch-btn mobile-only" @click="switchLanguage">
            <i class="bi bi-globe"></i>
            {{ language === 'en' ? 'NL' : 'EN' }}
          </button>
        </div>
      </div>

      <div class="profile-grid">
        <div class="profile-detail">
          <h3>{{ t('email') }}</h3>
          <p>{{ userProfile.email || '—' }}</p>
        </div>
        <div class="profile-detail">
          <h3>{{ t('location') }}</h3>
          <p>{{ userProfile.location || '—' }}</p>
        </div>
        <div class="profile-detail">
          <h3>{{ t('experience') }}</h3>
          <p>{{ translateExperience(userProfile.experience) || '—' }}</p>
        </div>
        <div class="profile-detail">
          <h3>{{ t('gardenSize') }}</h3>
          <p>{{ translateGardenSize(userProfile.garden_size) || '—' }}</p>
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
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTranslations } from '@/composables/useTranslations'
import { useUserPlantsStore } from '@/stores/userPlants'

defineEmits<{
  editProfile: []
}>()

const { t, translateExperience, translateGardenSize, switchLanguage, language } = useTranslations()
const userPlantsStore = useUserPlantsStore()

const userProfile = computed(() => userPlantsStore.userProfile)
const stats = computed(() => userPlantsStore.stats)
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

.profile-card {
  background: var(--seasonal-card);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid rgba(var(--seasonal-text-rgb), 0.1);
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--seasonal-primary), var(--seasonal-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  font-weight: 700;
}

.profile-info {
  flex: 1;
}

.profile-info h2 {
  margin: 0 0 0.5rem 0;
  color: var(--seasonal-text);
  font-size: 1.75rem;
}

.profile-info p {
  margin: 0;
  color: var(--seasonal-text);
  opacity: 0.7;
}

.profile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.profile-detail h3 {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  color: var(--seasonal-text);
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.profile-detail p {
  margin: 0;
  color: var(--seasonal-text);
  font-size: 1rem;
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

.profile-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.lang-switch-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: 2px solid var(--seasonal-primary);
  background: transparent;
  color: var(--seasonal-primary);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  white-space: nowrap;
}

.lang-switch-btn:hover {
  background: var(--seasonal-primary);
  color: white;
}

.mobile-only {
  display: none;
}

@media (max-width: 768px) {
  .mobile-only {
    display: flex;
  }
  .profile-header {
    flex-direction: column;
    text-align: center;
  }
  .profile-actions {
    width: 100%;
    justify-content: center;
  }
}
</style>
