<script setup>
import { ref, computed } from 'vue'
import { useItems } from '../composables/useItems'
import { useUsers } from '../composables/useUsers'

const { items, addItem, updateItem, deleteForever } = useItems()
const { users, toggleBlock, changeRole } = useUsers()

const search = ref('')
const editMode = ref(null)

const stats = computed(() => {
  const active = items.value.filter(i => !i.deletedAt).length
  const deleted = items.value.filter(i => i.deletedAt).length
  const done = items.value.filter(i => i.done).length
  const banned = users.value.filter(u => u.blocked).length

  return {
    total: items.value.length,
    active,
    deleted,
    done,
    users: users.value.length,
    admins: users.value.filter(u => u.role === 'admin').length,
    banned
  }
})

const filteredItems = computed(() => {
  return items.value.filter(i =>
    i.title.toLowerCase().includes(search.value.toLowerCase()) ||
    String(i.id).includes(search.value)
  )
})

const form = ref({
  title: '',
  description: '',
  year: '',
  genreText: '',
  countriesText: '',
  image: '',
  trailer: '',
})

function parseList(str) {
  return str
    ? str.split(',').map(s => s.trim()).filter(Boolean)
    : []
}

function createMovie() {
  addItem({
    title: form.value.title,
    description: form.value.description,
    year: form.value.year,
    genre: parseList(form.value.genreText),
    countries: parseList(form.value.countriesText),
    image: form.value.image,
    trailer: form.value.trailer,
    done: false,
    deletedAt: null
  })

  resetForm()
}

function startEdit(item) {
  editMode.value = item.id

  form.value = {
    ...item,
    genreText: item.genre?.join(', ') || '',
    countriesText: item.countries?.join(', ') || '',
  }
}

function saveEdit() {
  updateItem(editMode.value, {
    title: form.value.title,
    description: form.value.description,
    year: form.value.year,
    genre: parseList(form.value.genreText),
    countries: parseList(form.value.countriesText),
    image: form.value.image,
    trailer: form.value.trailer,
  })

  editMode.value = null
  resetForm()
}

function removeMovie(id) {
  if (!confirm('Удалить фильм?')) return
  deleteForever(id)
}

function resetForm() {
  form.value = {
    title: '',
    description: '',
    year: '',
    genreText: '',
    countriesText: '',
    image: '',
    trailer: '',
  }
}
</script>

<template>
  <div class="admin">

    <h1 class="title">Админ-панель</h1>

    <div class="stats">
      <div class="stat-card"><h3>{{ stats.total }}</h3><p>Фильмы</p></div>
      <div class="stat-card"><h3>{{ stats.deleted }}</h3><p>Удалённые</p></div>
      <div class="stat-card"><h3>{{ stats.users }}</h3><p>Пользователи</p></div>
      <div class="stat-card"><h3>{{ stats.admins }}</h3><p>Админы</p></div>
      <div class="stat-card"><h3>{{ stats.banned }}</h3><p>Бан</p></div>
    </div>

    <input v-model="search" class="search" placeholder="Поиск">

    <div class="form">
      <h2>{{ editMode ? 'Редактировать' : 'Добавить фильм' }}</h2>

      <input v-model="form.title" placeholder="Название">
      <input v-model="form.description" placeholder="Описание">
      <input v-model="form.year" placeholder="Год">

      <input v-model="form.genreText" placeholder="Жанры (через запятую)">
      <input v-model="form.countriesText" placeholder="Страны (через запятую)">

      <input v-model="form.image" placeholder="Обложка">
      <input v-model="form.trailer" placeholder="Трейлер">

      <button v-if="!editMode" class="redButton" @click="createMovie">
        Добавить
      </button>

      <button v-else class="redButton" @click="saveEdit">
        Сохранить
      </button>
    </div>

    <div class="section">
      <h2>Фильмы</h2>

      <div v-for="item in filteredItems" :key="item.id" class="card">

        <div class="item-info">
          <span>{{ item.title }}</span>
        </div>

        <div class="actions">
          <button class="redButton lightButton" @click="startEdit(item)">
            Редактировать
          </button>

          <button class="redButton dangerButton" @click="removeMovie(item.id)">
            Удалить
          </button>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>Пользователи</h2>

      <div v-for="user in users" :key="user.id" class="card">
        <span>
          {{ user.username }} — {{ user.role }}
          <span v-if="user.blocked">(бан)</span>
        </span>

        <div class="actions">
          <button class="redButton lightButton" @click="changeRole(user)">
            Роль
          </button>

          <button class="redButton dangerButton" @click="toggleBlock(user)">
            {{ user.blocked ? 'Разбан' : 'Бан' }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.admin {
  padding: 30px;
  color: white;
  background: #141414;
  min-height: 100vh;
}

.title {
  font-size: 32px;
  margin-bottom: 20px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin-bottom: 25px;
}

.stat-card {
  background: #222;
  padding: 15px;
  border-radius: 12px;
  text-align: center;
}

.search {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: none;
}

.form {
  background: #1f1f1f;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
}

.form input {
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  border-radius: 6px;
  border: none;
}

.section {
  margin-top: 20px;
  background: #1a1a1a;
  padding: 15px;
  border-radius: 12px;
}

.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2a2a2a;
  padding: 10px;
  margin: 8px 0;
  border-radius: 8px;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
}

.actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.lightButton {
  background: white;
  color: black;
}

.dangerButton {
  background: #c0392b;
  color: white;
}

.banned {
  color: #ff6b6b;
  margin-left: 10px;
}
</style>