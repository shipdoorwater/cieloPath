<template>
  <div id="MainImageSlide">
    <!-- Bootstrap Carousel -->
    <div id="carouselImage" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <!-- Carousel items -->
        <div
          class="carousel-item"
          v-for="(item, index) in items"
          :class="{ active: index == 0 }"
          :key="index"
        >
          <div class="carousel-content d-flex">
            <img
              :src="item.image"
              class="carousel-image d-block"
              :alt="item.altText"
            />

            <span
              class="carousel-caption d-none d-md-block"
              style="color: black"
            >
              <h4>{{ item.title }}</h4>
              <p style="white-space: pre-wrap">{{ item.text }}</p>
            </span>
          </div>
        </div>
      </div>
      <!-- Left control -->
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselImage"
        data-bs-slide="prev"
      >
        <i class="bi bi-caret-left-fill btn btn-lg" style="color:black"></i>
        <span class="visually-hidden">Previous</span>
      </button>
      <!-- Right control -->
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselImage"
        data-bs-slide="next"
      >
        <i class="bi bi-caret-right-fill btn btn-lg" style="color:black"></i>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainImageSlide",
  data() {
    return {
      items: [
        {
          image: require("@/assets/main_seoul.jpeg"),
          altText: "image1",
          title:
            "서울의 심장, 광화문은 조선 시대부터 이어진 명소입니다",
          text: "서울의 광화문은 조선 왕조의 역사적 정문으로, 현대와 과거가 공존하는 문화적 상징지입니다.\n 도심 한복판에서 만나는 한국의 전통과 어우러진 현대성을 만나보세요",
        },
        {
          image: require("@/assets/main_jeju.png"),
          altText: "image2",
          title:
            "제주도, 천혜의 자연경관과 특별한 문화가 살아 숨 쉬는 곳입니다",
          text: "화산섬의 신비와 푸른 바다가 어우러진 제주도는 다양한 야생화와\n 독특한 음식을 즐길 수 있는 관광지입니다.\n 일상에 지친 당신에게 휴식과 모험을 함께 제공합니다",
        },
        {
          image: require("@/assets/main_busan.png"),
          altText: "image3",
          title: "부산은 번화한 도심과 아름다운 해변이 공존하는 곳입니다",
          text: "한국의 대표적 항구도시 부산은 금빛 모래사장과 현대적 스카이라인이 돋보입니다.\n 신선한 해산물을 포함한 다양한 음식과 역동적인 문화 행사로 방문객을 맞이합니다",
        },
      ],
    };
  },
};
</script>

<style>

.carousel-inner {
    background-color: rgba(128, 128, 128, 0.2);
}

.carousel-content {
  display: flex; /* Flexbox를 활성화 */
  align-items: center; /* 수직 정렬 */
  justify-content: space-between; /* 요소들 사이에 공간을 균등하게 배분 */
  height: 500px; /* 고정된 높이 설정 */
}

.carousel-image {
  flex: 1;
  max-width: 32%;
  max-height: 66%;
  object-fit: cover; /* 비율 유지하면서 요소의 전체영역을 채우기 */
  margin-left: 300px;
}

.carousel-caption {
  flex: 1;
  margin-left: 620px;
  margin-bottom: 120px;
  background-color: transparent;
  padding: 20px;
  border-radius: 0.25rem;
  text-align: left;
}

.carousel-control-prev-icon {
  left: 0; /* 왼쪽 버튼을 화면 왼쪽에 배치 */
}

.carousel-control-next {
  right: 0; /* 오른쪽 버튼을 화면 오른쪽에 배치 */
}
</style>
