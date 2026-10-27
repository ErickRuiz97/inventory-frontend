<script setup>
import { computed, ref, onMounted } from 'vue'
import { authStore } from '@/stores'
import { useRouter, useRoute } from 'vue-router'

const emit = defineEmits(['select'])

const router = useRouter()

const route = useRoute()
const storeAuth = authStore()
function selectedItem(item) {
  emit('select', item)
}
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
  <el-menu
    @select="selectedItem"
    id="menu-layout"
    :default-active="activeIndex"
    style="background-color: #ffffff"
  >
    <el-menu-item
      v-if="storeAuth.isSales()"
      index="/home"
      @click="routerPush('/home')"
    >
      <el-icon><trend-charts /></el-icon>
      <template #title>{{ $t('menu.dashboard') }}</template>
    </el-menu-item>
    <el-menu-item
      v-if="storeAuth.isSales()"
      index="/sales"
      @click="routerPush('/sales')"
    >
      <el-icon><sell /></el-icon>
      <template #title>{{ $t('menu.sales') }}</template>
    </el-menu-item>
    <el-menu-item
      v-if="storeAuth.isManager()"
      index="/purchases"
      @click="routerPush('/purchases')"
    >
      <el-icon><sold-out /></el-icon>
      <template #title>{{ $t('menu.purchases') }}</template>
    </el-menu-item>
    <el-menu-item
      v-if="storeAuth.isAdmin()"
      index="/suppliers"
      @click="routerPush('/suppliers')"
    >
      <el-icon><office-building /></el-icon>
      <template #title>{{ $t('menu.suppliers') }}</template>
    </el-menu-item>
    <el-menu-item
      v-if="storeAuth.isSales()"
      index="/products"
      @click="routerPush('/products')"
    >
      <el-icon><shop /></el-icon>
      <template #title>{{ $t('menu.products') }}</template>
    </el-menu-item>
    <el-menu-item
      v-if="storeAuth.isAdmin()"
      index="/users"
      @click="routerPush('/users')"
    >
      <el-icon><user /></el-icon>
      <template #title>{{ $t('menu.users') }}</template>
    </el-menu-item>
  </el-menu>
</template>
