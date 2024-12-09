<script setup>
import { useRouter } from 'vue-router'
import { authStore } from '@/stores'

const router = useRouter()
const storeAuth = authStore()

function singOut() {
  localStorage.removeItem('user')
  router.push({ name: 'Login' })
}

function goToConfig() {
  router.push({ name: 'ConfigApp' })
}
function ChangePassword() {
  router.push({ name: 'ChangePassword' })
}
</script>
<template>
  <div class="toolbar">
    <span class="primary-color">{{ storeAuth.userEmail }}</span>
    <el-dropdown>
      <el-icon class="ms-1 primary-color">
        <CaretBottom />
      </el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-if="storeAuth.isAdmin()" @click="goToConfig"
            >Configuración</el-dropdown-item
          >
          <el-dropdown-item @click="ChangePassword">Cambiar contraseña</el-dropdown-item>
          <el-dropdown-item @click="singOut">Cerrar sesión</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<style>
.primary-color {
  color: #4a90e2;
}
</style>
