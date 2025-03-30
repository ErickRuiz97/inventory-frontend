<script setup>
import { watch, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Check, Download } from '@element-plus/icons-vue'
import RestoreFile from '../config/components/RestoreFile.vue'
import DetailGeneral from '@/components/DetailGeneral.vue'
import ActionsHeader from '@/components/ActionsHeader.vue'
import ConfigForm from './components/ConfigForm.vue'
import { configStore } from '@/stores'
import { objectUtils } from '@/utils'

const storeConfig = configStore()
const actions = [
  {
    event: 'onSave',
    type: 'primary',
    icon: Check,
    label: 'Guardar',
  },
  {
    event: 'onBackup',
    type: 'default',
    icon: Download,
    label: 'Generar respaldo base de datos',
  },
]
const formConfig = ref()

const events = {
  onSave: saveConfig,
  onBackup: createBackup,
}

function saveConfig() {
  formConfig.value.guardar()
}

function eventHandler(eventKey) {
  events[eventKey]()
}

async function createBackup() {
  storeConfig.createBackup()
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
  () => storeConfig.errorBackup,
  value => {
    if (value) {
      ElMessage.error(value)
      storeConfig.errorBackup = null
    }
  }
)

watch(
  () => storeConfig.backup,
  newVal => {
    if (newVal) {
      objectUtils.downloadFile(newVal, 'Backup.zip')
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
        <div class="col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <config-form ref="formConfig"></config-form>
        </div>
        <div class="col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <restore-file></restore-file>
        </div>
      </div>
    </template>
  </detail-general>
</template>


<style lang="scss" scoped>
</style>
