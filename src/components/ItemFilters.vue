<script setup>
import { reactive, watch, computed, ref } from 'vue'

const props = defineProps({
  genreOptions: {
    type: Array,
    default: () => []
  },
  countryOptions: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['change'])

const filters = reactive({
  search: '',
  sort: null,
  genres: [],
  countries: [],
  rating: null
})

const showAllGenres = ref(false)
const showAllCountries = ref(false)

const visibleGenres = computed(() =>
  props.genreOptions.slice(0, showAllGenres.value ? props.genreOptions.length : 10)
)

const visibleCountries = computed(() =>
  props.countryOptions.slice(0, showAllCountries.value ? props.countryOptions.length : 10)
)

function toggleArrayValue(arr, value) {
  const index = arr.indexOf(value)

  if (index === -1) {
    arr.push(value)
  } else {
    arr.splice(index, 1)
  }
}

watch(filters, () => {
  emit('change', { ...filters })
}, { deep: true })
</script>

<template>
  <div class="filters">

    <input
      v-model="filters.search"
      placeholder="Поиск по названию..."
      class="search"
    />

    <div class="block">
      <span class="label">Жанры</span>

      <div class="multi">
        <div
          v-for="g in visibleGenres"
          :key="g"
          @click="toggleArrayValue(filters.genres, g)"
          :class="['tag', { active: filters.genres.includes(g) }]"
        >
          {{ g }}
        </div>
      </div>

      <button
        v-if="props.genreOptions.length > 10"
        type="button"
        class="show-more"
        @click="showAllGenres = !showAllGenres"
      >
        {{ showAllGenres ? 'Показать меньше' : 'Показать все' }}
      </button>
    </div>

    <div class="block">
      <span class="label">Страны</span>

      <div class="multi">
        <div
          v-for="c in visibleCountries"
          :key="c"
          @click="toggleArrayValue(filters.countries, c)"
          :class="['tag', { active: filters.countries.includes(c) }]"
        >
          {{ c }}
        </div>
      </div>

      <button
        v-if="props.countryOptions.length > 10"
        type="button"
        class="show-more"
        @click="showAllCountries = !showAllCountries"
      >
        {{ showAllCountries ? 'Показать меньше' : 'Показать все' }}
      </button>
    </div>

    <div class="block">
      <span class="label">Рейтинг</span>

      <select v-model="filters.rating" class="select">
        <option value="">Нет</option>
        <option value="rating_asc">Рейтинг ↑</option>
        <option value="rating_desc">Рейтинг ↓</option>
      </select>
    </div>

    <div class="block">
      <span class="label">Сортировка</span>

      <select v-model="filters.sort" class="select">
        <option value="">Нет</option>
        <option value="alpha_asc">A → Z</option>
        <option value="alpha_desc">Z → A</option>
        <option value="year_desc">Год ↓</option>
        <option value="year_asc">Год ↑</option>
      </select>
    </div>

    <button
      class="reset"
      @click="filters.search = ''; filters.genres = []; filters.countries = []; filters.sort = null; filters.rating = null"
    >
      Сбросить фильтры
    </button>

  </div>
</template>

<style scoped>
.filters {
  margin: 20px 0;
  padding: 15px;
  background: #1f1f1f;
  border-radius: 12px;
  color: white;
}

.search {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: none;
  margin-bottom: 15px;
  background: #2a2a2a;
  color: white;
}

.block {
  margin-bottom: 15px;
}

.label {
  display: block;
  margin-bottom: 5px;
  color: #aaa;
  font-size: 14px;
}

.select {
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  border: none;
  background: #2a2a2a;
  color: white;
}

.multi {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 6px 10px;
  border-radius: 20px;
  background: #2a2a2a;
  cursor: pointer;
  font-size: 13px;
  transition: 0.2s;
}

.tag:hover {
  background: #3a3a3a;
}

.tag.active {
  background: #ff3b3b;
  color: white;
}

.reset {
  margin-top: 10px;
  padding: 8px;
  width: 100%;
  border-radius: 8px;
  border: none;
  background: #444;
  color: white;
  cursor: pointer;
}

.reset:hover {
  background: #666;
}

.show-more {
  margin-top: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  background: #444;
  color: white;
  cursor: pointer;
}

.show-more:hover {
  background: #5a5a5a;
}
</style>