<script setup>
const emit = defineEmits(['action'])
import { Refresh, Filter, RemoveFilled } from '@element-plus/icons-vue'

const props = defineProps({
  actions: {
    type: Array,
    default: () => [],
  },
  refresh: {
    type: Boolean,
    default: true,
  },
  filter_active: {
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
      <el-button-group v-if="props.refresh" class="ms-1">
        <el-button
          :type="filter_active ? 'primary' : 'default'"
          :icon="RemoveFilled"
          @click="eventHandler('onCleanFilter')"
          round
        ></el-button>
        <el-button
          :type="filter_active ? 'primary' : 'default'"
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
