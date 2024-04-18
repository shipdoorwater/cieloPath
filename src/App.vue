<template>
  <NavBar></NavBar>
 
  
</template>

<script>
import NavBar from "@/components/NavBar.vue"

export default {
  name: 'App',
  components: {
    NavBar
  }
}
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
