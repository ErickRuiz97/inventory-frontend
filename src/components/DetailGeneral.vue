<template>
  <div>
    <div class="row header-content">
      <slot name="header"></slot>
    </div>
    <div class="row formulario-content">
      <el-card shadow="always">
        <slot name="body"></slot>
      </el-card>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
</style>
