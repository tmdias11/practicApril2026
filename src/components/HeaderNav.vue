<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { currentUser, logoutUser } from '../services/storage'

const router = useRouter()

const user = computed(() => currentUser.value)
const isAuth = computed(() => !!user.value)

function logout() {
  logoutUser()
  router.push('/auth')
}
</script>

<template>
  <header class="header">

    <router-link to="/" class="homeLink">
      WatchCritics
    </router-link>

    <nav class="pages">

      <router-link to="/catalogue">Каталог</router-link>

      <router-link v-if="!isAuth" to="/auth">
        Вход / Регистрация
      </router-link>

      <router-link v-if="isAuth" to="/profile">
        Профиль
      </router-link>

      <router-link
        v-if="isAuth && user?.role === 'admin'"
        to="/admin"
      >
        Админ-панель
      </router-link>

      <router-link to="/settings">
        Настройки
      </router-link>

      <button
        v-if="isAuth"
        class="redButton"
        @click="logout"
      >
        Выйти
      </button>

    </nav>

  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 100px;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 999;
}

.pages {
  display: flex;
  gap: 15px;
  align-items: center;
}

a {
  color: white;
  text-decoration: none;
}

a:hover {
  color: rgb(255, 231, 97);
}

.homeLink {
  font-size: 24px;
  font-weight: bold;
  color: rgb(255, 231, 97);
}
</style>