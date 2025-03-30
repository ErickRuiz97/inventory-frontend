<script setup>
import { useRoute } from 'vue-router'
import {ref, onMounted, onUnmounted} from 'vue'

import BreadcrumbLayout from './BreadcrumbLayout.vue'
import MenuLayout from './MenuLayout.vue'
import NavbarLayout from './NavbarLayout.vue'
import DrawerMenu from './DrawerMenu.vue'

const route = useRoute()


const isMobile = ref(window.innerWidth < 768);

const handleResize = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

</script>
<template>
  <el-container class="layout-container-demo color-back-gray" style="height: 100vh;">
    <el-aside
      v-if="!isMobile"
      id="aside-menu"
      width="200px"
      >
      <menu-layout class="h-100" />
    </el-aside>
    <drawer-menu v-else :is-mobile="isMobile"></drawer-menu>
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