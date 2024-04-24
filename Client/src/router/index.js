import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/components/LoginPage.vue'
import SignUp from '@/components/SignUp.vue'
import MyPage from '@/components/MyPage.vue'
import AdminPage from '@/components/AdminPage.vue'
import Qanda from '@/components/QandA.vue'
import kakaoCallback from '@/components/kakao-callback.vue'
import QandaModal from '@/components/QandAModal.vue'

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
    path: '/loginPage',
    name: 'loginPage',
    component: LoginPage
  },
  {
    path: '/qanda',
    name: 'qanda',
    component: Qanda
  },
  {
    path: '/qandaModal',
    name: 'qandaModal',
    component: QandaModal
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
