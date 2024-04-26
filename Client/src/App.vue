<template>
  <router-view name="default" class="fixed-top"></router-view>
  <div style="margin-top: 100px; background-color: rgba(238, 222, 222, 0.2);"></div>
  <router-view name="header"></router-view>
  <!-- <div style="margin-top: 300px"></div> -->
  <router-view name="main2"></router-view>
  <router-view name="main1"></router-view>
  
  <router-view name="Partners"></router-view>
  <router-view name="footer"></router-view>
</template>

<script>
export default {
  name: "App",


  components: {},
};
//
</script>

<style>
@font-face {
  font-family: "WavvePADO-Regular";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/2404@1.0/WavvePADO-Regular.woff2")
    format("woff2");
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

.fixed-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
</style>
