<script setup>
    import { computed, ref, onMounted, onUnmounted } from 'vue'
    import { useItems } from '../composables/useItems'

    const { items } = useItems()

    const sortedItems = computed(() => {
        if (!items.value || !Array.isArray(items.value)) return []

        return [...items.value]
            .filter(i => !i.deletedAt)
            .sort((a, b) => b.id - a.id)
    })

    const currentIndex = ref(0)
    let interval = null

    function nextSlide() {
        if (!sortedItems.value.length) return
        currentIndex.value =
            (currentIndex.value + 1) % sortedItems.value.length
    }

    function prevSlide() {
        if (!sortedItems.value.length) return
        currentIndex.value =
            (currentIndex.value - 1 + sortedItems.value.length) % sortedItems.value.length
    }

    function startAuto() {
        interval = setInterval(nextSlide, 3000)
    }

    function stopAuto() {
        clearInterval(interval)
    }

    onMounted(startAuto)
    onUnmounted(stopAuto)
</script>

<template>
    <div
        class="banner"
        v-if="sortedItems.length"
        @mouseenter="stopAuto"
        @mouseleave="startAuto"
    >

        <transition name="fade" mode="out-in">
        <img
            :key="sortedItems[currentIndex].id"
            :src="sortedItems[currentIndex].image || 'https://via.placeholder.com/1200x400'"
            alt="banner"
        />
        </transition>

        <div class="overlay">
        <h2>{{ sortedItems[currentIndex].title }}</h2>
        <p>{{ sortedItems[currentIndex].description }}</p>
        </div>

        <button class="arrow left" @click="prevSlide">
            <img src="../assets/1697dc6608a3d1366cfa58a6b07464da-next-arrow-3.png" alt="Стрелка">
        </button>
        <button class="arrow right" @click="nextSlide">
            <img src="../assets/1697dc6608a3d1366cfa58a6b07464da-next-arrow-3.png" alt="Стрелка">
        </button>
    </div>
</template>

<style scoped>
    .banner {
    width: 100%;
    height: 400px;
    position: relative;
    overflow: hidden;
    }

    .banner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    }

    .overlay {
    position: absolute;
    bottom: 20px;
    left: 20px;
    color: white;
    background: rgba(0,0,0,0.5);
    padding: 10px;
    border-radius: 8px;
    }

    .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 40px;
    border: none;
    cursor: pointer;
    height: 50px;
    width: 50px;
    border-radius: 100%;
    transition: 0.2s;
    background: rgba(53, 53, 53, 0.596);
    backdrop-filter: blur(5px);
    }

    .arrow img{
        filter: invert(1);
        height: 30px;
        width: 30px;
    }

    .arrow:first-of-type img{
        transform: rotate(180deg);
    }

    .arrow:hover {
    background: rgba(255, 60, 0, 0.596);
    }

    .left {
    left: 20px;
    }

    .right {
    right: 20px;
    }

    .fade-enter-active,
    .fade-leave-active {
    transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
    opacity: 0;
    }
</style>