<script setup>
import { onMounted, watch, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Check, Printer } from '@element-plus/icons-vue'

import DetailGeneral from '@/components/DetailGeneral.vue'
import SaleForm from './components/SaleForm.vue'
import SaleDetailEdit from './components/SaleDetailEdit.vue'
import ActionsHeader from '@/components/ActionsHeader.vue'

import { saleStore } from '@/stores'
import { objectUtils } from '@/utils'

const route = useRoute()
const router = useRouter()
const isEdit = ref(false)
const storeSale = saleStore()
const formSale = ref()
const actions = reactive([])
const events = {
  onSave: saveSale,
  onPrint: printReceipt,
}

let sale = ref({
  customer: '',
  pay_type: '',
  products: [],
})
onMounted(() => {
  if (route.params.id) isEdit.value = true
  if (isEdit.value) {
    storeSale.getSaleById(route.params.id)
    actions.push({
      event: 'onPrint',
      type: 'primary',
      icon: Printer,
      label: 'Imprimir factura',
    })
  } else
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

async function saveSale() {
  const valid = await formSale.value.validForm()
  if (valid) {
    storeSale.createSale(sale.value)
  }
}

async function printReceipt() {
  storeSale.getSaleReceiptById(route.params.id)
}

watch(
  () => storeSale.entity,
  value => {
    if (value) {
      sale.value = value
    }
  }
)

watch(
  () => storeSale.create,
  value => {
    if (value) {
      ElMessage.success('Compra creada')
      router.push({ path: '/sales' })
    }
  }
)

watch(
  () => storeSale.create,
  value => {
    if (value) {
      ElMessage.success('Compra creada')
      router.push({ path: '/sales' })
    }
  }
)

watch(
  () => storeSale.receipt,
  value => {
    if (value) {
      objectUtils.downloadFile(value, 'Factura.pdf')
    }
  }
)

watch(
  () => storeSale.error,
  value => {
    if (value) {
      ElMessage.error(value)
      storeSale.error = null
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
      <sale-form v-if="!isEdit" ref="formSale" v-model="sale" />
      <sale-detail-edit v-else v-model="sale" />
    </template>
  </detail-general>
</template>


<style lang="scss" scoped>
</style>
