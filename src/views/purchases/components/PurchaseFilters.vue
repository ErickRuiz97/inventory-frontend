<script setup>
import { onMounted, ref, watch } from 'vue'

const purchaseQueryElForm = ref()
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})
let localValue = ref({})

onMounted(() => {
  localValue.value = props.modelValue
})

watch(
  () => props.modelValue,
  value => {
    if (value) {
      localValue.value = value
    }
  }
)
</script>
<template>
  <div>
    <el-form ref="purchaseQueryElForm" :model="localValue" label-position="top">
    </el-form>
  </div>
</template>
<style lang="scss" scoped>
</style>
