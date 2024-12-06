<script setup>
import { onMounted, watch, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

import HeaderTable from '@/components/header-table/HeaderTable.vue'
import SalesTable from './components/SalesTable.vue'
import ActionsHeader from '@/components/ActionsHeader.vue'

import { saleStore } from '@/stores'
const router = useRouter()
const storeSales = saleStore()
const actions = [
  {
    event: 'onNewSales',
    type: 'primary',
    icon: Plus,
    label: 'Nuevo',
  },
]
const events = {
  onNewSale: newSale,
  onRefresh: getSales,
}
let sales = reactive([])
let loading = ref(true)
let paginator = reactive({
  limit: 20,
  page: 1,
  total: 0,
})
onMounted(() => {
  getSales()
})

function getSales() {
  const filters = {}
  loading.value = true
  storeSales.getSales(filters, paginator)
}

function newSale() {
  router.push({ path: `/sales/create` })
}

function eventHandler(eventKey) {
  try {
    events[eventKey]()
  } catch {
    ElMessage.warning('Evento no implementado')
  }
}

watch(
  () => storeSales.list,
  value => {
    sales = reactive(value.items)
    paginator.total = value.total
    loading.value = false
  }
)

watch(
  () => paginator,
  value => {
    paginator = value
    getSales()
  }
)

function clickRow(row) {
  router.push({ path: `/sales/${row._id}` })
}
</script>

<template>
  <div>
    <div class="row header-content">
      <actions-header
        :actions="actions"
        @action="eventHandler"
      ></actions-header>
    </div>
    <div class="row">
      <header-table :paginator="paginator" @change="getSales" />
    </div>
    <div class="row table-content">
      <sales-table
        v-model="sales"
        @click-row="clickRow"
        :loading="loading"
      />
    </div>
  </div>
</template>
