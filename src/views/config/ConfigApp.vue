<script setup>
import BackupFile from '../config/components/BackupFile.vue'
import RestoreFile from '../config/components/RestoreFile.vue'

import DetailGeneral from '@/components/DetailGeneral.vue'
</script>
<template>
  <detail-general>
    <template #body>
      <div class="row table-content">
        <div class="col-6">
          <backup-file></backup-file>
        </div>
        <div class="col-6">
          <restore-file></restore-file>
        </div>
      </div>
    </template>
  </detail-general>
</template>


<style lang="scss" scoped>
</style>
