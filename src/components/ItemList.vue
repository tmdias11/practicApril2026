<script setup>
import { ref, onMounted, nextTick } from 'vue'
import ItemCard from './ItemCard.vue'

defineProps({
  items: Array
})

const emit = defineEmits(['toggle', 'delete'])

const expanded = ref(false)
const listRef = ref(null)
const needsToggle = ref(false)

function checkOverflow() {
  if (!listRef.value) return
  needsToggle.value = listRef.value.scrollHeight > listRef.value.clientHeight
}

onMounted(async () => {
  await nextTick()
  checkOverflow()
})
</script>

<template>
  <div>
    <div
      ref="listRef"
      class="list"
      :class="{ collapsed: !expanded }"
    >
      <ItemCard
        v-for="item in items"
        :key="item.id"
        :item="item"
        @toggle="emit('toggle', $event)"
        @delete="emit('delete', $event)"
      />
    </div>

    <button
      v-if="needsToggle"
      @click="expanded = !expanded"
      class="redButton"
    >
      {{ expanded ? 'Скрыть' : 'Показать больше' }}
    </button>

  </div>
</template>

<style scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-height: none;
  overflow: hidden;
  padding: 10px;
}

.collapsed {
  max-height: 450px;
  overflow: hidden;
}

.redButton{
  margin: 0 auto;
  margin-top: 20px;
}
</style>