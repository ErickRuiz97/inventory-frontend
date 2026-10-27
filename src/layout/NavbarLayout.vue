<script setup>
import { useRouter } from 'vue-router'
import { authStore } from '@/stores'
import { configStore } from '@/stores'
import { onMounted } from 'vue'
import LanguageSwitch from '@/components/LanguageSwitch.vue'

const { getConfig } = configStore()

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

onMounted(() => {
  getConfig()
})
</script>
<template>
  <div class="toolbar">
    <language-switch class="me-2" />
    <span class="primary-color me-1">{{ storeAuth.userEmail }}</span>
    <el-dropdown>
      <el-avatar
        :size="32"
        class="mr-3"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-if="storeAuth.isAdmin()" @click="goToConfig">{{
            $t('menu.settings')
          }}</el-dropdown-item>
          <el-dropdown-item @click="ChangePassword">{{
            $t('menu.changePassword')
          }}</el-dropdown-item>
          <el-dropdown-item @click="singOut">{{
            $t('menu.signOut')
          }}</el-dropdown-item>
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
