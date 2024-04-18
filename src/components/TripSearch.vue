<template><br><br><br><br><br><br>
  <h1>어디로 떠나볼까요?</h1><br><br><br><br>
  <nav class="navbar navbar-light bg-white">
  <div class="container-fluid justify-content-center">
    <form class="d-flex justify-content-center">
      <input class="form-control form-control-lg me-2" type="search" placeholder="가고 싶은 지역을 찾아보세요" aria-label="Search">
      <button class="btn btn-outline-success btn-lg" type="submit">Search</button>
    </form>
  </div>
</nav>
  <br><br><br><br><br>
  <div class="row">
    <div class="col-md-4">
      <img :src="seoul" class="img-fluid rounded zoom fixed-size" alt="Seoul"><br>
      <span class="text">서 울<br>SEOUL</span>
    </div>
    <div class="col-md-4">
      <img :src="busan" class="img-fluid rounded zoom fixed-size" alt="Busan"><br>
      <span class="text">부 산<br>BUSAN</span>
    </div>
    <div class="col-md-4">
      <img :src="jeju" class="img-fluid rounded zoom fixed-size" alt="Jeju"><br>
      <span class="text">제 주<br>JEJU</span> <br><br><br><br>
    </div>
    <div class="col-md-4">
      <img :src="gangwon" class="img-fluid rounded zoom fixed-size" alt="Gangwon"><br>
      <span class="text">강 원<br>GAMGWON</span>
    </div>
    <div class="col-md-4">
      <img :src="daegu" class="img-fluid rounded zoom fixed-size" alt="Daegu"><br>
      <span class="text">대 구<br>DAEGU</span>
    </div>
    <div class="col-md-4">
      <img :src="gyeongju" class="img-fluid rounded zoom fixed-size" alt="Gyeongju"><br>
      <span class="text">경 주<br>GYEONGJU</span>
    </div>
  </div>

</template>


<script>
export default {
  name: 'TripSearch',
  data(){
    return{
      busan: require('@/assets/main_busan.png'),
      jeju: require('@/assets/main_jeju.png'), // 경로가 잘못 지정되어 있었으므로 수정합니다.
      seoul: require('@/assets/main_seoul.jpeg'),
      gangwon: require('@/assets/main_gangwon.jpg'),
      daegu: require('@/assets/main_daegu.jpg'),
      gyeongju: require('@/assets/main_gyeongju.png'),
    }
  }
}
</script>

<style>
 .navbar {
    display: flex;
    justify-content: center; /* Flexbox를 사용한 가운데 정렬 */
    width: 100%; /* 필요에 따라 조정 */
  }
.form-control::placeholder {
    font-size: 16px;
}
.text {
    font-size: 20px;
}
.form-control {
  width: 300px;
}
.center-block {
  margin: 0 auto;
  width: 50%;
}

/* 이미지 호버 효과 */
.zoom {
  transition: transform .2s; /* 애니메이션 속도 */
  width: 80%; /* 부모 요소에 꽉 차게 */
  height: auto; /* 이미지 원본 비율 유지 */
}

.zoom:hover {
  transform: scale(1.1); /* 10% 확대 */
}
.fixed-size {
  width: 400px !important;
  height: 500px !important;
  object-fit: cover !important;/* 이미지 비율을 유지하면서 요소 크기에 맞게 조정 */
}


</style>
