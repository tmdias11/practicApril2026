<script setup>
import HeaderNav from './components/HeaderNav.vue'
import AppLoader from './components/AppLoader.vue'
import AppFooter from './components/AppFooter.vue'
import { useSettings } from './composables/useSettings'

const { themeClass } = useSettings()
</script>

<template>
  <div :class="['app', themeClass]">
    <HeaderNav />
    <AppLoader />
    <main class="main">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  /* 🔥 плавная смена */
  transition: background 0.4s ease, color 0.4s ease;
}

.main {
  flex: 1;
}
</style>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: "Inter", sans-serif;
  box-sizing: border-box;

  /* 🔥 плавная тема ДЛЯ ВСЕГО */
  transition:
    background-color 0.4s ease,
    color 0.4s ease,
    border-color 0.4s ease,
    box-shadow 0.4s ease;
}

/* 🌞 LIGHT */
.theme-light {
  --bg-color: #f5f5f5;
  --text-color: #111111;
  --card-bg: #ffffff;
  --border-color: #dddddd;
  --button-bg: #ffffff;
  --button-text: #111111;
  --button-border: #cccccc;
}

/* 🌙 DARK */
.theme-dark {
  --bg-color: #0f0f0f;
  --text-color: #ffffff;
  --card-bg: #1e1e1e;
  --border-color: #333333;
  --button-bg: #2a2a2a;
  --button-text: #ffffff;
  --button-border: #444444;
}

/* 🌈 базовый фон */
body {
  background: var(--bg-color);
  color: var(--text-color);
}

/* 🔥 кнопки */
.redButton {
  padding: 12px 25px;
  border-radius: 25px;
  border: none;
  background: linear-gradient(135deg, #ff3b3b, #ff6b6b);
  color: white;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.redButton:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 59, 59, 0.4);
}
</style>