<script setup>
import ListGeneral from '@/components/ListGeneral.vue'
import ProductsMostSales from './components/ProductsMostSales.vue'
import SuppliersMostExpends from './components/SuppliersMostExpends.vue'
import ProductsPrices from './components/ProductsPrices.vue'
</script>
<template>
  <list-general>
    <template #table>
      <el-scrollbar height="70vh">
        <div class="row">
          <div class="col-md-6 col-lg-6 col-xl-6 col-sm-12">
            <products-most-sales />
          </div>
          <div class="col-md-6 col-lg-6 col-xl-6 col-sm-12">
            <suppliers-most-expends />
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 col-lg-12 col-xl-12 col-sm-12">
            <products-prices />
          </div>
        </div>
      </el-scrollbar>
    </template>
  </list-general>
</template>


<style lang="scss" scoped>
</style>
