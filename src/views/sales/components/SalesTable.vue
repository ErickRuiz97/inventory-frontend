<script setup>
import _ from 'lodash'
import moment from 'moment'
import { payTypes } from '@/constants'

const emit = defineEmits(['clickRow'])

const props = defineProps({
  modelValue: {
    type: [Array],
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: true,
  },
})

function formatDate(date) {
  return moment.utc(date).local().format('DD/MM/YYYY HH:mm')
}

function clickRow(row) {
  emit('clickRow', row)
}
</script>

<template>
  <el-table
    :data="props.modelValue"
    max-height="70vh"
    v-loading="props.loading"
    @row-click="clickRow"
    class="tables"
  >
    <el-table-column prop="created_at" label="Fecha" width="150">
      <template #default="scope">{{
        formatDate(scope.row.created_at)
      }}</template>
    </el-table-column>
    <el-table-column prop="customer" label="Cliente" show-overflow-tooltip />
    <el-table-column prop="pay_type" label="Forma de pago" width="200">
      <template #default="scope">
        {{ _.find(payTypes, { value: scope.row.pay_type })?.label }}
      </template>
    </el-table-column>
    <el-table-column
      prop="total_amount"
      label="Cantidad total C$"
      width="150"
      align="right"
      header-align="right"
    />
  </el-table>
</template>
<style lang="scss" scoped>
</style>
