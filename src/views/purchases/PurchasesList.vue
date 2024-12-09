<script setup>
import _ from 'lodash'
import { onMounted, watch, ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { objectUtils } from '@/utils'

import HeaderTable from '@/components/header-table/HeaderTable.vue'
import PurchasesTable from './components/PurchasesTable.vue'
import ActionsHeader from '@/components/ActionsHeader.vue'
import PurchaseFilters from './components/PurchaseFilters.vue'

import { purchaseStore } from '@/stores'
const router = useRouter()
const storePurchase = purchaseStore()
const actions = [
  {
    event: 'onNewPurchase',
    type: 'primary',
    icon: Plus,
    label: 'Nuevo',
  },
]
const events = {
  onNewPurchase: newPurchase,
  onRefresh: getPurchases,
  onFilter: showFilters,
  onCleanFilter: cleanFilter,
}
let purchases = reactive([])
let loading = ref(true)
let onShowFilters = ref(false)
let paginator = reactive({
  limit: 20,
  page: 1,
  total: 0,
})
let filters = ref({
  date: [],
  supplier: '',
  amount: [0, 'MAX'],
})

onMounted(() => {
  filters.value = _.cloneDeep(storePurchase.filters)
  getPurchases()
})

function getPurchases() {
  loading.value = true
  storePurchase.getPurchases(
    objectUtils.cleanQueryEmpties(storePurchase.filters),
    paginator
  )
}

function newPurchase() {
  router.push({ path: `/purchases/create` })
}

function showFilters() {
  onShowFilters.value = true
}

function eventHandler(eventKey) {
  try {
    events[eventKey]()
  } catch {
    ElMessage.warning('Evento no implementado')
  }
}

watch(
  () => storePurchase.list,
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

function cancelFilter() {
  filters.value = _.cloneDeep(storePurchase.filters)
  onShowFilters.value = false
}

function confirmFilter() {
  storePurchase.filters = _.cloneDeep(filters.value)
  onShowFilters.value = false
  getPurchases()
}

function cleanFilter() {
  filters.value = {
    date: [],
    supplier: '',
    amount: [0, 'MAX'],
  }
  storePurchase.filters = _.cloneDeep(filters.value)
  getPurchases()
}

const isFiltered = computed(() =>
  _.isEqual(filters.value, {
    date: [],
    supplier: '',
    amount: [0, 'MAX'],
  })
)
</script>

<template>
  <div>
    <div class="row header-content">
      <actions-header
        :actions="actions"
        :filter-active="!isFiltered"
        @action="eventHandler"
      ></actions-header>
    </div>
    <div class="row table-content">
      <el-card shadow="always">
        <div class="row">
          <header-table :paginator="paginator" @change="getPurchases" />
        </div>
        <div class="row">
          <purchases-table
            v-model="purchases"
            @click-row="clickRow"
            :loading="loading"
          />
        </div>
      </el-card>
    </div>
    <el-drawer v-model="onShowFilters" direction="rtl">
      <template #header>
        <h4>Filtro de búsqueda</h4>
      </template>
      <template #default>
        <purchase-filters v-model="filters" />
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelFilter">Cancelar</el-button>
          <el-button type="primary" @click="confirmFilter">Aceptar</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>
