<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, onMounted } from 'vue'
import { useItems } from '../composables/useItems'
import {
  getCurrentUser,
  getUsers,
  saveUsers,
  getRatings,
  saveRatings
} from '../services/storage'

const route = useRoute()
const router = useRouter()

const { items } = useItems()

const movie = computed(() =>
  items.value.find(i => String(i.id) === String(route.params.id))
)

const user = computed(() => getCurrentUser())
const users = ref(getUsers())

function isBlocked() {
  const u = users.value.find(x => x.id === user.value?.id)
  return u?.blocked
}

function isAdmin() {
  return user.value?.role === 'admin'
}

const allRatings = ref(getRatings())
const myRating = ref(null)

const movieRatings = computed(() =>
  allRatings.value.filter(r => r.movieId == route.params.id)
)

const avgRating = computed(() => {
  if (!movieRatings.value.length) return null

  const avg =
    movieRatings.value.reduce((s, r) => s + r.value, 0) /
    movieRatings.value.length

  return avg.toFixed(1)
})

onMounted(() => {
  if (!user.value) return

  const r = allRatings.value.find(
    x => x.movieId == route.params.id && x.userId === user.value.id
  )

  if (r) myRating.value = r.value
})

function rateMovie(value) {
  if (!user.value || isBlocked()) return

  allRatings.value = allRatings.value.filter(
    r => !(r.movieId == route.params.id && r.userId === user.value.id)
  )

  allRatings.value.push({
    movieId: route.params.id,
    userId: user.value.id,
    value
  })

  saveRatings(allRatings.value)
  myRating.value = value
}

const COMMENTS_KEY = 'pm2_comments'

function getComments() {
  try {
    return JSON.parse(localStorage.getItem(COMMENTS_KEY)) || []
  } catch {
    return []
  }
}

function saveComments(data) {
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(data))
}

const allComments = ref(getComments())
const newComment = ref('')

const movieComments = computed(() =>
  allComments.value.filter(c => c.movieId == route.params.id)
)

function addComment() {
  if (!user.value || isBlocked() || !newComment.value.trim()) return

  const comment = {
    id: Date.now(),
    movieId: route.params.id,
    userId: user.value.id,
    text: newComment.value,
    username: user.value.username,
    avatar: user.value.avatar || 'https://via.placeholder.com/50'
  }

  allComments.value.push(comment)
  saveComments(allComments.value)

  newComment.value = ''
}

function deleteComment(comment) {
  if (!user.value) return

  const isOwner = comment.userId === user.value.id

  if (!isOwner && !isAdmin()) return

  if (!confirm('Удалить комментарий?')) return

  allComments.value = allComments.value.filter(c => c.id !== comment.id)
  saveComments(allComments.value)
}

function toggleBlock(comment) {
  if (!isAdmin()) return

  const u = users.value.find(x => x.id === comment.userId)
  if (!u) return

  u.blocked = !u.blocked
  saveUsers(users.value)
}

const recommended = computed(() => {
  if (!movie.value || !items.value.length) return []

  const currentGenres = movie.value.genre || []
  
  const genreMatches = items.value
    .filter(i => {
      if (i.id === movie.value.id) return false
      if (i.deletedAt) return false
      
      const itemGenres = i.genre || []
      return itemGenres.some(g => currentGenres.includes(g))
    })
    .slice(0, 5)

  if (genreMatches.length) return genreMatches

  return items.value
    .filter(i => i.id !== movie.value.id && !i.deletedAt)
    .slice(0, 5)
})

function goToMovie(id) {
  router.push(`/movie/${id}`)
}
</script>

<template>
  <div v-if="movie" class="movieBodyContainer">

    <h1>
      {{ movie.title }} ({{ movie.year }})
      <span class="rating">⭐ {{ avgRating || '—' }}</span>
    </h1>

    <div v-if="user && !isBlocked()" class="rating-panel">
      <span>Оценить:</span>

      <button
        v-for="n in 10"
        :key="n"
        @click="rateMovie(n)"
        :class="{ active: myRating === n }"
      >
        {{ n }}
      </button>
    </div>

    <div v-else class="blocked">
      <p>Войдите и не будьте заблокированы, чтобы оценивать</p>
    </div>

    <div class="movieBody">
      <img :src="movie.image">

      <div class="movieBody-info info1">
        <p>{{ movie.description }}</p>
        <iframe :src="movie.trailer"></iframe>
      </div>

      <div class="info2">
        <p><b>Жанры:</b> {{ movie.genre.join(', ') }}</p>
        <p><b>Страны:</b> {{ movie.countries.join(', ') }}</p>
      </div>
    </div>

    <div class="comments">
      <h2>Комментарии</h2>

      <div v-if="user && !isBlocked()" class="comment-form">
        <textarea v-model="newComment"></textarea>
        <button class="redButton" @click="addComment">Отправить</button>
      </div>

      <div v-else-if="user && isBlocked()" class="blocked">
        <p>Вы заблокированы и не можете писать комментарии</p>
      </div>

      <div v-else>
        <p>Войдите, чтобы писать комментарии</p>
      </div>

      <div class="comment-list">
        <div v-for="c in movieComments" :key="c.id" class="comment">

          <img :src="c.avatar" class="avatar">

          <div class="comment-body">
            <p class="nickname"><b>{{ c.username }}</b></p>
            <p>{{ c.text }}</p>

            <div class="comment-actions">

              <button
                v-if="user && (c.userId === user.id || isAdmin())"
                class="redButton dangerButton"
                @click="deleteComment(c)"
              >
                Удалить
              </button>

              <button
                v-if="isAdmin()"
                class="redButton lightButton"
                @click="toggleBlock(c)"
              >
                {{ users.find(u => u.id === c.userId)?.blocked ? 'Разблокировать' : 'Заблокировать' }}
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>

    <div v-if="recommended.length" class="recommended">
      <h2>Рекомендуемые</h2>

      <div class="recommended-list">
        <div
          v-for="item in recommended"
          :key="item.id"
          class="recommended-card"
          @click="goToMovie(item.id)"
        >
          <img :src="item.image">
          <p>{{ item.title }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
h1, p{
  margin: 0;
}

h1{
  font-size: 40px;
  margin-top: 40px;
  margin-bottom: 15px;
  font-weight: bold;
}

h2{
    font-size: 25px;
  margin-top: 40px;
  margin-bottom: 15px;
  font-weight: bold;
}

img{
  width: 300px;
  border-radius: 15px;
  height: 450px;
}

iframe{
  border-radius: 15px;
  width: 100%;
  height: 415px;
}

.movieBody{
  display: flex;
  gap: 15px;
  background-color: rgb(37, 37, 37);
  padding: 30px;
  border-radius: 15px;
  flex-wrap: wrap;
  margin-bottom: 30px;
}

.movieBodyContainer{
  width: 70%;
  display: flex;
  flex-direction: column;
  margin: 0px auto;
  align-items: center;
  background-color: rgb(26, 26, 26);
  min-height: 100vh;
  padding: 15px;
}

.movieBody-info{
  display: flex;
  flex-direction: column;
  gap: 0;
  color: rgb(179, 179, 179);
}

.info1{
  color: white;
  display: flex;
  align-items: flex-start;
  text-align: center;
  gap: 20px;
}

.info2{
  display: flex;
  flex-direction: column;
  color: rgb(179, 179, 179);
  align-items: flex-start;
  justify-content: left;
  font-size: 20px;
}

.rating {
  color: gold;
  margin-left: 10px;
}

.rating-panel {
  margin-bottom: 15px;
}

.rating-panel button {
  margin: 3px;
  padding: 5px 8px;
  border-radius: 6px;
  border: none;
  background: #2a2a2a;
  color: white;
  cursor: pointer;
}

.rating-panel button.active {
  background: gold;
  color: black;
}

.blocked {
  color: red;
}

.recommended {
  margin-top: 30px;
  width: 100%;
}

.recommended-list {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.recommended-card {
  width: 150px;
  cursor: pointer;
  transition: 0.2s;
}

.recommended-card:hover {
  transform: scale(1.05);
}

.recommended-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}

.recommended-card p {
  font-size: 14px;
  margin-top: 5px;
}

.adminPanel{
    background-color: rgb(46, 46, 46);
    padding: 0px 30px;
    border-radius: 15px;
    margin: 30px;
}

.comments {
  width: 100%;
  background: #1f1f1f;
  padding: 20px;
  border-radius: 12px;
  margin-top: 20px;
}

.comment {
  display: flex;
  gap: 10px;
  background: #2a2a2a;
  padding: 10px;
  border-radius: 8px;
  margin-top: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.nickname{
  font-size: 20px;
  margin: 15px 0px;
}

.comment-actions {
  margin-top: 5px;
  display: flex;
  gap: 10px;
}

textarea {
  width: 100%;
  margin-bottom: 10px;
}

.blocked {
  color: red;
}

.lightButton {
  background: white;
  color: black;
}

.dangerButton {
  background: #c0392b;
  color: white;
}
</style>