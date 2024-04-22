<template>
 <router-view :key="$route.fullPath"></router-view>
   <!-- <NavBar></NavBar> -->
   <!-- <LoginPage></LoginPage> -->
   <!-- <MainImageSlide></MainImageSlide>
    <TripSearch></TripSearch>
    <QandA></QandA>
    <FooterArea></FooterArea>
    <NoticeArea></NoticeArea>
    <MyPage></MyPage>
<SignUp></SignUp>

<router-link to="/login1">LoginPage</router-link> -->


</template>

<script>
// import NavBar from "@/components/NavBar.vue"
// import LoginPage from "./components/LoginPage.vue"
// import MainImageSlide from "@/components/MainImageSlide.vue"
// import TripSearch from "@/components/TripSearch.vue"
// import QandA from "@/components/QandA.vue"
// import FooterArea from "@/components/FooterArea.vue"
// import NoticeArea from "@/components/NoticeArea.vue"
// import SignUp from '@/components/SignUp.vue';
// import MyPage from "@/components/MyPage.vue";

export default {
  name: 'App',

}

// export default {
//   name: 'App',
//   components: {
//     NavBar,
//     // LoginPage,
//     SignUp,
//     MyPage,
//     MainImageSlide,
//     TripSearch,
//     QandA,
//     FooterArea,
//     NoticeArea
//   }
// }
//
</script>
<style>
@font-face {
    font-family: 'WavvePADO-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2404@1.0/WavvePADO-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

#app {
  font-family: WavvePADO-Regular;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
}
</style>
