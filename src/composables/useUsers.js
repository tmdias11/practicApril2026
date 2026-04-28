import { ref } from 'vue'
import { getUsers, saveUsers } from '../services/storage'

export function useUsers() {
  const users = ref(getUsers())

  function toggleBlock(user) {
    const u = users.value.find(x => x.id === user.id)
    if (!u) return

    u.blocked = !u.blocked
    saveUsers(users.value)
  }

  function changeRole(user) {
    const u = users.value.find(x => x.id === user.id)
    if (!u) return

    u.role = u.role === 'admin' ? 'user' : 'admin'
    saveUsers(users.value)
  }

  return {
    users,
    toggleBlock,
    changeRole
  }
}