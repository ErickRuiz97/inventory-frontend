<script setup>
import { onMounted, watch, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

import HeaderTable from '@/components/header-table/HeaderTable.vue'
import SuppliersTable from './components/SupliersTable.vue'
import ActionsHeader from '@/components/ActionsHeader.vue'

import { supplierStore } from '@/stores'
const router = useRouter()
const storeSupplier = supplierStore()
const actions = [
  {
    event: 'onNewSupplier',
    type: 'primary',
    icon: Plus,
    label: 'Nuevo',
  },
]
const events = {
  onNewSupplier: newSupplier,
  onRefresh: getSuppliers,
}
let suppliers = reactive([])
let loading = ref(true)
let paginator = reactive({
  limit: 20,
  page: 1,
  total: 0,
})
onMounted(() => {
  getSuppliers()
})

function getSuppliers() {
  const filters = {}
  loading.value = true
  storeSupplier.getSuppliers(filters, paginator)
}

function newSupplier() {
  router.push({ path: `/suppliers/create` })
}

function eventHandler(eventKey) {
  try {
    events[eventKey]()
  } catch {
    ElMessage.warning('Evento no implementado')
  }
}

watch(
  () => storeSupplier.list,
  value => {
    suppliers = reactive(value.items)
    paginator.total = value.total
    loading.value = false
  }
)

watch(
  () => paginator,
  value => {
    paginator = value
    getSuppliers()
  }
)

function clickRow(row) {
  router.push({ path: `/suppliers/${row._id}` })
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
      <header-table :paginator="paginator" @change="getSuppliers" />
    </div>
    <div class="row table-content">
      <suppliers-table
        v-model="suppliers"
        @click-row="clickRow"
        :loading="loading"
      />
    </div>
  </div>
</template>
