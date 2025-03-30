<script setup>
import { useRoute } from 'vue-router'

import BreadcrumbLayout from './BreadcrumbLayout.vue'
import MenuLayout from './MenuLayout.vue'
import NavbarLayout from './NavbarLayout.vue'

const route = useRoute()


</script>
<template>
  <el-container class="layout-container-demo color-back-gray" style="height: 100vh;">
    <el-aside
      id="aside-menu"
      width="200px"
      >
      <menu-layout class="h-100" />
    </el-aside>
    <el-container>
      <el-header id="navbar-layout">
        <navbar-layout />
      </el-header>
      <el-main id="main-layout">
        <div class="container">
          <div id="breadcrumb" class="row">
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