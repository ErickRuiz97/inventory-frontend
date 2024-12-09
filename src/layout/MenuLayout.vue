<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { authStore } from '@/stores'

const router = useRouter()
const route = useRoute()
const storeAuth = authStore()

function routerPush(pathRoute) {
  router.push({ path: pathRoute })
}

const currentRoute = computed(() => {
  return route.path
})

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    storeAuth.roles = user.roles
    storeAuth.userEmail = user.email
  }
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
      <el-menu-item
        v-if="storeAuth.isSales()"
        index="/home"
        @click="routerPush('/home')"
      >
        <el-icon><trend-charts /></el-icon>
        Dashboard
      </el-menu-item>
      <el-menu-item
        v-if="storeAuth.isSales()"
        index="/sales"
        @click="routerPush('/sales')"
      >
        <el-icon><sell /></el-icon>
        Ventas
      </el-menu-item>
      <el-menu-item
        v-if="storeAuth.isManager()"
        index="/purchases"
        @click="routerPush('/purchases')"
      >
        <el-icon><sold-out /></el-icon>
        Compras
      </el-menu-item>
      <el-menu-item
        v-if="storeAuth.isAdmin()"
        index="/suppliers"
        @click="routerPush('/suppliers')"
      >
        <el-icon><office-building /></el-icon>
        Proveedores
      </el-menu-item>
      <el-menu-item
        v-if="storeAuth.isSales()"
        index="/products"
        @click="routerPush('/products')"
      >
        <el-icon><shop /></el-icon>
        Productos
      </el-menu-item>
      <el-menu-item
        v-if="storeAuth.isAdmin()"
        index="/users"
        @click="routerPush('/users')"
      >
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
