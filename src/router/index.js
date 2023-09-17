import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ImageView from '../views/ImageView.vue'
import DockerView from '../views/DockerView.vue'
import CreateView from '../components/CreateImage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/image',
    name: 'image',
    component: ImageView
  },
  {
    path: '/docker',
    name: 'docker',
    component: DockerView
  },
  {
    path: '/create_image',
    name: 'create_image',
    component: CreateView
  },
]

const router = new VueRouter({
  routes
})

export default router
