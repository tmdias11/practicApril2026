<script setup>
import { useItems } from '@/composables/useItems'

const { items, restoreItem, deleteForever } = useItems()

const deletedItems = computed(() =>
  items.value.filter(i => i.deletedAt)
)
</script>

<template>
  <div>
    <h1>Archive</h1>

    <div v-for="item in deletedItems" :key="item.id">
      <p>{{ item.title }}</p>

      <button @click="restoreItem(item.id)">Restore</button>
      <button @click="deleteForever(item.id)">Delete</button>
    </div>

  </div>
</template>