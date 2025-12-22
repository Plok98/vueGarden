<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  t: Function,
  userProfile: Object
})

const emit = defineEmits(['close', 'save'])

const profileForm = reactive({ ...props.userProfile })

watch(() => props.userProfile, (newProfile) => {
  Object.assign(profileForm, newProfile)
}, { deep: true })

const handleSave = () => {
  emit('save', { ...profileForm })
}
</script>

<template>
  <div id="profile-modal" class="modal" :class="{ active: show }" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2>{{ t('profileTitle') }}</h2>
        <button class="close-button" id="close-profile-modal" @click="$emit('close')">×</button>
      </div>
      <form id="profile-form" @submit.prevent="handleSave">
        <div class="form-group">
          <label for="user-name">{{ t('name') }}</label>
          <input type="text" id="user-name" v-model="profileForm.name" required placeholder="Your name" />
        </div>
        <div class="form-group">
          <label for="user-email">{{ t('email') }}</label>
          <input type="email" id="user-email" v-model="profileForm.email" placeholder="your.email@example.com" />
        </div>
        <div class="form-group">
          <label for="user-location">{{ t('location') }}</label>
          <input type="text" id="user-location" v-model="profileForm.location" placeholder="City, State/Country" />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="user-experience">{{ t('experience') }}</label>
            <select id="user-experience" v-model="profileForm.experience">
              <option value="">{{ t('selectLevel') }}</option>
              <option value="beginner">{{ t('beginner') }}</option>
              <option value="intermediate">{{ t('intermediate') }}</option>
              <option value="advanced">{{ t('advanced') }}</option>
              <option value="expert">{{ t('expert') }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="user-garden-size">{{ t('gardenSize') }}</label>
            <select id="user-garden-size" v-model="profileForm.garden_size">
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
          <textarea
            id="user-bio"
            v-model="profileForm.bio"
            placeholder="Tell us about your gardening journey..."
          ></textarea>
        </div>
        <div class="form-actions">
          <button type="button" class="button button-secondary" id="cancel-profile-btn" @click="$emit('close')">
            {{ t('cancel') }}
          </button>
          <button type="submit" class="button button-primary" id="save-profile-btn">
            <span id="save-profile-text">{{ t('saveProfile') }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
