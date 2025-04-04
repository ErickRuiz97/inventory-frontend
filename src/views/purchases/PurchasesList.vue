<script setup>
import _ from 'lodash'
import { onMounted, watch, ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Plus, Document } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import { objectUtils } from '@/utils'

import ListGeneral from '@/components/ListGeneral.vue'
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
  {
    event: 'onProductsReport',
    type: 'success',
    icon: Document,
    label: 'Reporte',
  },
  {
    event: 'onProductsReportDetail',
    type: 'success',
    icon: Document,
    label: 'Reporte detallado',
  },
]
const events = {
  onNewPurchase: newPurchase,
  onRefresh: getPurchases,
  onFilter: showFilters,
  onCleanFilter: cleanFilter,
  onProductsReport: downloadReport,
  onProductsReportDetail: downloadReportDetail,
}
let purchases = reactive([])
let loading = ref(true)
let onShowFilters = ref(false)
const { paginator } = storeToRefs(storePurchase)

let filters = ref({
  date: [],
  code: '',
  supplier: '',
  amount: [0, 10000],
})

onMounted(() => {
  filters.value = _.cloneDeep(storePurchase.filters)
  getPurchases()
})

function getPurchases() {
  loading.value = true
  storePurchase.getPurchases(
    objectUtils.cleanQueryEmpties(storePurchase.filters)
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
    _.merge(storePurchase.paginator, { total: value.total })
    loading.value = false
  }
)

watch(
  () => paginator,
  value => {
    _.merge(storePurchase.paginator, value)

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
  _.merge(storePurchase.paginator, { page: 1 })
  storePurchase.filters = _.cloneDeep(filters.value)
  onShowFilters.value = false
  getPurchases()
}

function sortChange() {
  _.merge(storePurchase.paginator, { page: 1 })
  getPurchases()
}

function cleanFilter() {
  _.merge(storePurchase.paginator, { page: 1 })
  filters.value = {
    date: [],
    code: '',
    supplier: '',
    amount: [0, 10000],
  }
  storePurchase.filters = _.cloneDeep(filters.value)
  getPurchases()
}

function downloadReportDetail() {
  loading.value = true
  storePurchase.getPurchasesReportDetail(
    objectUtils.cleanQueryEmpties(storePurchase.filters)
  )
}

function downloadReport() {
  loading.value = true
  storePurchase.getPurchasesReport(
    objectUtils.cleanQueryEmpties(storePurchase.filters)
  )
}

const isFiltered = computed(() =>
  _.isEqual(filters.value, {
    date: [],
    code: '',
    supplier: '',
    amount: [0, 10000],
  })
)

watch(
  () => storePurchase.reportDetail,
  newVal => {
    if (newVal) {
      loading.value = false
      objectUtils.downloadFile(newVal, 'ReporteDetalladoCompras.xlsx')
    }
  }
)

watch(
  () => storePurchase.report,
  newVal => {
    if (newVal) {
      loading.value = false
      objectUtils.downloadFile(newVal, 'ReporteCompras.xlsx')
    }
  }
)
</script>

<template>
  <list-general
    :is-show-filters="onShowFilters"
    @cancel-filter="cancelFilter"
    @confirm-filter="confirmFilter"
  >
    <template #actions>
      <actions-header
        :actions="actions"
        :filter-active="!isFiltered"
        @action="eventHandler"
      ></actions-header>
    </template>
    <template #header>
      <header-table :paginator="paginator" @change="getPurchases" />
    </template>
    <template #table>
      <purchases-table
        v-model="purchases"
        @click-row="clickRow"
        @sort-change="sortChange"
        :loading="loading"
      />
    </template>
    <template #filters>
      <purchase-filters v-model="filters" />
    </template>
  </list-general>
</template>
