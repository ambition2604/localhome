import Vue from 'vue'
import VueRouter from 'vue-router'
import MyCourse from '../views/MyCourse.vue'
import CourseInfo from '../views/CourseInfo.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Menu from '../views/Menu.vue'


Vue.use(VueRouter)
  
  const routes = [
  {
    path: '/',
    name: 'Course',
    component: MyCourse
  },
  {
    path: '/courseinfo',
    name: 'CourseInfo',
    component: CourseInfo
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && localStorage.getItem('token')=='None') next({ name: 'Login' })
  // if the user is not authenticated, `next` is called twice
  else next()
  })
  router.beforeEach((to, from, next) => {
    if (to.name == 'Login' && localStorage.getItem('token')!=='None') next({ name: 'Home' })
    // if the user is not authenticated, `next` is called twice
    else next()
    }) 
export default router