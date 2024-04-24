<template>
<router-view name="default"></router-view>
<router-view name="header"></router-view>
<router-view name="main1"></router-view>
<router-view name="main2"></router-view>
<router-view name="footer"></router-view>
<router-view @sendTravelInfo="handleTravelInfo"></router-view>

</template>

<script>





export default {



  
  name: 'App',

  // methods: {
  //   handleTravelInfo(travelInfo) {
  //     // 여기서 travelInfo를 TravelPlanner 컴포넌트로 전달할 로직 구현
  //     console.log(travelInfo); // 또는 여기에서 로그를 확인
  //   }
  // },

  components: {
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
