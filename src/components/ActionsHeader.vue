<script setup>
import { Refresh, Filter, Delete } from '@element-plus/icons-vue'
const emit = defineEmits(['action'])

const props = defineProps({
  actions: {
    type: Array,
    default: () => [],
  },
  refresh: {
    type: Boolean,
    default: true,
  },
  filterActive: {
    type: Boolean,
    default: false,
  },
})

function eventHandler(val) {
  emit('action', val)
}
</script>
<template>
  <div class="clearfix">
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
      <el-button-group class="ms-1">
        <el-button
          v-if="props.refresh && filterActive"
          type="warning"
          :icon="Delete"
          @click="eventHandler('onCleanFilter')"
          round
        ></el-button>
        <el-button
          v-if="props.refresh"
          :type="filterActive ? 'success' : 'default'"
          :icon="Filter"
          @click="eventHandler('onFilter')"
          round
          >Filtrar</el-button
        >
      </el-button-group>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
