<script setup>
import { onMounted, watch, ref } from 'vue'
import { ElMessage } from 'element-plus'

import ListGeneral from '@/components/ListGeneral.vue'
import ProductsMostSales from './components/ProductsMostSales.vue'
import SuppliersMostExpends from './components/SuppliersMostExpends.vue'
import { dashboardStore } from '@/stores'

const storeDashboard = dashboardStore()
let dashboard = ref({
  top_10_products: [],
  top_3_suppliers: [],
})
onMounted(() => {
  storeDashboard.getDashboard()
})

watch(
  () => storeDashboard.dashboard,
  newVal => {
    if (newVal) {
      dashboard.value = newVal
    }
  }
)

watch(
  () => storeDashboard.error,
  value => {
    if (value) {
      ElMessage.error(value)
      storeDashboard.errorBackup = null
    }
  }
)
</script>
<template>
  <list-general>
    <template #table>
      <el-scrollbar height="70vh">
        <div class="row">
          <div class="col-md-6 col-lg-6 col-xl-6 col-sm-12">
            <products-most-sales v-model="dashboard.top_10_products" />
          </div>
          <div class="col-md-6 col-lg-6 col-xl-6 col-sm-12">
            <suppliers-most-expends v-model="dashboard.top_3_suppliers" />
          </div>
        </div>
      </el-scrollbar>
    </template>
  </list-general>
</template>


<style lang="scss" scoped>
</style>
