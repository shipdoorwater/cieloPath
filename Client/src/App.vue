<template>
<router-view name="default"></router-view>
<router-view name="header"></router-view>
<router-view name="main1"></router-view>
<router-view name="main2"></router-view>
<router-view name="footer"></router-view>
<Login_kakao></Login_kakao>
</template>

<script>
import Login_kakao from "@/components/Login_kakao.vue"




export default {
  name: 'App',
  components: {
    Login_kakao
  }
}
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
