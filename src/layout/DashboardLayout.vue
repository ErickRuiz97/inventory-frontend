<script setup>
import { computed, provide } from 'vue'
import { useRoute } from 'vue-router'

import BreadcrumbLayout from './BreadcrumbLayout.vue'
import MenuLayout from './MenuLayout.vue'
import NavbarLayout from './NavbarLayout.vue'
import { configStore } from '@/stores'

const storeConfig = configStore()

const route = useRoute()

const isShowLayout = computed(() => {
  return !['/login'].includes(route.path)
})

const symbol = computed(() => storeConfig.entity?.currency.symbol || '')
provide('currencySymbol', symbol)

const categories = computed(() => storeConfig.entity?.categories || [])
provide('categories', categories)
</script>
<template>
  <el-container class="layout-container-demo color-back-gray">
    <el-aside id="aside-menu" width="200px" class="color-back-primary">
      <menu-layout />
    </el-aside>
    <el-container>
      <el-header id="navbar-layout">
        <navbar-layout />
      </el-header>
      <el-main id="main-layout">
        <div class="container">
          <div v-if="isShowLayout" id="breadcrumb" class="row">
            <breadcrumb-layout />
          </div>
          <div class="row" id="routing">
            <router-view></router-view>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
