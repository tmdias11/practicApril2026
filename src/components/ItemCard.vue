<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ratings } from '../services/storage'

const props = defineProps({
  item: Object
})

const router = useRouter()

function goToMovie() {
  router.push(`/movie/${props.item.id}`)
}

const rating = computed(() => {
  if (props.item.rating != null && props.item.rating !== '') {
    return Number(props.item.rating).toFixed(1)
  }

  const list = ratings.value.filter(r => r.movieId == props.item.id)

  if (!list.length) return null

  const avg = list.reduce((s, r) => s + r.value, 0) / list.length
  return avg.toFixed(1)
})
</script>

<template>
  <div class="card" :class="{ done: item.done }" @click="goToMovie">
    <h3>{{ item.title }}</h3>
    <img :src="item.image">
    <small>{{ item.year }}, {{ item.genre.join(', ') }}</small>
    <div class="rating">⭐ {{ rating || '—' }}</div>
  </div>
</template>

<style scoped>
.card {
  padding: 12px;
  margin-bottom: 10px;
  width: 250px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 10px;
  background-color: rgb(36, 36, 36);
  cursor: pointer;
  transition: 0.2s;
  max-height: 400px;
}

.card:hover {
  transform: scale(1.02);
}

.rating {
  color: gold;
  font-weight: bold;
}

.done {
  opacity: 0.5;
  text-decoration: line-through;
}

img {
  width: 100%;
  height: 100%;
}

h3 {
  margin: 0;
}

small {
  color: rgb(175, 175, 175);
}
</style>