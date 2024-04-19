<template><br><br><br><br><br><br>
  <div class="container my-page">
    <h1>어디로 떠나볼까요?</h1><br><br><br>
    <nav class="navbar navbar-light bg-white">
      <div class="container-fluid justify-content-center">
        <form class="d-flex justify-content-center">
          <input class="form-control form-control-lg me-2" type="search" v-model="searchQuery" placeholder="가고 싶은 지역을 찾아보세요" aria-label="Search">
          <button class="btn btn-outline-success btn-lg" type="submit">Search</button>
        </form>
      </div>
    </nav><br><br><br><br><br>
    <div class="row">
    <div class="col-md-4" v-for="(image, name) in images" :key="name" @click="openModal(name, image)">
      <img :src="image.src" class="img-fluid rounded zoom fixed-size" :alt="name">
      <div class="text">
        <span class="additional-text">{{ image.text }}</span><br>
        <span ass="text">{{ name }}</span><br><br>
       <!-- Additional text -->
       
      </div>
    </div>
  </div>
    <!-- Modal -->
<div v-if="showModal" class="modal" style="display: block;">

  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{ currentImage.name }}</h5>
        
      </div>
      <div class="modal-body">
  <div class="content-flex">
    <img :src="currentImage.src" class="img-modal">
    
    <div class="text-modal">
      <p>{{ currentImage.description }}</p>
    </div>
  </div>
</div>
<div class="booking-buttons">
  <a href="https://kr.hotels.com/" style="background-color: lightgray; margin-left:100px; width: 130px;"  target="_blank" class="btn btn-booking">숙소 예약</a>
  <a href="https://www.letskorail.com/" style="background-color: lightgray; width: 130px;" target="_blank" class="btn btn-booking">기차 예약</a>
</div> <br>
                <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="closeModal">닫기</button>

        <button class="btn btn-primary">CIELO만들기</button>
      </div>
    </div>
  </div>
</div>

  </div>
</template>



<script>
export default {
  name: 'TripSearch',
  data(){
    return{
          searchQuery: '',
      showModal: false,
      currentImage: {},
      images: {
        Seoul: {text: '서울', src: require('@/assets/main_seoul.jpeg'), description: '서울은 대한민국의 수도로, 전통과 현대가 어우러진 도시입니다. 한강을 중심으로 펼쳐진 이 대도시는 고궁, 고증 건축물, 그리고 현대적인 스카이라인을 자랑합니다. 경복궁, 창덕궁, 덕수궁 같은 조선 시대의 궁궐들은 한국의 역사를 체험할 수 있는 최고의 장소입니다. 이외에도 인사동에서는 전통 차와 공예품을 즐길 수 있고, 명동과 강남 지역에서는 세계적인 쇼핑과 미식을 경험할 수 있습니다. 또한, 홍대와 이태원은 다양한 문화가 공존하는 유니크한 지역으로, 젊은이들과 외국인 관광객들로부터 큰 사랑을 받고 있습니다. 서울은 또한 많은 박물관과 예술 갤러리를 보유하고 있어 문화 예술을 사랑하는 이들에게도 큰 매력을 발산합니다.' },
        Busan: {text: '부산',  src: require('@/assets/main_busan.png'), description: '부산은 한국에서 두 번째로 큰 도시로, 해운대와 광안리 같은 아름다운 해변이 유명합니다. 부산은 자연의 아름다움과 도시적인 활기를 동시에 느낄 수 있는 곳입니다. 해변 외에도 부산에는 범어사와 같은 수려한 사찰과 자갈치 시장 같은 전통 시장이 있어 다양한 볼거리를 제공합니다. 특히 자갈치 시장에서는 싱싱한 해산물을 직접 맛보고 구매할 수 있는 경험을 할 수 있으며, 부산 국제 영화제 같은 다양한 문화 행사가 연중 개최되어 문화예술 도시로서의 면모를 갖추고 있습니다. 또한, 감천문화마을처럼 예술적 가치와 역사적 배경이 어우러진 곳들도 많아 관광객들에게 인기가 많습니다.' },
        Jeju: {text: '제주',  src: require('@/assets/main_jeju.png'), description: '제주도는 한국 남부에 위치한 섬으로, 독특한 문화와 자연 경관으로 유명합니다. 화산 활동으로 형성된 섬답게 다양한 지질 및 자연 경관이 특징이며, 이는 제주도의 중요한 관광 자원입니다. 제주의 해안선을 따라 펼쳐진 절경과, 한라산 국립공원 등의 대표적인 하이킹 코스는 많은 탐험가와 자연 애호가들에게 사랑받고 있습니다. 제주도는 또한 오름, 성산일출봉, 만장굴과 같은 독특한 자연 유산들을 자랑하며, 제주 특유의 돌하르방과 감귤 농장도 인기 있는 관광 명소입니다. 제주의 맛집에서는 흑돼지, 갈치 등 다양한 지역 특산물을 맛볼 수 있으며, 올레길을 걸으며 섬의 아름다운 풍경을 천천히 감상하는 것도 추천할 만한 활동입니다. 이러한 각 지역의 소개는 그 지역을 방문하거나 더 알아보는 데 유용한 정보를 제공하며, 각 지역의 독특한 매력과 문화를 간략하게나마 효과적으로 전달합니다.' },
        Gangwon: {text: '강원',  src: require('@/assets/main_gangwon.jpg'), description: 'Visit Gangwon for stunning landscapes.' },
        Daegu: {text: '대구',  src: require('@/assets/main_daegu.jpg'), description: 'Experience the culture in Daegu.' },
        Gyeongju: {text: '경주',  src: require('@/assets/main_gyeongju.png'), description: 'See the historical sites in Gyeongju.' },
      }
    };
  },
  methods: {
  openModal(name, image) {
    this.currentImage = { name, ...image };
    this.showModal = true; // This should trigger the modal to display
  },
  closeModal() {
    this.showModal = false; // This should hide the modal
  },
    createCielo() {
      // Logic to create CIELO
    }
  },
  watch: {
  searchQuery(newVal) {
    const matchedImage = Object.entries(this.images).find(([key, value]) => 
      key.toLowerCase() === newVal.toLowerCase() || value.text.toLowerCase() === newVal.toLowerCase()
    );

    if (matchedImage) {
      this.currentImage = { name: matchedImage[0], ...matchedImage[1] };
      this.showModal = true;
    }
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
.booking-buttons {
  display: flex; /* Establishes a flex container */
  align-items: center; /* Centers the buttons vertically within the container */
  justify-content: flex-start; /* Aligns the buttons to the start of the container */
  gap: 10px; /* Space between the buttons */
}

.btn-booking {
  
  background-color: #b9b9b9; /* Light grey background */
  border: 1px solid #ccc; /* Optional: adds a subtle border */
  color: black; /* Text color */
  padding: 8px 16px; /* Padding inside the buttons */
  text-decoration: none; /* Removes underline from links */
  display: block; /* Ensures that the anchor behaves like a button */
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Aligns content to the left */
}
.form-control {
  width: 300px;
}
.center-block {
  margin: 0 auto;
  width: 50%;
}
.content-flex {
  display: flex; /* Enables flexbox layout */
  align-items: center; /* Centers items vertically */
  justify-content: start; /* Aligns items to the start of the flex container */
  gap: 20px; /* Adds space between the image and the text */
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    animation: fadeIn 0.5s;
  }

.modal-dialog {
  max-width: 80%; /* Increases the maximum width of the modal */
  width: auto; /* Allows the modal to scale based on the max-width */
}

.modal-content {
  min-height: 500px; /* Optionally set a minimum height */
}

/* Adjust image modal styles if needed */
.img-modal {
  width: 400px !important;
  height: 500px !important;
  object-fit: cover !important;
}

/* Update content flex to handle larger text and images */
.content-flex {
  gap: 30px; /* Increase space between elements for larger modal */
}

.text-modal {
  padding: 0 20px; /* Increase padding for better readability in a larger modal */
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
