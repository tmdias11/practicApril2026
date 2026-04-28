import { ref } from 'vue'

const ITEMS_KEY = 'pm2_items'
const SETTINGS_KEY = 'pm2_settings'
const USERS_KEY = 'pm2_users'
const CURRENT_USER_KEY = 'pm2_current_user'
const RATINGS_KEY = 'pm2_ratings'

export const currentUser = ref(getCurrentUser())
export const ratings = ref(getRatings())

export function getItems() {
  try {
    const raw = localStorage.getItem(ITEMS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveItems(items) {
  localStorage.setItem(ITEMS_KEY, JSON.stringify(items))
}

export function getSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}

export function initDataIfEmpty() {
  const existing = localStorage.getItem(ITEMS_KEY)

  if (!existing) {
    const demo = [
      {
        id: Date.now(),
        title: 'Матрица',
        description: 'Хакер Нео узнает, что его мир — виртуальный.',
        genre: ['fantasy', 'action'],
        year: '1999',
        countries: ['США', 'Австралия'],
        image: 'https://www.schuleltern.berlin/assets/img-temp/300x500/img1.png',
        trailer: 'https://www.youtube.com/embed/YihPA42fdQ8',
        done: false,
        deletedAt: null
      }
    ]

    saveItems(demo)
  }
}

export function getUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function setCurrentUser(user) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  currentUser.value = user
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY)
  currentUser.value = null
}

export function getRatings() {
  try {
    return JSON.parse(localStorage.getItem(RATINGS_KEY)) || []
  } catch {
    return []
  }
}

export function saveRatings(data) {
  ratings.value = data
  localStorage.setItem(RATINGS_KEY, JSON.stringify(data))
}