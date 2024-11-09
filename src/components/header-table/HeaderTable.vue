<script setup>
import PaginatorTable from './PaginatorTable.vue'
import { watch, reactive } from 'vue'
const emit = defineEmits(['change'])

const props = defineProps({
  paginator: {
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
let paginator = reactive(props.paginator)

function handleChange() {
  emit('change')
}
</script>
<template>
  <div class="clearfix">
    <div class="float-start">
      <paginator-table v-model="paginator" @change="handleChange" />
    </div>
  </div>
</template>


<style lang="scss" scoped>
</style>
