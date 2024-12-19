<script setup>
import ListGeneral from '@/components/ListGeneral.vue'
import ProductsMostSales from './components/ProductsMostSales.vue'
import SuppliersMostExpends from './components/SuppliersMostExpends.vue'
</script>
<template>
  <list-general>
    <template #table>
      <div class="row">
        <div class="col-md-6 col-lg-6 col-xl-6 col-sm-12">
          <products-most-sales />
        </div>
        <div class="col-md-6 col-lg-6 col-xl-6 col-sm-12">
          <suppliers-most-expends />
        </div>
      </div>
    </template>
  </list-general>
</template>


<style lang="scss" scoped>
</style>
