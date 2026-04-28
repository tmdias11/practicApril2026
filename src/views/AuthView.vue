<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getUsers, saveUsers, setCurrentUser } from '../services/storage'

const router = useRouter()

const mode = ref('login')

const username = ref('')
const password = ref('')

function login() {
  const users = getUsers()

  const user = users.find(
    u => u.username === username.value && u.password === password.value
  )

  if (!user) {
    alert('Неверный логин или пароль')
    return
  }

  setCurrentUser(user)
  router.push('/')
}

function register() {
  const users = getUsers()

  const exists = users.find(u => u.username === username.value)

  if (exists) {
    alert('Пользователь уже существует')
    return
  }

  const newUser = {
    id: Date.now(),
    username: username.value,
    password: password.value,
    role: users.length === 0 ? 'admin' : 'user'
  }

  users.push(newUser)
  saveUsers(users)

  setCurrentUser(newUser)

  router.push('/')
}
</script>

<template>
  <div class="auth">

    <h1>{{ mode === 'login' ? 'Вход' : 'Регистрация' }}</h1>

    <input v-model="username" placeholder="Логин">
    <input v-model="password" type="password" placeholder="Пароль">

    <button v-if="mode === 'login'" @click="login">Войти</button>
    <button v-else @click="register">Зарегистрироваться</button>

    <p @click="mode = mode === 'login' ? 'register' : 'login'" class="switch">
      {{ mode === 'login'
        ? 'Нет аккаунта? Регистрация'
        : 'Уже есть аккаунт? Вход' }}
    </p>

  </div>
</template>

<style scoped>
.auth {
  max-width: 300px;
  margin: 100px auto;
  padding: 20px;
  background: #2b2b2b;
  border-radius: 10px;
  color: white;
  text-align: center;
}

input {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 8px;
}

button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
}

.switch {
  margin-top: 15px;
  cursor: pointer;
  color: #aaa;
}
.switch:hover {
  color: white;
}
</style>