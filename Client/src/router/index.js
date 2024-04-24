import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/components/LoginPage.vue'
import SignUp from '@/components/SignUp.vue'
import MyPage from '@/components/MyPage.vue'
import AdminPage from '@/components/AdminPage.vue'
import AdminNotice from '@/components/AdminNotice.vue'
import AdminMember from '@/components/AdminMember.vue'
import AdminRoute from '@/components/AdminRoute.vue'
// import Login_getToken from '@/components/Login_getToken.vue'
import kakaoCallback from '@/components/kakao-callback.vue'

const routes = [

  {
    path: '/',
    name: 'main',
    components: {
      default: () => import('@/components/NavBar.vue'),
      header: () => import('@/components/MainImageSlide.vue'),
      main1: () => import('@/components/TripSearch.vue'),
      main2: () => import('@/components/NoticeArea.vue'),
      footer: () => import('@/components/FooterArea.vue'),
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/route',
    name: 'AdminRoute',
    component: AdminRoute
  },
  {
    path: '/notice',
    name: 'AdminNotice',
    component: AdminNotice
  },
  {
    path: '/member',
    name: 'AdminMember',
    component: AdminMember
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: MyPage
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminPage
  },
  {
      path: '/kakao-callback',
      name: 'kakao-callback',
      component: kakaoCallback
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
