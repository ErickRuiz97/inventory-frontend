<script setup>
import { ref } from 'vue'
import MenuOptions from './components/MenuOptions.vue'

const drawerVisible = ref(false)
defineProps({
  isMobile: Boolean,
})
const closeDrawer = () => {
  drawerVisible.value = false
}
const toggleDrawer = () => {
  drawerVisible.value = !drawerVisible.value
}
</script>
<template>
  <div class="position-relative">
    <el-button
      @click="toggleDrawer"
      class="menu-button position-absolute top-20 start-20"
      v-if="isMobile"
    >
      <el-icon><Menu /></el-icon>
    </el-button>
  </div>
  <el-drawer
    style="background-color: #e0e0e0"
    size="50%"
    v-model="drawerVisible"
    title="Menú"
    direction="ltr"
  >
    <menu-options @select="closeDrawer" />
  </el-drawer>
</template>

<style lang="scss" scoped>
.ep-drawer {
  width: 50% !important;
}
</style>
