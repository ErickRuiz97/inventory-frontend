<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const $route = useRoute()
const { t } = useI18n()

const breadcrumbs = computed(() => {
  const currentPath = $route.path
  const pathSegments = currentPath.split('/')
  pathSegments.pop() // Eliminamos el último segmento (ruta actual)

  const breadcrumbsArray = []
  while (pathSegments.length > 1) {
    const parentPath = pathSegments.join('/')
    const parentRoute = router.resolve({ path: parentPath })

    breadcrumbsArray.unshift({
      path: parentRoute.path,
      text: parentRoute.meta.breadcrumb
        ? t(parentRoute.meta.breadcrumb)
        : parentRoute.name,
    })

    pathSegments.pop()
  }

  // Agregamos el breadcrumb de la ruta actual al final
  breadcrumbsArray.push({
    path: $route.path,
    text: $route.meta.breadcrumb ? t($route.meta.breadcrumb) : $route.name,
  })

  return breadcrumbsArray
})
</script>
<template>
  <el-breadcrumb separator=">">
    <el-breadcrumb-item
      v-for="(dir, key) in breadcrumbs"
      :to="{ path: dir.path }"
      :key="key"
      >{{ dir.text }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<style lang="scss" scoped></style>
