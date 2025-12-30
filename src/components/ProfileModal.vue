<template>
  <div class="modal" :class="{ active: isOpen }" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2>{{ t('profileTitle') }}</h2>
        <button class="close-button" @click="$emit('close')">×</button>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="user-name">{{ t('name') }}</label>
          <input type="text" id="user-name" v-model="form.name" required placeholder="Your name">
        </div>
        <div class="form-group">
          <label for="user-email">{{ t('email') }}</label>
          <input type="email" id="user-email" v-model="form.email" placeholder="your.email@example.com">
        </div>
        <div class="form-group">
          <label for="user-location">{{ t('location') }}</label>
          <input type="text" id="user-location" v-model="form.location" placeholder="City, State/Country">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="user-experience">{{ t('experience') }}</label>
            <select id="user-experience" v-model="form.experience">
              <option value="">{{ t('selectLevel') }}</option>
              <option value="beginner">{{ t('beginner') }}</option>
              <option value="intermediate">{{ t('intermediate') }}</option>
              <option value="advanced">{{ t('advanced') }}</option>
              <option value="expert">{{ t('expert') }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="user-garden-size">{{ t('gardenSize') }}</label>
            <select id="user-garden-size" v-model="form.garden_size">
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
          <textarea id="user-bio" v-model="form.bio" placeholder="Tell us about your gardening journey..."></textarea>
        </div>

        <div class="form-actions">
          <button type="button" class="button button-secondary" @click="$emit('close')">
            {{ t('cancel') }}
          </button>
          <button type="submit" class="button button-primary">
            {{ t('saveProfile') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { UserProfile } from '@/types'
import { useTranslations } from '@/composables/useTranslations'
import { useUserPlantsStore } from '@/stores/userPlants'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
  saved: []
}>()

const { t } = useTranslations()
const userPlantsStore = useUserPlantsStore()

const form = reactive<UserProfile>({
  data_type: 'profile',
  id: 'profile-1',
  name: '',
  email: '',
  location: '',
  experience: '',
  garden_size: '',
  bio: ''
})

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    const profile = userPlantsStore.userProfile
    Object.assign(form, profile)
  }
})

async function handleSubmit() {
  await userPlantsStore.saveProfile({ ...form })
  emit('saved')
  emit('close')
}
</script>

<style scoped>
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
}

.modal.active {
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
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--seasonal-text);
}

.close-button {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: var(--seasonal-text);
  opacity: 0.5;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--seasonal-text);
  font-size: 0.875rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid rgba(var(--seasonal-text-rgb), 0.2);
  border-radius: 8px;
  font-size: 0.875rem;
  font-family: inherit;
  background: var(--seasonal-card);
  color: var(--seasonal-text);
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 2px solid #f3f4f6;
}

.button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  flex: 1;
}

.button-primary {
  background: var(--seasonal-primary);
  color: white;
}

.button-secondary {
  background: rgba(var(--seasonal-text-rgb), 0.1);
  color: var(--seasonal-text);
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
