<script setup>
import { computed, provide } from 'vue'
import { useRoute } from 'vue-router'

import BreadcrumbLayout from './layout/BreadcrumbLayout.vue'
import MenuLayout from './layout/MenuLayout.vue'
import NavbarLayout from './layout/NavbarLayout.vue'
import { configStore } from '@/stores'
const storeConfig = configStore()

const route = useRoute()

const isShowLayout = computed(() => {
  return !['/login'].includes(route.path)
})

const symbol = computed(() => storeConfig.entity?.currency.symbol || '')
provide('currencySymbol', symbol)
</script>
<template>
  <router-view></router-view>
</template>

<style scoped>
</style>
