import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initDataIfEmpty } from './services/storage'

initDataIfEmpty()

const app = createApp(App)

app.use(router)

app.mount('#app')