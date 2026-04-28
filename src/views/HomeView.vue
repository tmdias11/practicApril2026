<script setup>
import { ref, computed } from 'vue'
import { useItems } from '../composables/useItems'
import ItemList from '../components/ItemList.vue'
import ItemFilters from '../components/ItemFilters.vue'
import BannerSlider from '../components/BannerSlider.vue'

const {
  items,
  toggleDone,
  softDelete
} = useItems()

const filter = ref('all')

const filteredItems = computed(() => {
  return items.value.filter(i => {
    if (i.deletedAt) return false

    if (filter.value === 'active') return !i.done
    if (filter.value === 'done') return i.done

    return true
  })
})
</script>

<template>
  <div>
    <BannerSlider />
    <div class="homeBody">
      <ItemList
        :items="filteredItems"
        @toggle="toggleDone"
        @delete="softDelete"
      />
    </div>
  </div>
</template>

<style scoped>
  .homeBody{
    padding: 40px;
  }
</style>