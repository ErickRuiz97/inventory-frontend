<script setup>
import Navbar from './layout/Navbar.vue'
import Menu from './layout/Menu.vue'
</script>
<template>
  <el-container class="layout">
    <el-container>
      <el-aside><Menu /></el-aside>
      <el-header style="padding: 0px"><Navbar /></el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<style scoped>
</style>
