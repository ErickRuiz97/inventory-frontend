<script setup>
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

function routerPush(pathRoute) {
  router.push({ path: pathRoute })
}

const currentRoute = computed(() => {
  return route.path
})

let activeIndex = ref(currentRoute)
</script>
<template>
  <el-scrollbar>
    <el-menu
      id="menu-layout"
      class="sideNav"
      :default-active="activeIndex"
      style="background-color: #384150"
    >
      <el-menu-item index="/home" @click="routerPush('/home')">
        <el-icon><trend-charts /></el-icon>
        Dashboard
      </el-menu-item>
      <el-menu-item index="/sales" @click="routerPush('/sales')">
        <el-icon><sell /></el-icon>
        Ventas
      </el-menu-item>
      <el-menu-item index="/sales" @click="routerPush('/sales')">
        <el-icon><sold-out /></el-icon>
        Compras
      </el-menu-item>
      <el-menu-item index="/suppliers" @click="routerPush('/suppliers')">
        <el-icon><office-building /></el-icon>
        Proveedores
      </el-menu-item>
      <el-menu-item index="/products" @click="routerPush('/products')">
        <el-icon><shop /></el-icon>
        Productos
      </el-menu-item>
      <el-menu-item index="/users" @click="routerPush('/users')">
        <el-icon><user /></el-icon>
        Usuarios
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>


<style lang="scss" scoped>
.el-menu-item {
  color: #4a90e2;
}
.el-menu-item.is-active {
  color: gray;
}
</style>
