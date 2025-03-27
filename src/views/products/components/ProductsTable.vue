<script setup>
import _ from 'lodash'
import { objectUtils } from '@/utils'
import { storeToRefs } from 'pinia'
import { productStore } from '@/stores'
import { inject } from 'vue'
const storeProduct = productStore()
const { sort } = storeToRefs(storeProduct)

const emit = defineEmits(['clickRow', 'sortChange'])
let symbol = inject('currencySymbol')
let categories = inject('categories')
let props = defineProps({
  modelValue: {
    type: [Array],
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: true,
  },
})
function clickRow(row) {
  emit('clickRow', row)
}
function sortChange(row) {
  if (!row.order) {
    sort.value = { sort: 'created_at', order: 'descending' }
    emit('sortChange', row)
    return
  } else sort.value = { sort: row.prop, order: row.order }
  emit('sortChange', row)
}
</script>
<template>
  <div>
    <el-table
      :data="props.modelValue"
      max-height="70vh"
      :default-sort="{ prop: 'created_at', order: 'descending' }"
      @row-click="clickRow"
      @sort-change="sortChange"
      v-loading="props.loading"
      class="tables"
    >
      <el-table-column prop="code" label="Código" width="80" sortable />
      <el-table-column
        prop="name"
        label="Nombre"
        show-overflow-tooltip
        sortable
      />
      <el-table-column
        prop="description"
        label="Descripción"
        show-overflow-tooltip
      />
      <el-table-column
        prop="categories"
        label="Categorías"
        show-overflow-tooltip
      >
        <template #default="scope">{{
          objectUtils.arrayStrUpperToStr(
            scope.row.categories.map(
              val => _.find(categories, { value: val })?.label
            ),
            ' | '
          )
        }}</template>
      </el-table-column>
      <el-table-column
        prop="purchase_price"
        :label="`Compra (${symbol})`"
        width="110"
        align="right"
        sortable
      />
      <el-table-column
        prop="sale_price"
        :label="`Venta (${symbol})`"
        width="100"
        align="right"
        sortable
      />
      <el-table-column
        prop="trend"
        label="Tendencia"
        width="95"
        align="center"
        sortable
      >
        <template #default="scope">
          <el-icon color="red" v-if="scope.row.trend == 'UPWARD'"
            ><caret-top
          /></el-icon>
          <el-icon color="mediumseagreen" v-if="scope.row.trend == 'FALLING'"
            ><caret-bottom
          /></el-icon>
          <el-icon v-if="scope.row.trend == 'EQUAL'"><d-caret /></el-icon>
        </template>
      </el-table-column>
      <el-table-column
        prop="stock"
        label="Und"
        width="70"
        align="center"
        sortable
      />
    </el-table>
  </div>
</template>


<style lang="scss" scoped>
</style>
