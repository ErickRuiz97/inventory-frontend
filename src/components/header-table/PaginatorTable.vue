<script setup>
import { reactive } from 'vue'
const emit = defineEmits(['change'])

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
      return {
        limit: 20,
        page: 1,
        total: 0,
      }
    },
  },
})
let localValue = reactive(props.modelValue)

function handleChange() {
  emit('change')
}
</script>
<template>
  <el-pagination
    v-model:current-page="localValue.page"
    :page-size="localValue.limit"
    layout="total, prev, pager, next"
    :total="localValue.total"
    @change="handleChange"
  />
</template>

<style lang="scss" scoped>
</style>
