<script setup>
import { watch, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Check } from '@element-plus/icons-vue'
import BackupFile from '../config/components/BackupFile.vue'
import RestoreFile from '../config/components/RestoreFile.vue'
import DetailGeneral from '@/components/DetailGeneral.vue'
import ConfigForm from './components/ConfigForm.vue'
import ActionsHeader from '@/components/ActionsHeader.vue'

import { configStore } from '@/stores'

const storeConfig = configStore()
const actions = [
  {
    event: 'onSave',
    type: 'primary',
    icon: Check,
    label: 'Guardar',
  },
]
const formConfig = ref()

const events = {
  onSave: saveConfig,
}

function saveConfig() {
  formConfig.value.guardar()
}

function eventHandler(eventKey) {
  events[eventKey]()
}

watch(
  () => storeConfig.create,
  value => {
    if (value) {
      ElMessage.success('Configuración guardada')
      storeConfig.getConfig()
    }
  }
)

watch(
  () => storeConfig.update,
  value => {
    if (value) {
      ElMessage.success('Configuración guardada')
      storeConfig.getConfig()
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
  <detail-general>
    <template #header>
      <actions-header
        :actions="actions"
        :refresh="false"
        @action="eventHandler"
      ></actions-header>
    </template>
    <template #body>
      <div class="row">
        <div class="col-6">
          <config-form ref="formConfig"></config-form>
        </div>
        <div class="col-6">
          <backup-file></backup-file>
          <restore-file></restore-file>
        </div>
      </div>
    </template>
  </detail-general>
</template>


<style lang="scss" scoped>
</style>
