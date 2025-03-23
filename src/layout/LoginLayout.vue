<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import BreadcrumbLayout from './BreadcrumbLayout.vue'
import MenuLayout from './MenuLayout.vue'
import NavbarLayout from './NavbarLayout.vue'

const route = useRoute()

const isShowLayout = computed(() => {
  return !['/login'].includes(route.path)
})
</script>
<template>
  <el-config-provider namespace="ep">
    <router-view></router-view>
  </el-config-provider>
</template>