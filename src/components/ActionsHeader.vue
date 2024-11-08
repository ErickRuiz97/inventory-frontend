<script setup>
const emit = defineEmits(['action'])
import { Refresh } from '@element-plus/icons-vue'

const props = defineProps({
  actions: {
    type: Array,
    default: () => [],
  },
  refresh: {
    type: Boolean,
    default: true,
  },
})

function eventHandler(val) {
  emit('action', val)
}
</script>
<template>
  <div class="clearfix mt-4 mb-2">
    <div class="float-start">
      <el-button
        v-for="action in actions"
        :key="action.event"
        :type="action.type"
        :icon="action.icon"
        @click="eventHandler(action.event)"
        round
        >{{ action.label }}</el-button
      >
    </div>
    <div class="float-end">
      <el-button
        v-if="props.refresh"
        type="default"
        :icon="Refresh"
        @click="eventHandler('onRefresh')"
        round
        >Refrescar</el-button
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
