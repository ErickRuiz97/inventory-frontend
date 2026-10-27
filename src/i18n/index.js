import { computed } from 'vue'
import { createI18n } from 'vue-i18n'
import elementEs from 'element-plus/es/locale/lang/es'
import elementEn from 'element-plus/es/locale/lang/en'
import es from './locales/es.json'
import en from './locales/en.json'

const STORAGE_KEY = 'locale'
export const LOCALES = ['es', 'en']

// Idioma guardado por el usuario o, la primera vez, el del navegador
function initialLocale() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (LOCALES.includes(saved)) return saved
  return navigator.language?.startsWith('en') ? 'en' : 'es'
}

export const i18n = createI18n({
  legacy: false,
  locale: initialLocale(),
  fallbackLocale: 'es',
  messages: { es, en },
})

document.documentElement.lang = i18n.global.locale.value

const elementLocales = { es: elementEs, en: elementEn }
export const elementLocale = computed(
  () => elementLocales[i18n.global.locale.value],
)

export function setLocale(locale) {
  i18n.global.locale.value = locale
  localStorage.setItem(STORAGE_KEY, locale)
  document.documentElement.lang = locale
}
