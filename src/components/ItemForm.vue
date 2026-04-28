<script setup>
import { ref } from 'vue'

const emit = defineEmits(['submit'])

const title = ref('')
const description = ref('')
const genre = ref('')
const year = ref('')
const image = ref('')
const trailer = ref('')
const countries = ref('')

function handleSubmit() {
  if (!title.value) return alert('Title required')

  emit('submit', {
    id: Date.now(),
    title: title.value,
    description: description.value,
    genre: genre.value
    ? genre.value
        .split(',')
        .map(c => c.trim())
        .filter(Boolean)
    : [],
    year: year.value,
    countries: countries.value
    ? countries.value
        .split(',')
        .map(c => c.trim())
        .filter(Boolean)
    : [],
    image: image.value,
    trailer: trailer.value,
    done: false,
    deletedAt: null
  })

  title.value = ''
  description.value = ''
  year.value = ''
  image.value = ''
  trailer.value = ''
  countries.value = ''
}
</script>

<template>
  <div>
    <input v-model="title" placeholder="Название" />
    <input v-model="description" placeholder="Описание" />
    <input v-model="genre" placeholder="Жанры (через запятую)" />
    <input v-model="year" placeholder="Год" />
    <input v-model="countries" placeholder="Страны (через запятую)" />

    <input v-model="image" placeholder="Ссылка на обложку" />
    <input v-model="trailer" placeholder="Ссылка на трейлер" />

    <button @click="handleSubmit">Save</button>
  </div>
</template>