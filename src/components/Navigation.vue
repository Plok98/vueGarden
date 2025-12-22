<script setup>
defineProps({
  config: Object,
  currentPage: String,
  navLinks: Array,
  t: Function
})

defineEmits(['set-page', 'switch-language'])
</script>

<template>
  <nav class="navigation">
    <div class="nav-container">
      <a href="#" class="nav-brand" id="nav-brand">{{ config.app_title }}</a>
      <button class="language-toggle" id="language-toggle" @click="$emit('switch-language')">
        {{ t('switchLanguage') }}
      </button>
      <ul class="nav-links">
        <li v-for="link in navLinks" :key="link.id">
          <a
            href="#"
            class="nav-link"
            :class="{ active: currentPage === link.id }"
            @click.prevent="$emit('set-page', link.id)"
          >
            <span class="nav-icon">{{ link.icon }}</span>
            <span class="nav-text">{{ t(link.label) }}</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>
