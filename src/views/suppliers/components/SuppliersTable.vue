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
  <el-table
    :data="props.modelValue"
    v-loading="props.loading"
    max-height="70vh"
    @row-click="clickRow"
    class="tables"
  >
    <el-table-column prop="code" label="Código" width="80" />
    <el-table-column prop="name" label="Nombre" show-overflow-tooltip />
    <el-table-column
      prop="contact.name"
      label="Contacto"
      show-overflow-tooltip
    />
    <el-table-column prop="contact.email" label="Email" show-overflow-tooltip />
    <el-table-column
      prop="contact.phone"
      label="Teléfono"
      show-overflow-tooltip
    />
  </el-table>
</template>


<style lang="scss" scoped>
</style>
