<script setup>
import { objectUtils } from '@/utils'
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
          objectUtils.arrayStrUpperToStr(scope.row.categories, ' | ')
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
      <el-table-column prop="stock" label="Und" width="70" align="center" />
    </el-table>
  </div>
</template>


<style lang="scss" scoped>
</style>
