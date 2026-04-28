<script setup>
import { useSettings } from '../composables/useSettings'

const { settings, toggleTheme } = useSettings()
</script>

<template>
  <div class="settings-container">
    <h1>Настройки</h1>

    <div class="settings-section">
      <h2>Тема</h2>

      <button @click="toggleTheme" class="setting-button">
        {{ settings.theme === 'light' ? '🌞 Светлая тема' : '🌙 Темная тема' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.settings-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.settings-section {
  padding: 20px;
  border-radius: 16px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  margin-top: 25px;
}

.setting-button {
  padding: 12px 20px;
  border-radius: 10px;
  border: 1px solid var(--button-border);
  background: var(--button-bg);
  color: var(--button-text);
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s;
  margin-top: 10px;
}

.setting-button:hover {
  transform: scale(1.05);
}
</style>