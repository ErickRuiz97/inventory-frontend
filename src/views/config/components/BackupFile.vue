<script setup>
import { watch } from 'vue'
import { ElMessage } from 'element-plus'
import { objectUtils } from '@/utils'

import { configStore } from '@/stores'

const storeConfig = configStore()

async function createBackup() {
  storeConfig.createBackup()
}

watch(
  () => storeConfig.backup,
  newVal => {
    if (newVal) {
      objectUtils.downloadFile(newVal, 'Backup.zip')
    }
  }
)

watch(
  () => storeConfig.errorBackup,
  value => {
    if (value) {
      ElMessage.error(value)
      storeConfig.errorBackup = null
    }
  }
)
</script>
<template>
  <div class="h-100">
    <el-button type="primary" size="large" class="col-12" @click="createBackup"
      >Generar respaldo</el-button
    >
  </div>
</template>


<style lang="scss" scoped>
</style>
