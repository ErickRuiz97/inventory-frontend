import { computed } from 'vue'
import { configStore } from '@/stores/config.store'

export function useConfig() {
  const storeConfig = configStore()

  const config = computed(() => storeConfig.entity)
  const symbol = computed(() => storeConfig.entity?.currency?.symbol || '')
  const logo = computed(() => storeConfig.entity?.company?.logo || '')
  const categories = computed(() => storeConfig.entity?.categories || [])

  return {
    config,
    symbol,
    logo,
    categories,
  }
}
