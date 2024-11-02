<script setup>
import BreadcrumbLayout from './layout/BreadcrumbLayout.vue'
import MenuLayout from './layout/MenuLayout.vue'
import NavbarLayout from './layout/NavbarLayout.vue'
</script>
<template>
  <el-container class="layout-container-demo">
    <el-aside id="aside-menu"><menu-layout /></el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <navbar-layout />
      </el-header>
      <el-main>
        <div class="container">
          <div class="row">
            <breadcrumb-layout />
          </div>
          <div class="row">
            <router-view></router-view>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
</style>
