<script setup>
import { watch } from 'vue'
import { ElMessage } from 'element-plus'

import { configStore } from '@/stores'

const storeConfig = configStore()

async function createBackup() {
  storeConfig.createBackup()
}

function downloadFile(blob) {
  const contentDisposition = blob.headers['content-disposition']
  const fileName = contentDisposition.split('filename=')[1]
  const url = window.URL.createObjectURL(new Blob([blob.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  link.remove()
}

watch(
  () => storeConfig.backup,
  newVal => {
    if (newVal) {
      downloadFile(newVal)
    }
  }
)

watch(
  () => storeConfig.error,
  value => {
    if (value) {
      ElMessage.error(value)
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
