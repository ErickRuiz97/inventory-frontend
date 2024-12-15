<script setup>
import _ from 'lodash'
import { objectUtils } from '@/utils'
import { categories } from '@/constants'
const emit = defineEmits(['clickRow'])

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
</script>
<template>
  <div>
    <el-table
      :data="props.modelValue"
      max-height="70vh"
      @row-click="clickRow"
      v-loading="props.loading"
      class="tables"
    >
      <el-table-column prop="code" label="Código" width="70" />
      <el-table-column prop="name" label="Nombre" show-overflow-tooltip />
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
        label="Compra (C$)"
        width="85"
        align="right"
      />
      <el-table-column
        prop="sale_price"
        label="Venta (C$)"
        width="85"
        align="right"
      />
      <el-table-column
        prop="trend"
        label="Tendencia"
        width="75"
        align="center"
      >
        <template #default="scope">
          <el-icon color="mediumseagreen" v-if="scope.row.trend == 'UPWARD'"><caret-top /></el-icon>
          <el-icon color="red" v-if="scope.row.trend == 'FALLING'"><caret-bottom /></el-icon>
          <el-icon  v-if="scope.row.trend == 'EQUAL'"><d-caret /></el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="stock" label="Und" width="50" align="center" />
    </el-table>
  </div>
</template>


<style lang="scss" scoped>
</style>
