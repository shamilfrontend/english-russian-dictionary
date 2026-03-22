import { createApp } from 'vue'

import AppComponent from './App.vue'
import router from './router'
import './style.scss'

const app = createApp(AppComponent)

app.use(router)
app.mount('#app')
