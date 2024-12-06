<script setup>
import BackupFile from '../config/components/BackupFile.vue'
import RestoreFile from '../config/components/RestoreFile.vue'
</script>
<template>
  <div>
    <div class="row table-content">
      <div class="col-6">
        <backup-file></backup-file>
      </div>
      <div class="col-6">
        <restore-file></restore-file>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
</style>
