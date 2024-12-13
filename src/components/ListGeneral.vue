<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isShowFilters: {
    type: Boolean,
    default: false,
  },
})

const onShowFilters = ref(false)

watch(
  () => props.isShowFilters,
  value => {
    onShowFilters.value = value
  }
)
</script>
<template>
  <div>
    <div class="row header-content">
      <slot name="actions" />
    </div>
    <div class="row table-content">
      <el-card shadow="always">
        <div class="row">
          <slot name="header" />
        </div>
        <div class="row">
          <slot name="table" />
        </div>
      </el-card>
    </div>

    <el-drawer v-model="onShowFilters" direction="rtl">
      <template #header>
        <h4>Filtro de búsqueda</h4>
      </template>
      <template #default>
        <slot name="filters" />
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="$emit('cancelFilter')">Cancelar</el-button>
          <el-button type="primary" @click="$emit('confirmFilter')"
            >Aceptar</el-button
          >
        </div>
      </template>
    </el-drawer>
  </div>
</template>
<style lang="scss" scoped>
</style>
