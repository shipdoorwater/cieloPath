<template>
  <div id="Notice-Area" class="bg-sky-blue">
    <div class="container py-5"><br><br><br>
      <h1 class="text-center mb-4">Notice</h1><br><br><br><br>
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <div class="info-section"><br><br><br>
            <h5 class="fs-8-bold text-gray mb-3">
              <i class="bi bi-calendar-heart"></i>&nbsp;&nbsp;CIELO PATH는 다양한 여행 일정을 제공해요.
            </h5>
            <p class="text-white-opacity">
              We offers a variety of travel schedules.
            </p><br><br><br>
            <h5 class="fs-8-bold text-gray mb-3">
              <i class="bi bi-calendar-heart"></i>&nbsp;&nbsp;CIELO PATH는 지속적으로 업데이트하고 있어요.
            </h5>
            <p class="text-white-opacity">
              We are continuously being updated.
            </p>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="accordion" id="accordionExample">
            <div class="accordion-item" v-for="item in accordionItems" :key="item.id">
              <h2 class="accordion-header" :id="`heading${item.id}`"
                  :class="{'accordion-header-custom': item.open, 'accordion-header-default': !item.open}">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="`#collapse${item.id}`"
                        :aria-expanded="item.open.toString()" :aria-controls="`collapse${item.id}`" @click="toggleAccordion(item.id)">
                  {{ item.title }}
                </button>
              </h2>
              <div :id="`collapse${item.id}`" class="accordion-collapse collapse" :class="{ show: item.open }" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  {{ item.content }}
                </div>
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
    return {
      accordionItems: [
        { id: 'collapse1', title: 'CIELO PATH 운영시간', content: '24시간 여행 일정 생성 가능합니다. 상담은 9 to 6로 제한됩니다.', open: true },
        { id: 'collapse2', title: 'CIELO PATH 사용방법', content: '가고 싶은 지역을 검색 후 일정을 만들어 주세요! 타닥! 클릭! 완료!', open: false },
        { id: 'collapse3', title: 'CIELO PATH 공지사항 3', content: '공지사항 3 내용입니다.', open: false },
        { id: 'collapse4', title: 'CIELO PATH 공지사항 4', content: '공지사항 4 내용입니다.', open: false },
        { id: 'collapse5', title: 'CIELO PATH 공지사항 5', content: '공지사항 5 내용입니다.', open: false }
      ]
    };
  },
  methods: {
    toggleAccordion(id) {
      this.accordionItems.forEach(item => {
        item.open = item.id === id ? !item.open : false;
      });
    }
  }
};
</script>


<style>
.bg-sky-blue {
  background-color: rgb(204, 222, 255);
}

.container {
  min-height: 100vh; /* 컨테이너의 최소 높이를 뷰포트의 전체 높이로 설정 */
  padding: 2rem 1rem; /* 상단과 하단에 적절한 여백 제공 */
}

.text-white-opacity {
  color: rgb(53, 53, 53);
  opacity: 0.65;
}

.fs-8-bold {
  font-size: 20px; /* 폰트 크기 증가 */
  font-weight: bold;
}
.accordion-header-custom {
  background-color: #cceeff; /* 푸른색 배경 */
}

.accordion-header-default {
  background-color: #ffffff; /* 흰색 배경 */
}

.accordion-button-custom {
  font-size: 1rem; /* 적절한 폰트 크기 설정 */
  padding: 0.75rem 1.25rem; /* 버튼의 패딩 조절 */
}

.accordion-body-custom {
  text-align: left;
  padding: 1rem; /* 바디의 내부 패딩 조정 */
}
</style>

