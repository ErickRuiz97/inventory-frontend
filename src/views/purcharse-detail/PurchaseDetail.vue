<script setup>
import { onMounted, watch, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Check } from '@element-plus/icons-vue'

import DetailGeneral from '@/components/DetailGeneral.vue'
import PurchaseForm from './components/PurchaseForm.vue'
import ActionsHeader from '@/components/ActionsHeader.vue'
import PurchaseDetailEdit from './components/PurchaseDetailEdit.vue'
import { purchaseStore } from '@/stores'

const route = useRoute()
const router = useRouter()
const isEdit = ref(false)
const storePurchase = purchaseStore()
const formPurchase = ref()
const actions = reactive([])
const events = {
  onSave: savePurchase,
}

let purchase = ref({
  supplier_id: '',
  products: [],
})
onMounted(() => {
  if (route.params.id) isEdit.value = true
  if (isEdit.value) storePurchase.getPurchaseById(route.params.id)
  else
    actions.push({
      event: 'onSave',
      type: 'primary',
      icon: Check,
      label: 'Guardar',
    })
})

function eventHandler(eventKey) {
  events[eventKey]()
}

async function savePurchase() {
  const valid = await formPurchase.value.validForm()
  if (valid) {
    storePurchase.createPurchase(purchase.value)
  }
}

watch(
  () => storePurchase.entity,
  value => {
    if (value) {
      purchase.value = value
    }
  }
)

watch(
  () => storePurchase.create,
  value => {
    if (value) {
      ElMessage.success('Compra creada')
      router.push({ path: '/purchases' })
    }
  }
)

watch(
  () => storePurchase.error,
  value => {
    if (value) {
      ElMessage.error(value)
      storePurchase.error = null
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
      <purchase-form v-if="!isEdit" ref="formPurchase" v-model="purchase" />
      <purchase-detail-edit v-else v-model="purchase" />
    </template>
  </detail-general>
</template>


<style lang="scss" scoped>
</style>
