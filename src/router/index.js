import Vue from 'vue'
// import Home from '../views/glodeMap/index.vue'
// import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home.vue')
  }
]

const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
  routes
})

export default router
