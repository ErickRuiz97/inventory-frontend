<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const directories = computed(() => {
  const breadcrumbs = []
  let ruta = route
  while (ruta && ruta.name) {
    breadcrumbs.unshift({ name: ruta.name, path: ruta.path })
    ruta = ruta.matched[0].parent
  }
  console.log(breadcrumbs)
  return breadcrumbs

  /*const dirs = route.path.split("/");
  const res = []
  for (const dir of dirs) {
    const route = {
      uri: '',
      name: ''
    }
    res.push(route)
  }
  return route;*/
})
</script>
<template>
  <el-breadcrumb separator=">">
    <el-breadcrumb-item
      v-for="(dir, key) in directories"
      :to="{ path: dir.path }"
      :key="key"
      >{{ dir.name }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>


<style lang="scss" scoped>
</style>
