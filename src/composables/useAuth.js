import { ref } from 'vue'
import {
  getUsers,
  saveUsers,
  getCurrentUser,
  setCurrentUser,
  logoutUser
} from '../services/storage'

const currentUser = ref(getCurrentUser())

export function useAuth() {

  function register(username, password) {
    const users = getUsers()

    const exists = users.find(u => u.username === username)
    if (exists) return alert('Пользователь уже существует')

    const role = users.length === 0 ? 'admin' : 'user'

    const newUser = {
      id: Date.now(),
      username,
      password,
      role,
      blocked: false,
    }

    users.push(newUser)
    saveUsers(users)

    setCurrentUser(newUser)
    currentUser.value = newUser
  }

  function login(username, password) {
    const users = getUsers()

    const user = users.find(
      u => u.username === username && u.password === password
    )

    if (!user) return alert('Неверные данные')

    if (user.blocked) {
      return alert('Пользователь заблокирован')
    }

    setCurrentUser(user)
    currentUser.value = user
  }

  function logout() {
    logoutUser()
    currentUser.value = null
  }

  return {
    currentUser,
    register,
    login,
    logout
  }
}