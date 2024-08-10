import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// Views
import HomeView from './views/HomeView.vue'
import LoginView from './views/LoginView.vue'

// Plugins
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createWebHistory, createRouter } from 'vue-router'

const routes = [{
  path: '/',
  name: 'Home',
  component: HomeView
},
{
  path: '/login',
  name: 'Login',
  component: LoginView
}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(VueQueryPlugin)
app.use(router)
app.mount('#app')