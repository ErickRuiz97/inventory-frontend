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
  <el-container class="layout-container-demo color-back-gray">
    <el-aside
      v-if="isShowLayout"
      id="aside-menu"
      width="200px"
      class="color-back-primary"
      >
      <menu-layout />
    </el-aside>
    <el-container>
      <el-header v-if="isShowLayout" id="navbar-layout">
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