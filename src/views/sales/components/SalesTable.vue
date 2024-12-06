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
      style="width: 100%"
      max-height="70vh"
      @row-click="clickRow"
      v-loading="props.loading"
    >
      <el-table-column prop="total_amount" label="Monto total" width="70" />
      <el-table-column prop="sale_date" label="Fecha de venta" />
    </el-table>
  </div>
</template>


<style lang="scss" scoped>
</style>
