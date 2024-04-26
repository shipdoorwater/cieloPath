<template>
  <router-view name="default" class="fixed-top"></router-view>
  <div style="margin-top: 300px"></div>
  <router-view name="header"></router-view>
  <div style="margin-top: 300px"></div>
  <router-view name="main2"></router-view>
  <router-view name="main1"></router-view>
  
  <div style="margin-top: 120px">
    <div style="font-size: 45px; margin-bottom: 80px">PARTNERS</div>
    <div
      style="
        display: flex;
        justify-content: space-between;
        padding-left: 230px;
        padding-right: 270px;
        padding-bottom: 100px;
      "
    >
      <img src="@/assets/resized_partners_kb.jpg" alt="" />
      <img src="@/assets/resized_partners_bit.png" alt="" />
      <img src="@/assets/resized_partners_kto.png" alt="" />
      <img src="@/assets/resized_partners_korail.jpg" alt="" />
      <img src="@/assets/resized_partners_ksf.png" alt="" />
    </div>
    <div
      style="
        display: flex;
        justify-content: space-between;
        padding-left: 230px;
        padding-right: 270px;
        padding-bottom: 200px;
      "
    >
      <img src="@/assets/resized_partners_scg.png" alt="" />
      <img src="@/assets/resized_partners_skyscanner.png" alt="" />
      <img src="@/assets/resized_partners_tripcom.png" alt="" />
      <img src="@/assets/resized_partners_naver.png" alt="" />
      <img src="@/assets/resized_partners_hotels.png" alt="" />
    </div>
  </div>

  <router-view name="footer"></router-view>
</template>

<script>
export default {
  name: "App",

  // methods: {
  //   handleTravelInfo(travelInfo) {
  //     // 여기서 travelInfo를 TravelPlanner 컴포넌트로 전달할 로직 구현
  //     console.log(travelInfo); // 또는 여기에서 로그를 확인
  //   }
  // },

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
