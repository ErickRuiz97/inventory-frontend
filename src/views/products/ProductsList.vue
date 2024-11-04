<script setup>
import { onMounted, watch, ref } from 'vue'
import ProductsTable from './components/ProductsTable.vue'
import { productStore } from '@/stores'

const productsStore = productStore()
let products = ref([])
let total = ref(0)
let currentPage = ref(0)
onMounted(() => {
  getProducts()
})

function getProducts() {
  const filters = {}
  productsStore.getProducts(filters)
}

watch(
  () => productsStore.list,
  value => {
    products.value = value.items
    total.value = value.total
  }
)

function handleCurrentChange(val) {
  console.log(val)
}
</script>

<template>
  <div class="container mt-4">
    <div class="row filtros">
      <div class="col-auto">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="20"
          layout="total, prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <div class="row table-content">
      <products-table v-model="products" />
    </div>
  </div>
</template>
