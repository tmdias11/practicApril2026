import { ref, computed } from 'vue'
import { getItems, saveItems, initDataIfEmpty } from '../services/storage'

const items = ref([])

initDataIfEmpty()
items.value = getItems()

function persist() {
  saveItems(items.value)
}

function addItem(item) {
  items.value.push({
    ...item,
    id: crypto.randomUUID(),
    done: false,
    deletedAt: null
  })

  persist()
}

function updateItem(id, newData) {
  const index = items.value.findIndex(i => i.id === id)

  if (index !== -1) {
    items.value[index] = {
      ...items.value[index],
      ...newData
    }

    saveItems(items.value)
  }
}

function toggleDone(id) {
  const item = items.value.find(i => i.id === id)

  if (item) {
    item.done = !item.done
    persist()
  }
}

function softDelete(id) {
  const item = items.value.find(i => i.id === id)

  if (item) {
    item.deletedAt = Date.now()
    persist()
  }
}

function restoreItem(id) {
  const item = items.value.find(i => i.id === id)

  if (item) {
    item.deletedAt = null
    persist()
  }
}

function deleteForever(id) {
  items.value = items.value.filter(i => i.id !== id)
  persist()
}

const totalCount = computed(() => items.value.length)

const activeCount = computed(() =>
  items.value.filter(i => !i.done && !i.deletedAt).length
)

const doneCount = computed(() =>
  items.value.filter(i => i.done && !i.deletedAt).length
)

const deletedCount = computed(() =>
  items.value.filter(i => i.deletedAt).length
)

export function useItems() {
  return {
    items,
    addItem,
    updateItem,
    toggleDone,
    softDelete,
    restoreItem,
    deleteForever,
    totalCount,
    activeCount,
    doneCount,
    deletedCount
  }
}