import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//   const routes: Array<RouteConfig> = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
// ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  // routes
})

export default router
