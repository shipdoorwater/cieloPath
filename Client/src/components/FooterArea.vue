<template>
  
  <div style="background-color: beige;"><br><br><br><br>
    <img src="@/assets/logo.png" alt="logo" height="150px" style="float: left; margin-right: 40px;"> 
    <br><br><br><br><br><br><br><br><br>
    <h3>만든 이</h3><br>
    <div>
      <div class="profile">
        <i class="bi bi-person-circle"></i>
        <span class="text">한일섭</span>
        소개글<br> 소개글<br> 소개글<br>
      </div>
      <div class="profile">
        <i class="bi bi-person-circle"></i>
        <span class="text">배문수</span>
        소개글<br> 소개글<br> 소개글<br>
      </div>
      <div class="profile">
        <i class="bi bi-person-circle"></i>
        <span class="text">이슬기</span>
        소개글<br> 소개글<br> 소개글<br>
      </div>
    </div>
 
  </div>
  <span  text-align="left">copyright@</span>
</template>

<script>
export default {
  name: 'FooterArea',
}
</script>

<style>

.profile {
  display: inline-block; /* 요소를 옆으로 배열 */
  text-align: center; /* 텍스트와 아이콘 중앙 정렬 */
  margin: 0 100px; /* 좌우 마진 추가 */
}

.bi-person-circle {
  font-size: 120px; /* 아이콘 크기 조정 */
}

.text {
  font-size: 30px; /* 텍스트 크기 조정 */
  display: block; /* 블록 레벨 요소로 만들어 아래로 배치 */
}

/* 스타일을 NavBar와 일치시키기 위한 추가 */
.container-fluid {
  padding-right: 0;
  padding-left: 0;
  margin-right: auto;
  margin-left: auto;
  
}
</style>

