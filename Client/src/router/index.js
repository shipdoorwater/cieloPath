import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/components/LoginPage.vue";
import SignUp from "@/components/SignUp.vue";
import MyPage from "@/components/MyPage.vue";
import AdminPage from "@/components/AdminPage.vue";
import Qanda from "@/components/QandA.vue";
import AdminNotice from "@/components/AdminNotice.vue";
import AdminMember from "@/components/AdminMember.vue";
import AdminRoute from "@/components/AdminRoute.vue";
// import Login_getToken from '@/components/Login_getToken.vue'
import kakaoCallback from "@/components/kakao-callback.vue";
import QandaModal from "@/components/QandAModal.vue";

import TripSearch from "@/components/TripSearch.vue";
import TravelPlanner from "@/components/TravelPlanner.vue";
import SelfPlan from "@/components/SelfPlan.vue";

import QandADetailPage from "@/components/QandADetailPage.vue";


const routes = [
  {
    path: "/",
    name: "main",
    components: {
      default: () => import("@/components/NavBar.vue"),
      header: () => import("@/components/MainImageSlide.vue"),
      main1: () => import("@/components/TripSearch.vue"),
      main2: () => import("@/components/NoticeArea.vue"),
      Partners: () => import('@/components/Partners.vue'),
      footer: () => import("@/components/FooterArea.vue")
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/QandADetailPage/:postId",
    name: "QandADetailPage",
    component: QandADetailPage,
  },

  {
    path: "/loginPage",
    name: "loginPage",
    component: LoginPage,
  },
  {
    path: "/qanda",
    name: "qanda",
    component: Qanda,
  },
  {
    path: "/qandaModal",
    name: "qandaModal",
    component: QandaModal,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/route",
    name: "AdminRoute",
    component: AdminRoute,
  },
  {
    path: "/notice",
    name: "AdminNotice",
    component: AdminNotice,
  },
  {
    path: "/member",
    name: "AdminMember",
    component: AdminMember,
  },
  {
    path: "/mypage",
    name: "mypage",
    component: MyPage,
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminPage,
  },
  

   
  {
    path: "/kakao-callback",
    name: "kakao-callback",
    component: kakaoCallback,
  },


  {
    path: "/TripSearch",
    name: "TripSearch",
    component: TripSearch,
    props: true,
  },
  {
    path: "/TravelPlanner",
    name: "TravelPlanner",
    component: TravelPlanner,
    // props: true
  },

  {
    path: "/SelfPlan",
    name: "SelfPlan",
    component: SelfPlan,
    // props: true
  },

  {
    path: "/SelfPlan2",
    name: "SelfPlan2",
    component: () => import("@/components/SelfPlan2.vue"),
    props: true,
  },
   {
      path: '/SelfPlan3',
      name: 'SelfPlan3',
      component: () => import('@/components/SelfPlan3.vue'),
      props: true
    },  
    
  {
    path: "/NavBar",
    name: "NavBar",
    component: () => import('@/components/NavBar.vue')
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
