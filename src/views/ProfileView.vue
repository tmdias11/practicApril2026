<script setup>
import { ref, computed } from 'vue'
import { getCurrentUser, setCurrentUser, saveUsers, getUsers } from '../services/storage'

const user = ref(getCurrentUser())
const users = ref(getUsers())

const avatar = ref(user.value?.avatar || '')
const username = ref(user.value?.username || '')

const defaultAvatar = 'https://via.placeholder.com/120'

const roleLabel = computed(() => {
  if (!user.value) return ''
  return user.value.role === 'admin' ? 'Администратор' : 'Пользователь'
})

function saveAvatar() {
  if (!user.value) return

  user.value.avatar = avatar.value

  setCurrentUser(user.value)

  const updatedUsers = users.value.map(u =>
    u.id === user.value.id ? { ...u, avatar: avatar.value } : u
  )

  saveUsers(updatedUsers)
  users.value = updatedUsers
}

function saveUsername() {
  if (!user.value || !username.value.trim()) return

  user.value.username = username.value.trim()

  setCurrentUser(user.value)

  const updatedUsers = users.value.map(u =>
    u.id === user.value.id ? { ...u, username: username.value.trim() } : u
  )

  saveUsers(updatedUsers)
  users.value = updatedUsers
}

function onFileChange(e) {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()

  reader.onload = () => {
    avatar.value = reader.result
    saveAvatar()
  }

  reader.readAsDataURL(file)
}
</script>

<template>
  <div v-if="user" class="profile">

    <h1>Профиль</h1>

    <div class="card">

      <img
        :src="user.avatar || defaultAvatar"
        class="avatar"
      />

      <h2>{{ user.username }}</h2>

      <p class="role">{{ roleLabel }}</p>

    </div>

    <div class="edit">

      <h3>Никнейм</h3>

      <input v-model="username" placeholder="Новый никнейм">

      <button @click="saveUsername" class="redButton">Сохранить никнейм</button>

    </div>

    <div class="edit">

      <h3>Аватар</h3>

      <input v-model="avatar" placeholder="Ссылка на изображение">

      <input
        type="file"
        accept="image/*"
        @change="onFileChange"
      >

      <button @click="saveAvatar" class="redButton">Сохранить аватар</button>

    </div>

  </div>

  <div v-else class="profile">
    <h2>Пользователь не авторизован</h2>
  </div>
</template>

<style scoped>
.profile {
  max-width: 500px;
  margin: 50px auto;
  text-align: center;
  color: white;
}

.card {
  background: #2b2b2b;
  padding: 20px;
  border-radius: 10px;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.role {
  color: #aaa;
}

.edit {
  margin-top: 20px;
  background: #222;
  padding: 15px;
  border-radius: 10px;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 10px;
}

button {
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  cursor: pointer;
}
</style>