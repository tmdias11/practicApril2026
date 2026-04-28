<script setup>
import { ref, computed, onMounted } from 'vue'

import ItemForm from '../components/ItemForm.vue'
import ItemList from '../components/ItemList.vue'
import ItemFilters from '../components/ItemFilters.vue'

import { getItems, saveItems, initDataIfEmpty } from '../services/storage'

const items = ref([])

const filters = ref({
  search: '',
  sort: null,
  genres: [],
  countries: [],
  rating: null
})

const genreOptions = computed(() => {
  const set = new Set()
  items.value.forEach(item => {
    ;(item.genre || []).forEach(g => {
      const normalized = String(g).trim()
      if (normalized) set.add(normalized)
    })
  })
  return [...set].sort()
})

const countryOptions = computed(() => {
  const set = new Set()
  items.value.forEach(item => {
    ;(item.countries || []).forEach(c => {
      const normalized = String(c).trim()
      if (normalized) set.add(normalized)
    })
  })
  return [...set].sort()
})

onMounted(() => {
  initDataIfEmpty()
  items.value = getItems()
})

function addItem(item) {
  items.value.push(item)
  saveItems(items.value)
}

function toggleItem(id) {
  const item = items.value.find(i => i.id === id)
  if (item) {
    item.done = !item.done
    saveItems(items.value)
  }
}

function deleteItem(id) {
  items.value = items.value.filter(i => i.id !== id)
  saveItems(items.value)
}

function setFilter(payload) {
  filters.value = payload
}

const filteredItems = computed(() => {
  let result = [...items.value]

  if (filters.value.search) {
    const q = filters.value.search.toLowerCase()

    result = result.filter(i =>
      i.title.toLowerCase().startsWith(q)
    )
  }

  if (filters.value.genres.length) {
    result = result.filter(i =>
      filters.value.genres.some(g => i.genre?.includes(g))
    )
  }

  if (filters.value.countries.length) {
    result = result.filter(i =>
      filters.value.countries.some(c => i.countries?.includes(c))
    )
  }

  if (filters.value.rating === 'rating_asc') {
    result.sort((a, b) => (Number(a.rating) || 0) - (Number(b.rating) || 0))
  } else if (filters.value.rating === 'rating_desc') {
    result.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0))
  }

  if (!filters.value.rating && filters.value.sort === 'alpha_asc') {
    result.sort((a, b) => a.title.localeCompare(b.title))
  }

  if (!filters.value.rating && filters.value.sort === 'alpha_desc') {
    result.sort((a, b) => b.title.localeCompare(a.title))
  }

  if (!filters.value.rating && filters.value.sort === 'year_asc') {
    result.sort((a, b) => Number(a.year) - Number(b.year))
  }

  if (filters.value.sort === 'year_desc') {
    result.sort((a, b) => Number(b.year) - Number(a.year))
  }

  if (filters.value.sort === 'rating_asc') {
    result.sort((a, b) => (Number(a.rating) || 0) - (Number(b.rating) || 0))
  }

  if (filters.value.sort === 'rating_desc') {
    result.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0))
  }

  return result
})
</script>

<template>
  <div class="items-view">

    <ItemFilters
      :genre-options="genreOptions"
      :country-options="countryOptions"
      @change="setFilter"
    />

    <ItemList
      :items="filteredItems"
      @toggle="toggleItem"
      @delete="deleteItem"
    />

  </div>
</template>

<style scoped>
.items-view {
  max-width: 75%;
  margin: 0 auto;
  padding: 20px;
}
</style>