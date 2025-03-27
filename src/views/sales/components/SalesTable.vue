<script setup>
import _ from 'lodash'
import moment from 'moment'
import { payTypes } from '@/constants'
import { storeToRefs } from 'pinia'
import { saleStore } from '@/stores'
import { inject } from 'vue'
const storeSale = saleStore()
const { sort } = storeToRefs(storeSale)

const emit = defineEmits(['clickRow', 'sortChange'])
let symbol = inject('currencySymbol')

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
  return moment.utc(date).local().format('DD/MM/YYYY h:mm A')
}

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
      v-loading="props.loading"
      @row-click="clickRow"
      @sort-change="sortChange"
      class="tables"
    >
      <el-table-column prop="_id" label="Código" width="180" sortable />
      <el-table-column prop="created_at" label="Fecha" width="150" sortable>
        <template #default="scope">{{
          formatDate(scope.row.created_at)
        }}</template>
      </el-table-column>
      <el-table-column
        prop="customer"
        label="Cliente"
        show-overflow-tooltip
        sortable
      />
      <el-table-column
        prop="user"
        label="Usuario"
        width="150"
        align="let"
        header-align="left"
      />
      <el-table-column prop="pay_type" label="Forma de pago" width="200">
        <template #default="scope">
          {{ _.find(payTypes, { value: scope.row.pay_type })?.label }}
        </template>
      </el-table-column>
      <el-table-column
        prop="total_amount"
        :label="`Cantidad total (${symbol})`"
        width="150"
        align="right"
        header-align="right"
        sortable
      />
    </el-table>
  </div>
</template>
<style lang="scss" scoped>
</style>
