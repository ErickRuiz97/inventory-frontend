<script setup>
import { useI18n } from 'vue-i18n'
import { setLocale } from '@/i18n'

const { locale } = useI18n()

function toggleLocale() {
  setLocale(locale.value === 'es' ? 'en' : 'es')
}
</script>
<template>
  <el-button text @click="toggleLocale">
    <el-icon class="me-1"><chat-dot-round /></el-icon>
    {{ $t('language.switchTo') }}
  </el-button>
</template>
