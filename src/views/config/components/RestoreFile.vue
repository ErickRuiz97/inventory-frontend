<script setup>
</script>
<template>
  <div class="h-100">
    <el-upload class="upload-demo" accept=".zip" drag>
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        Restaurar base de datos
        <br />
        Suelta el zip aquí o <em>click para seleccionarlo</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">zip respaldo generado</div>
      </template>
    </el-upload>
  </div>
</template>


<style lang="scss" scoped>
</style>
