<script setup>
import moment from 'moment'

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
  return moment.utc(date).local().format('DD/MM/YYYY h:mm A')
}

function clickRow(row) {
  emit('clickRow', row)
}
</script>

<template>
  <div>
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
      <el-table-column prop="supplier" label="Proveedor" show-overflow-tooltip>
        <template #default="scope">
          {{ scope.row.supplier.code }} - {{ scope.row.supplier.name }}
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
  </div>
</template>

<style lang="scss" scoped>
</style>
