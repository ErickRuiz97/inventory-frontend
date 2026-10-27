<script setup>
import { watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

import { configStore } from '@/stores'

const storeConfig = configStore()
const { t } = useI18n()

function restoreDatabase(file) {
  storeConfig.restoreDatabase(file.raw)
}

watch(
  () => storeConfig.restore,
  newVal => {
    if (newVal) {
      ElMessage.success(t('config.restored'))
    }
  },
)

watch(
  () => storeConfig.errorRestore,
  value => {
    if (value) {
      ElMessage.error(value)
      storeConfig.error = null
    }
  },
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
        {{ $t('config.restoreTitle') }}
        <br />
        {{ $t('config.restoreDrop') }}
        <em>{{ $t('config.restoreClick') }}</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">{{ $t('config.restoreTip') }}</div>
      </template>
    </el-upload>
  </div>
</template>

<style lang="scss" scoped></style>
