<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import BreadcrumbLayout from './layout/BreadcrumbLayout.vue'
import MenuLayout from './layout/MenuLayout.vue'
import NavbarLayout from './layout/NavbarLayout.vue'

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

<style scoped>
</style>
