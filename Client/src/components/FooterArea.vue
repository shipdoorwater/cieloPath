<template>
  
  <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between; background-color: #F7F8F9; padding-top: 30px; padding-left: 250px; padding-bottom: 40px; padding-right: 250px">
    <div style="display:flex; flex-direction: column;">
      <div style="align-items: flex-start; text-align: left">
        <img src="@/assets/logo.png" alt="logo" height="80px" style="margin-bottom: 30px;"> 
      </div>
      <div class="footerText1">프로젝트 8조 | 배문수 이슬기 한일섭</div>
      <div class="footerText1">사업자 등록번호 123-45-67890</div>
      <div class="footerText1">서울시 서초구 서초대로74길 33. 3F</div>
      <div class="footerText1">contact@cielopath.co.kr</div>
      <br>
      <div class="footerText2">이용약관 | 개인정보처리방침 | 고객지원 | 1:1 문의</div>
    </div>
    
    <div>
      <img src="@/assets/footerImage.png" alt="footer">
    </div>
  </div>
 

</template>

<script>
export default {
  name: 'FooterArea',
}
</script>

<style>

.footerText1 {
  font-size: 14px;
  text-align: left;
  margin-bottom: 5px;
  color: gray;
}

.footerText2 {
  font-size: 14px;
  text-align: left;
  
}
</style>

