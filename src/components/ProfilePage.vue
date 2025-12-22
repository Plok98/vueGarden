<script setup>
defineProps({
  t: Function,
  userProfile: Object,
  translateExperience: Function,
  translateGardenSize: Function,
  stats: Object
})

defineEmits(['open-profile-modal'])
</script>

<template>
  <div id="profile" class="page">
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
        <button class="button button-secondary" id="edit-profile-btn" @click="$emit('open-profile-modal')">
          {{ t('editProfile') }}
        </button>
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
</template>
