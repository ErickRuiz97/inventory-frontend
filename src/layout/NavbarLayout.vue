<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref({})

onMounted(() => {
  user.value = JSON.parse(localStorage.getItem('user'))
})

function singOut() {
  localStorage.removeItem('user')
  router.push({ name: 'Login' })
}

function goToConfig() {
  router.push({ name: 'ConfigApp' })
}
</script>
<template>
  <div class="toolbar">
    <span class="primary-color">{{ user.email }}</span>
    <el-dropdown>
      <el-icon class="ms-1 primary-color">
        <CaretBottom />
      </el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="goToConfig">Configuración</el-dropdown-item>
          <el-dropdown-item>Cambiar contraseña</el-dropdown-item>
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
