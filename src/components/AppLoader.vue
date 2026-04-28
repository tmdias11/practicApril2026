<script setup>
    import { useLoader } from '../composables/useLoader'

    const { isLoading } = useLoader()
</script>

<template>
    <div v-if="isLoading" class="loader">
        Loading...
    </div>
</template>

<style scoped>
    .loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        background: rgba(0, 0, 0, 0.5);
        color: white;

        display: flex;
        align-items: center;
        justify-content: center;

        z-index: 9999;
        
        pointer-events: all;
    }
</style>