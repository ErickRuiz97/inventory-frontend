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
import SalesTable from './components/SalesTable.vue'
import ActionsHeader from '@/components/ActionsHeader.vue'
import SaleFilters from './components/SaleFilters.vue'

import { saleStore } from '@/stores'
const router = useRouter()
const storeSale = saleStore()
const actions = [
  {
    event: 'onNewSale',
    type: 'primary',
    icon: Plus,
    label: 'Nuevo',
  },
  {
    event: 'onSalesReport',
    type: 'success',
    icon: Document,
    label: 'Reporte',
  },
  {
    event: 'onSalesReportDetail',
    type: 'success',
    icon: Document,
    label: 'Reporte detallado',
  },
]
const events = {
  onNewSale: newSale,
  onRefresh: getSales,
  onFilter: showFilters,
  onCleanFilter: cleanFilter,
  onSalesReport: downloadReport,
  onSalesReportDetail: downloadReportDetail,
}
let sales = reactive([])
let loading = ref(true)
let onShowFilters = ref(false)
const { paginator } = storeToRefs(storeSale)

let filters = ref({
  date: [],
  code: '',
  customer: '',
  pay_types: '',
  amount: [0, 5000],
})

onMounted(() => {
  filters.value = _.cloneDeep(storeSale.filters)
  getSales()
})

function getSales() {
  loading.value = true
  storeSale.getSales(objectUtils.cleanQueryEmpties(storeSale.filters))
}

function newSale() {
  router.push({ path: `/sales/create` })
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
function downloadReportDetail() {
  loading.value = true
  storeSale.getSalesReportDetail(
    objectUtils.cleanQueryEmpties(storeSale.filters)
  )
}

function downloadReport() {
  loading.value = true
  storeSale.getSalesReport(
    objectUtils.cleanQueryEmpties(storeSale.filters)
  )
}

watch(
  () => storeSale.reportDetail,
  newVal => {
    if (newVal) {
      loading.value = false
      objectUtils.downloadFile(newVal, 'ReporteDetalladoVentas.xlsx')
    }
  }
)

watch(
  () => storeSale.report,
  newVal => {
    if (newVal) {
      loading.value = false
      objectUtils.downloadFile(newVal, 'ReporteVentas.xlsx')
    }
  }
)

watch(
  () => storeSale.list,
  value => {
    sales = reactive(value.items)
    _.merge(storeSale.paginator, { total: value.total })
    loading.value = false
  }
)

watch(
  () => paginator,
  value => {
    _.merge(storeSale.paginator, value)
    getSales()
  }
)

function clickRow(row) {
  router.push({ path: `/sales/${row._id}` })
}

function cancelFilter() {
  filters.value = _.cloneDeep(storeSale.filters)
  onShowFilters.value = false
}

function confirmFilter() {
  _.merge(storeSale.paginator, { page: 1 })
  storeSale.filters = _.cloneDeep(filters.value)
  onShowFilters.value = false
  getSales()
}

function sortChange() {
  _.merge(storeSale.paginator, { page: 1 })
  getSales()
}

function cleanFilter() {
  _.merge(storeSale.paginator, { page: 1 })
  filters.value = {
    date: [],
    code: '',
    customer: '',
    pay_types: '',
    amount: [0, 5000],
  }
  storeSale.filters = _.cloneDeep(filters.value)
  getSales()
}

const isFiltered = computed(() =>
  _.isEqual(filters.value, {
    date: [],
    code: '',
    customer: '',
    pay_types: '',
    amount: [0, 5000],
  })
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
      <header-table :paginator="paginator" @change="getSales" />
    </template>
    <template #table>
      <sales-table
        v-model="sales"
        @click-row="clickRow"
        @sort-change="sortChange"
        :loading="loading"
      />
    </template>
    <template #filters>
      <sale-filters v-model="filters" />
    </template>
  </list-general>
</template>
