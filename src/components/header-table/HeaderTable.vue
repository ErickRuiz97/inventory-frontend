<script setup>
import PaginatorTable from './PaginatorTable.vue'
import { watch, reactive } from 'vue'
const emit = defineEmits(['update:paginator'])

const props = defineProps({
  paginator: {
    type: Object,
    default: () => {
      return {
        size: 20,
        current: 0,
        total: 0,
      }
    },
  },
})
let paginator = reactive(props.paginator)

watch(
  () => paginator,
  value => {
    emit('update:paginator', value)
  }
)
</script>
<template>
  <div class="clearfix">
    <div class="float-start">
      <paginator-table v-model="paginator" />
    </div>
  </div>
</template>


<style lang="scss" scoped>
</style>
