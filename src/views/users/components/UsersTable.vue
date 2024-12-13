<script setup>
import _ from 'lodash'
import { objectUtils } from '@/utils'
import { rolesUser } from '@/constants'
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
  <el-table
    :data="props.modelValue"
    max-height="70vh"
    @row-click="clickRow"
    v-loading="props.loading"
    class="tables"
  >
    <el-table-column prop="email" label="Email" />
    <el-table-column prop="full_name" label="Nombre completo" />
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
    >
      <template #default="scope">
        <el-icon v-if="scope.row.active"><check /></el-icon>
      </template>
    </el-table-column>
  </el-table>
</template>
<style lang="scss" scoped>
</style>
