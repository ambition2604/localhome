import Vue from 'vue'
import VueRouter from 'vue-router'
import MyCourse from '../views/MyCourse.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Menu from '../views/Menu.vue'
import Bag from '../views/Bag.vue'
import MyCourseDetail from '../views/MyCourseDetail.vue'
Vue.use(VueRouter)
  
  const routes = [
  {
    path: '/course',
    name: 'Course',
    component: MyCourse
  },
  {
    path: '/course_detail',
    name: 'CourseDetail',
    component: MyCourseDetail
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/bag',
    name: 'Bag',
    component: Bag
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
    router.beforeEach((to, from, next) => {
      if (from.name == 'Menu' ) {
        localStorage.removeItem('m_id');
        next();
      }
      // if the user is not authenticated, `next` is called twice
      else next()
      })  
export default router