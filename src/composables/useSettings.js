import { computed, ref, watch } from 'vue'
import { getSettings, saveSettings } from '../services/storage'

const defaultSettings = {
  theme: 'light',
  viewMode: 'cards',
  confirmDelete: true
}

const settings = ref(defaultSettings)

const saved = getSettings()

if (saved) {
  settings.value = {
    ...defaultSettings,
    ...saved
  }
}

function applyTheme(theme) {
  const root = document.documentElement

  root.classList.remove('theme-light', 'theme-dark')
  root.classList.add(`theme-${theme}`)
}

applyTheme(settings.value.theme)

watch(
  () => settings.value.theme,
  (newTheme) => {
    applyTheme(newTheme)
  }
)

const themeClass = computed(() => {
  return `theme-${settings.value.theme}`
})

function updateSettings(newSettings) {
  settings.value = {
    ...settings.value,
    ...newSettings
  }

  saveSettings(settings.value)
}

function toggleTheme() {
  updateSettings({
    theme: settings.value.theme === 'light' ? 'dark' : 'light'
  })
}

function setViewMode(mode) {
  updateSettings({ viewMode: mode })
}

function setConfirmDelete(value) {
  updateSettings({ confirmDelete: value })
}

export function useSettings() {
  return {
    settings,
    themeClass,
    updateSettings,
    toggleTheme,
    setViewMode,
    setConfirmDelete
  }
}