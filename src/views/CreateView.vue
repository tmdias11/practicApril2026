<script setup>
import { useRouter } from 'vue-router'
import ItemForm from '../components/ItemForm.vue'
import { useItems } from '../composables/useItems'

const router = useRouter()
const { addItem } = useItems()

function handleSubmit(data) {
  addItem({
    ...data,
    id: Date.now(),
    done: false,
    deletedAt: null
  })

  router.push('/')
}
</script>

<template>
  <div>
    <h1>Create</h1>
    <ItemForm @submit="handleSubmit" />
  </div>
</template>