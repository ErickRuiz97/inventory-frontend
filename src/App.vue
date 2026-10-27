<script setup>
import { elementLocale } from '@/i18n'
</script>
<template>
  <el-config-provider namespace="ep" :locale="elementLocale">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped></style>
