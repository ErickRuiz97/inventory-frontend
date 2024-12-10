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
  const fileName = contentDisposition
    ? contentDisposition.split('filename=')[1]?.replace(/["']/g, '')
    : 'backup.zip'
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
  () => storeConfig.errorBackup,
  value => {
    if (value) {
      ElMessage.error(value)
      storeConfig.error = null
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
