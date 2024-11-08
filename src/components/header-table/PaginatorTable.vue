<script setup>
import { reactive } from 'vue'
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
      return {
        size: 20,
        current: 1,
        total: 0,
      }
    },
  },
})
let localValue = reactive(props.modelValue)

function handleCurrentChange() {
  emit('update:modelValue', localValue)
}
</script>
<template>
  <el-pagination
    v-model:current-page="localValue.current"
    :page-size="localValue.size"
    layout="total, prev, pager, next"
    :total="localValue.total"
    @current-change="handleCurrentChange"
  />
</template>

<style lang="scss" scoped>
</style>
