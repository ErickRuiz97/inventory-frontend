<script setup>
import { onMounted, watch, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

import HeaderTable from '@/components/header-table/HeaderTable.vue'
import PuchasesTable from './components/PuchasesTable.vue'
import ActionsHeader from '@/components/ActionsHeader.vue'

import { purchaseStore } from '@/stores'
const router = useRouter()
const storePurchases = purchaseStore()
const actions = [
  {
    event: 'onNewPuchases',
    type: 'primary',
    icon: Plus,
    label: 'Nuevo',
  },
]
const events = {
  onNewPurchase: newPurchase,
  onRefresh: getPurchases,
}
let purchases = reactive([])
let loading = ref(true)
let paginator = reactive({
  limit: 20,
  page: 1,
  total: 0,
})
onMounted(() => {
  getPurchases()
})

function getPurchases() {
  const filters = {}
  loading.value = true
  storePurchases.getPurchases(filters, paginator)
}

function newPurchase() {
  router.push({ path: `/purchases/create` })
}

function eventHandler(eventKey) {
  try {
    events[eventKey]()
  } catch {
    ElMessage.warning('Evento no implementado')
  }
}

watch(
  () => storePurchases.list,
  value => {
    purchases = reactive(value.items)
    paginator.total = value.total
    loading.value = false
  }
)

watch(
  () => paginator,
  value => {
    paginator = value
    getPurchases()
  }
)

function clickRow(row) {
  router.push({ path: `/purchases/${row._id}` })
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
      <header-table :paginator="paginator" @change="getPuchases" />
    </div>
    <div class="row table-content">
      <purchases-table
        v-model="purchases"
        @click-row="clickRow"
        :loading="loading"
      />
    </div>
  </div>
</template>
