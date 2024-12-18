<script setup>
import { storeToRefs } from 'pinia'
import { supplierStore } from '@/stores'

const storeSupplier = supplierStore()
const { sort } = storeToRefs(storeSupplier)

const emit = defineEmits(['clickRow', 'sortChange'])
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
      v-loading="props.loading"
      max-height="70vh"
      :default-sort="{ prop: 'created_at', order: 'descending' }"
      @row-click="clickRow"
      @sort-change="sortChange"
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
        prop="contact.name"
        label="Contacto"
        show-overflow-tooltip
        sortable
      />
      <el-table-column
        prop="contact.email"
        label="Email"
        show-overflow-tooltip
        sortable
      />
      <el-table-column
        prop="contact.phone"
        label="Teléfono"
        show-overflow-tooltip
      />
    </el-table>
  </div>
</template>


<style lang="scss" scoped>
</style>
