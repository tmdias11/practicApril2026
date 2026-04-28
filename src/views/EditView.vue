<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { useItems } from '../composables/useItems'

const route = useRoute()
const router = useRouter()

const { items, updateItem } = useItems()

const item = computed(() =>
  items.value.find(i => String(i.id) === String(route.params.id))
)

const form = ref({
  title: '',
  description: '',
  year: '',
  genre: [],
  countries: [],
  image: '',
  trailer: ''
})

watch(item, (val) => {
  if (!val) return

  form.value = {
    title: val.title,
    description: val.description,
    year: val.year,
    genre: val.genre ? [...val.genre] : [],
    countries: val.countries ? [...val.countries] : [],
    image: val.image,
    trailer: val.trailer
  }
}, { immediate: true })

function save() {
  if (!item.value) return

  updateItem(item.value.id, form.value)
  router.push(`/movie/${item.value.id}`)
}
</script>

<template>
  <div v-if="item">
    <h1>Редактирование</h1>

    <input v-model="form.title" placeholder="Название">
    <textarea v-model="form.description" placeholder="Описание"></textarea>

    <input v-model="form.year" placeholder="Год">
    <input v-model="form.image" placeholder="Картинка">
    <input v-model="form.trailer" placeholder="Трейлер">

    <button @click="save">Сохранить</button>
  </div>

  <div v-else>
    <p>Фильм не найден</p>
    <button @click="router.push('/')">На главную</button>
  </div>
</template>