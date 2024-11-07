<script setup>
import { onMounted, watch, ref } from 'vue'
import { useRouter } from 'vue-router'

import HeaderTable from '@/components/header-table/HeaderTable.vue'
import ProductsTable from './components/ProductsTable.vue'

import { productStore } from '@/stores'
const router = useRouter()

const productsStore = productStore()
let products = ref([])
let paginator = ref({
  size: 20,
  current: 1,
  total: 0,
})
onMounted(() => {
  getProducts()
})

function getProducts() {
  const filters = {}
  productsStore.getProducts(filters, paginator)
}

watch(
  () => productsStore.list,
  value => {
    products.value = value.items
    paginator.value.total = value.total
  }
)

watch(
  () => paginator,
  value => {
    paginator.value = value
    getProducts()
  }
)

function clickRow(row) {
  router.push({ path: `/products/${row._id}` })
}
</script>

<template>
  <div class="container mt-4">
    <div class="row filtros">
      <header-table :paginator="paginator" />
    </div>
    <div class="row table-content">
      <products-table v-model="products" @click-row="clickRow" />
    </div>
  </div>
</template>
