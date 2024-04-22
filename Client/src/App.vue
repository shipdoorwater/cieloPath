
<template>
  <nav>
    <router-link to="/">LoginPage</router-link>
    <Login_getToken></Login_getToken>
  </nav>
  <router-view/>
</template>

<script>
import Login_getToken from "@/components/Login_getToken.vue"



export default {
  name: 'App',
  components: {
    Login_getToken
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
