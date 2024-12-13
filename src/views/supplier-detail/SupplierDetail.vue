<script setup>
import { onMounted, watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Check } from '@element-plus/icons-vue'

import DetailGeneral from '@/components/DetailGeneral.vue'
import SupplierForm from './components/SupplierForm.vue'
import ActionsHeader from '@/components/ActionsHeader.vue'

import { supplierStore } from '@/stores'

const route = useRoute()
const router = useRouter()
const isEdit = ref(false)
const storeSupplier = supplierStore()
const formSupplier = ref()
const actions = [
  {
    event: 'onSave',
    type: 'primary',
    icon: Check,
    label: 'Guardar',
  },
]
const events = {
  onSave: saveSupplier,
}

let supplier = ref({
  name: '',
  code: '',
  contact: {
    name: '',
    email: '',
    phone: '',
  },
})
onMounted(() => {
  if (route.params.id) isEdit.value = true

  if (isEdit.value) storeSupplier.getSupplierById(route.params.id)
})

function eventHandler(eventKey) {
  events[eventKey]()
}

async function saveSupplier() {
  const valid = await formSupplier.value.validForm()
  if (valid) {
    if (isEdit.value)
      storeSupplier.updateSupplier(route.params.id, supplier.value)
    else storeSupplier.createSupplier(supplier.value)
  }
}

watch(
  () => storeSupplier.entity,
  value => {
    if (value) {
      supplier.value = value
    }
  }
)

watch(
  () => storeSupplier.create,
  value => {
    if (value) {
      ElMessage.success('Proveedor creado')
      router.push({ path: '/suppliers' })
    }
  }
)

watch(
  () => storeSupplier.update,
  value => {
    if (value) {
      ElMessage.success('Proveedor actualizado')
      router.push({ path: '/suppliers' })
    }
  }
)

watch(
  () => storeSupplier.error,
  value => {
    if (value) {
      ElMessage.error(value)
      storeSupplier.error = null
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
      <supplier-form ref="formSupplier" v-model="supplier" />
    </template>
  </detail-general>
</template>


<style lang="scss" scoped>
</style>
