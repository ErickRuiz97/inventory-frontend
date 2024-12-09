<script setup>
import _ from 'lodash'
import { onMounted, watch, ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { objectUtils } from '@/utils'

import HeaderTable from '@/components/header-table/HeaderTable.vue'
import ProductsTable from './components/ProductsTable.vue'
import ActionsHeader from '@/components/ActionsHeader.vue'
import ProductFilters from './components/ProductFilters.vue'

import { productStore } from '@/stores'
const router = useRouter()
const storeProduct = productStore()
const actions = [
  {
    event: 'onNewProduct',
    type: 'primary',
    icon: Plus,
    label: 'Nuevo',
  },
]
const events = {
  onNewProduct: newProduct,
  onRefresh: getProducts,
  onFilter: showFilters,
  onCleanFilter: cleanFilter,
}
let products = reactive([])
let loading = ref(true)
let onShowFilters = ref(false)
let paginator = reactive({
  limit: 20,
  page: 1,
  total: 0,
})
let filters = ref({
  name: '',
  code: '',
  categories: [],
  stock: 'ALL',
})

onMounted(() => {
  filters.value = _.cloneDeep(storeProduct.filters)
  getProducts()
})

function getProducts() {
  loading.value = true
  storeProduct.getProducts(
    objectUtils.cleanQueryEmpties(storeProduct.filters),
    paginator
  )
}

function newProduct() {
  router.push({ path: `/products/create` })
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
  () => storeProduct.list,
  value => {
    products = reactive(value.items)
    paginator.total = value.total
    loading.value = false
  }
)

watch(
  () => paginator,
  value => {
    paginator = value
    getProducts()
  }
)

function clickRow(row) {
  router.push({ path: `/products/${row._id}` })
}

function cancelFilter() {
  filters.value = _.cloneDeep(storeProduct.filters)
  onShowFilters.value = false
}

function confirmFilter() {
  storeProduct.filters = _.cloneDeep(filters.value)
  onShowFilters.value = false
  getProducts()
}

function cleanFilter() {
  filters.value = {
    name: '',
    code: '',
    categories: [],
    stock: 'ALL',
  }
  storeProduct.filters = _.cloneDeep(filters.value)
  getProducts()
}

const isFiltered = computed(() =>
  _.isEqual(filters.value, {
    name: '',
    code: '',
    categories: [],
    stock: 'ALL',
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
    <div class="row">
      <header-table :paginator="paginator" @change="getProducts" />
    </div>
    <div class="row table-content">
      <products-table
        v-model="products"
        @click-row="clickRow"
        :loading="loading"
      />
    </div>

    <el-drawer v-model="onShowFilters" direction="rtl">
      <template #header>
        <h4>Filtro de búsqueda</h4>
      </template>
      <template #default>
        <product-filters v-model="filters" />
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
