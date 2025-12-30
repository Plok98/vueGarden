<template>
  <nav class="navigation">
    <div class="nav-container">
      <a href="#" class="nav-brand" id="nav-brand">
        <img src="@/assets/logo.svg" :alt="config.app_title" class="brand-logo" />
      </a>
      <ul class="nav-links">
        <li v-for="link in navLinks" :key="link.id">
          <a
            href="#"
            class="nav-link"
            :class="{ active: currentPage === link.id }"
            @click.prevent="$emit('navigate', link.id)"
          >
            <i v-if="link.icon.startsWith('bi-')" :class="['nav-icon', link.icon]"></i>
            <span v-else class="nav-icon">{{ link.icon }}</span>
            <span class="nav-text">{{ t(link.label) }}</span>
          </a>
        </li>
      </ul>
      <!-- Language toggle for desktop -->
      <button class="language-toggle-desktop" @click="switchLanguage" :title="t('switchLanguage')">
        <i class="globe-icon bi bi-globe"></i>
        <span class="lang-code">{{ language === 'en' ? 'EN' : 'NL' }}</span>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTranslations } from '@/composables/useTranslations'
import { useConfig } from '@/composables/useConfig'

defineProps<{
  currentPage: string
}>()

defineEmits<{
  navigate: [page: string]
}>()

const { t, switchLanguage, language } = useTranslations()
const { config } = useConfig()

const navLinks = computed(() => [
  { id: 'dashboard', icon: 'bi-person-fill', label: 'profile' },
  { id: 'discover', icon: 'bi-compass', label: 'discover' },
  { id: 'my-garden', icon: 'bi-flower3', label: 'myGarden' },
  { id: 'plant-overview', icon: 'bi-journal-text', label: 'pastPlants' }
])
</script>

<style scoped>
.navigation {
  background: rgba(248, 250, 252, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  width: 100%;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  display: flex;
  align-items: center;
  text-decoration: none;
  background: transparent !important;
  padding: 0;
}

.brand-logo {
  height: 64px;
  width: auto;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  transition: transform 0.2s;
}

.brand-logo:hover {
  transform: scale(1.05);
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
}

.nav-link:hover {
  background: rgba(var(--seasonal-primary-rgb), 0.1);
  color: var(--seasonal-primary);
}

.nav-link.active {
  background: var(--seasonal-primary);
  color: white;
}

.nav-icon {
  font-size: 1.5rem;
}

.nav-text {
  font-size: 0.75rem;
}

/* Desktop language toggle - compact pill style */
.language-toggle-desktop {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.875rem;
  border: 2px solid var(--seasonal-primary);
  background: transparent;
  color: var(--seasonal-primary);
  border-radius: 24px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.language-toggle-desktop:hover {
  background: var(--seasonal-primary);
  color: white;
}

.globe-icon {
  font-size: 1.125rem;
}

.lang-code {
  font-weight: 700;
  letter-spacing: 0.5px;
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
  }

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
  }

  .nav-link {
    padding: 0.5rem;
    min-width: auto;
    font-size: 0.875rem;
  }

  .nav-icon {
    font-size: 1.25rem;
  }

  .nav-text {
    font-size: 0.625rem;
  }

  .language-toggle-desktop {
    display: none;
  }
}
</style>
