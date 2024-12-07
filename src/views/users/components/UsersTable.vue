<script setup>
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
      <el-table-column prop="email" label="Email" />
      <el-table-column prop="full_name" label="Nombre completo" />
      <el-table-column prop="roles" label="Roles" />
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
  </div>
</template>
<style lang="scss" scoped>
</style>
