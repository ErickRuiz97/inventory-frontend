<script setup>
import _ from 'lodash'
import { objectUtils } from '@/utils'
import { rolesUser } from '@/constants'
import { storeToRefs } from 'pinia'
import { userStore } from '@/stores'

const storeUser = userStore()
const { sort } = storeToRefs(storeUser)

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
      max-height="70vh"
      :default-sort="{ prop: 'created_at', order: 'descending' }"
      @row-click="clickRow"
      @sort-change="sortChange"
      v-loading="props.loading"
      class="tables"
    >
      <el-table-column prop="email" label="Email" sortable />
      <el-table-column prop="full_name" label="Nombre completo" sortable />
      <el-table-column prop="roles" label="Roles">
        <template #default="scope">
          {{
            objectUtils.arrayStrUpperToStr(
              scope.row.roles.map(
                val => _.find(rolesUser, { value: val })?.label
              ),
              ' | '
            )
          }}
        </template>
      </el-table-column>
      <el-table-column
        label="Activo"
        width="100"
        align="center"
        header-align="center"
        prop="active"
        sortable
      >
        <template #default="scope">
          <el-icon v-if="scope.row.active"><check /></el-icon>
          <div v-else></div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style lang="scss" scoped>
</style>
