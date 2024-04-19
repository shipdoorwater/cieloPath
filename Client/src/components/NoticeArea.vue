<template>
  <div class="container bg-sky-blue">
    <h1>Notice</h1>
    <br /><br /><br /><br />
    <div class="row py-8 py-md-10 py-lg-11">
      <div class="col-lg-6">
        <div class="row justify-content-center justify-content-lg-start">
          <div class="col-lg-10">
            <div class="d-flex gap-2 gap-lg-x1 mb-4 mb-lg-5 vertical-center">
              <div> 
              </div>
              <div>
                <h5 class="fs-8-bold lh-lg mb-1 text-gray">
                  <i class="bi bi-calendar-heart"></i>&nbsp;&nbsp;CIELO PATH는 다양한 여행 일정을 제공해요.
                </h5>
                <p class="lh-xl text-white-opacity mb-0">
                  We offers a variety of travel schedules.
                </p>
              </div>
            </div>
                <h5 class="fs-8-bold lh-lg mb-1 text-gray">
                  <i class="bi bi-calendar-heart"></i>&nbsp;&nbsp;CIELO PATH는 지속적으로 업데이트하고 있어요.
                </h5>
                <p class="lh-xl text-white-opacity mb-0">
                  We are continuously being updated.
                </p>
              </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="accordion mt-lg-4 bg-white" id="accordion" style="padding-left: 0; padding-right: 0">
          <div class="accordion-item">
            <h2 class="accordion-header" id="heading1">
              <button class="accordion-button accordion-button-custom" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="true" aria-controls="collapse1">
                CIELO PATH 운영시간
              </button>
            </h2>
            <div class="accordion-collapse collapse show" id="collapse1" data-bs-parent="#accordion">
              <div class="accordion-body accordion-body-custom" style="text-align: left;">
                CIELO PATH에서 여행 일정생성은 24시간 가능해요!<br>
                다만, 상담은 9 to 6로 가능하오니 이용에 참고부탁드려요.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="heading2">
              <button class="accordion-button accordion-button-custom collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                CIELO PATH 사용방법
              </button>
            </h2>
            <div class="accordion-collapse collapse" id="collapse2" data-bs-parent="#accordion">
              <div class="accordion-body accordion-body-custom" style="text-align: left;">
                가고싶은 지역을 검색 후<br>
                일정을 만들어주세요!<br>
                타닥! 클릭! 완료!<br>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="heading3">
              <button class="accordion-button accordion-button-custom collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
                CIELO PATH 공지사항 3
              </button>
            </h2>
            <div class="accordion-collapse collapse" id="collapse3" data-bs-parent="#accordion">
              <div class="accordion-body accordion-body-custom" style="text-align: left;">
                공지사항 3 내용입니다.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="heading4">
              <button class="accordion-button accordion-button-custom collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                CIELO PATH 공지사항 4
              </button>
            </h2>
            <div class="accordion-collapse collapse" id="collapse4" data-bs-parent="#accordion">
              <div class="accordion-body accordion-body-custom" style="text-align: left;">
                공지사항 4 내용입니다.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="heading5">
              <button class="accordion-button accordion-button-custom collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                CIELO PATH 공지사항 5
              </button>
            </h2>
            <div class="accordion-collapse collapse" id="collapse5" data-bs-parent="#accordion">
              <div class="accordion-body accordion-body-custom" style="text-align: left;">
                공지사항 5 내용입니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoticeArea",
  data() {
    return {};
  },
};
</script>

<style>
/* 공통 배경색 */
.bg-sky-blue {
  background-color: rgb(204, 222, 255) !important;
}

/* 텍스트 화이트 & opacity */
.text-white-opacity {
  color: rgb(53, 53, 53);
  opacity: 0.65;
}

/* 공통 폰트 스타일 */
.fs-8-bold {
  font-size: 15pt;
  font-weight: bold;
}

/* 세로 정렬 아이콘과 텍스트를 중앙 정렬 */
.vertical-center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}


/* 아코디언 버튼 스타일 */
.accordion-button-custom {
  font-size: 8pt;
  line-height: large;
  font-weight: bold;
  padding-top: 1ex;
  padding-bottom: 2ex;
}

/* 아코디언 바디 패딩 조절 */
.accordion-body-custom {
  padding-top: 0;
  padding-bottom: 1ex;
}


</style>
