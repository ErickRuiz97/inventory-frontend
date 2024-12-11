<script setup>
import { watch } from 'vue'
import { ElMessage } from 'element-plus'

import { configStore } from '@/stores'

const storeConfig = configStore()

function restoreDatabase(file) {
  storeConfig.restoreDatabase(file.raw)
}

watch(
  () => storeConfig.restore,
  newVal => {
    if (newVal) {
      ElMessage.success('Base de datos restablecida correctamente')
    }
  }
)

watch(
  () => storeConfig.errorRestore,
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
    <el-upload
      class="upload-demo"
      accept=".zip"
      :on-change="restoreDatabase"
      :auto-upload="false"
      drag
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        Restaurar base de datos
        <br />
        Suelta el zip aquí o <em>click para seleccionarlo</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">zip respaldo generado</div>
      </template>
    </el-upload>
  </div>
</template>


<style lang="scss" scoped>
</style>
