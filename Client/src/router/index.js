import { createRouter, createWebHistory } from 'vue-router'
import loginComponent from '@/components/test.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    components: () => import('@/components/FooterArea.vue')
  },

  {
    path: '/logincomponent',
    name: 'logincomponent',
    //component: () => import(/* webpackChunkName: "about" */ '@/components/test.vue')
    components: loginComponent
  }
]

const router = createRouter({
  //history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory(),
  routes
})

export default router;
