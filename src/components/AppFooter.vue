<script setup>
</script>

<template>
    <footer class="footer">
        <router-link to="/" class="homeLink">WatchCritics</router-link>
        <nav class="pages">
            <router-link to="/about">О сайте</router-link>
        </nav>
        
    </footer>
</template>

<style scoped>

.footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 100px;
    background-color: #00000088;
    backdrop-filter: blur(10px);
    color: white;
}

nav {
    display: flex;
    gap: 16px;
}

a{
    color: white;
    text-decoration: none;
    transition: 0.3s;
}

a:hover{
    color: rgb(255, 231, 97);
}

.homeLink{
    font-size: 25px;
    font-weight: bold;
    position: relative;
    left: 45%;
}

</style>