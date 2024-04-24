<template>
    <div class="container-fluid mt-5">
      <div class="row">
        <h1 class="mb-4">여행지 관리</h1>
        <!-- Side Navigation -->
        <div class="col-md-3">
          <div class="nav flex-column text-center">
            <div v-for="item in adminItems" :key="item.title" class="card mb-3">
              <div class="card-body" @click="handleAdminAction(item.title)"
                   @mouseover="hoverCard(item)" @mouseleave="unhoverCard(item)"
                   :data-hover="item.isHovered" :style="{'--hover-color': item.hoverColor}">
                <img v-if="item.imgSrc" :src="item.imgSrc" :alt="item.title" height="50px">
                <i v-else :class="item.icon"></i>
                <h5 class="card-title mt-3">{{ item.title }}</h5>
                <p class="card-text">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="row">
          <div class="col-md-4" @click="openAddLocationModal">
            <div class="image-container position-relative text-center add-location-card">
              <span class="align-middle">[지역 추가]</span>
            </div>
          </div>
          <div class="col-md-4" v-for="(image, name) in images" :key="name">
            <div class="image-container position-relative">
              <img :src="image.src" class="img-fluid rounded" :alt="name"/>
              <button class="delete-icon" @click.stop="deleteImage(name)">
                <i class="bi bi-bookmark-x"></i>
              </button>
              <div class="text">
                <span class="additional-text">{{ image.text }}</span><br>
                <span>{{ name }}</span><br><br>
              </div>
            </div>
          </div>
        </div>
        <!-- 여행지 추가 폼 모달 -->
        <div class="modal" id="addLocationModal" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">여행지 추가</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="addLocation">
                  <div class="form-group">
                    <label for="location-name">지역 이름</label>
                    <input type="text" class="form-control" id="location-name" v-model="newLocationName" required>
                  </div>
                  <div class="form-group">
                    <label for="location-description">지역 설명</label>
                    <textarea class="form-control" id="location-description" v-model="newLocationDescription"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="location-image">이미지 업로드</label>
                    <input type="file" class="form-control-file" id="location-image" @change="handleFileChange">
                  </div>
                  <button type="submit" class="btn btn-primary">추가</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </template>
    
  <script>
//   import axios from 'axios';

  export default {
    name: 'AdminRoute',
    data() {
      return {
        newLocationName: '',
      newLocationDescription: '',
      newLocationFile: null,
      adminItems: [
          { imgSrc: require('@/assets/logo.png'), hoverColor: 'orange', isHovered: false, url: 'http://localhost:8080/'},
          { icon: 'fas fa-user-minus', title: '회원 관리', description: '회원정보 조회 및 탈퇴', hoverColor: 'lightblue', isHovered: false },
          { icon: 'fas fa-map-marked-alt', title: '여행지 관리', description: '여행지 등록 및 삭제', hoverColor: 'beige', isHovered: false },
          { icon: 'fas fa-bullhorn', title: '공지 관리', description: '공지사항 작성', hoverColor: 'lightpink', isHovered: false },
          { icon: 'fas fa-chart-line', title: '통계 확인', description: '회원 및 여행지 현황 확인', hoverColor: 'lightgray', isHovered: false }
        ],
        images: {
        Seoul: {
          text: "서울",
          src: require("@/assets/main_seoul.jpeg"),
          description:
            "서울은 대한민국의 수도로, 전통과 현대가 어우러진 도시입니다. 한강을 중심으로 펼쳐진 이 대도시는 고궁, 고증 건축물, 그리고 현대적인 스카이라인을 자랑합니다. 경복궁, 창덕궁, 덕수궁 같은 조선 시대의 궁궐들은 한국의 역사를 체험할 수 있는 최고의 장소입니다. 이외에도 인사동에서는 전통 차와 공예품을 즐길 수 있고, 명동과 강남 지역에서는 세계적인 쇼핑과 미식을 경험할 수 있습니다. 또한, 홍대와 이태원은 다양한 문화가 공존하는 유니크한 지역으로, 젊은이들과 외국인 관광객들로부터 큰 사랑을 받고 있습니다. 서울은 또한 많은 박물관과 예술 갤러리를 보유하고 있어 문화 예술을 사랑하는 이들에게도 큰 매력을 발산합니다.",
        },
        Busan: {
          text: "부산",
          src: require("@/assets/main_busan.png"),
          description:
            "부산은 한국에서 두 번째로 큰 도시로, 해운대와 광안리 같은 아름다운 해변이 유명합니다. 부산은 자연의 아름다움과 도시적인 활기를 동시에 느낄 수 있는 곳입니다. 해변 외에도 부산에는 범어사와 같은 수려한 사찰과 자갈치 시장 같은 전통 시장이 있어 다양한 볼거리를 제공합니다. 특히 자갈치 시장에서는 싱싱한 해산물을 직접 맛보고 구매할 수 있는 경험을 할 수 있으며, 부산 국제 영화제 같은 다양한 문화 행사가 연중 개최되어 문화예술 도시로서의 면모를 갖추고 있습니다. 또한, 감천문화마을처럼 예술적 가치와 역사적 배경이 어우러진 곳들도 많아 관광객들에게 인기가 많습니다.",
        },
        Jeju: {
          text: "제주",
          src: require("@/assets/main_jeju.png"),
          description:
            "제주도는 한국 남부에 위치한 섬으로, 독특한 문화와 자연 경관으로 유명합니다. 화산 활동으로 형성된 섬답게 다양한 지질 및 자연 경관이 특징이며, 이는 제주도의 중요한 관광 자원입니다. 제주의 해안선을 따라 펼쳐진 절경과, 한라산 국립공원 등의 대표적인 하이킹 코스는 많은 탐험가와 자연 애호가들에게 사랑받고 있습니다. 제주도는 또한 오름, 성산일출봉, 만장굴과 같은 독특한 자연 유산들을 자랑하며, 제주 특유의 돌하르방과 감귤 농장도 인기 있는 관광 명소입니다. 제주의 맛집에서는 흑돼지, 갈치 등 다양한 지역 특산물을 맛볼 수 있으며, 올레길을 걸으며 섬의 아름다운 풍경을 천천히 감상하는 것도 추천할 만한 활동입니다. 이러한 각 지역의 소개는 그 지역을 방문하거나 더 알아보는 데 유용한 정보를 제공하며, 각 지역의 독특한 매력과 문화를 간략하게나마 효과적으로 전달합니다.",
        },
        Gangwon: {
          text: "강원",
          src: require("@/assets/main_gangwon.jpg"),
          description: "Visit Gangwon for stunning landscapes.",
        },
        Daegu: {
          text: "대구",
          src: require("@/assets/main_daegu.jpg"),
          description: "Experience the culture in Daegu.",
        },
        Gyeongju: {
          text: "경주",
          src: require("@/assets/main_gyeongju.png"),
          description: "See the historical sites in Gyeongju.",
        },
      },
      };
    },
    mounted() {
      this.fetchMembers();
    },
    methods: {
    openAddLocationModal() {
      ('#addLocationModal').modal('show');
    },
    handleAdminAction(action) {
       console.log('Action:', action);
       if (action === '공지 관리') {
      this.$router.push('/notice');
    } else if(action === '회원 관리') {
    this.$router.push('/member');
     }else if(action === '여행지 관리') {
    this.$router.push('/route');
    }},
     hoverCard(item) {
       item.isHovered = true;
     },
     unhoverCard(item) {
       item.isHovered = false;
     },
     navigateToUrl(url) {
       window.location.href = url;
     }
      
    // addLocation() {
    //   let formData = new FormData();
    //   formData.append("name", this.newLocationName);
    //   formData.append("description", this.newLocationDescription);
    //   formData.append("image", this.newLocationFile);

    //   axios.post('http://localhost:3000/api/location', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   }).then(() => {
    //     // update your images object here
    //     ('#addLocationModal').modal('hide');
    //   }).catch(error => {
    //     console.error("Error adding location:", error);
    //   });
    // }
  }
}
</script>
  
  <style>
.image-container {
  position: relative;
  width: 300px;
  height: 400px;
  object-fit: cover;
  border: 1px solid #ddd; /* Add border for clarity */
  justify-content: center;
  align-items: center;
}

.add-location-card {
  cursor: pointer;
  background-color: #f8f9fa; /* Light background color */
  color: #333; /* Text color */
  font-size: 20px; /* Larger text size for visibility */
}

.img-fluid {
  width: 100%;
  height: 100%;
}

.delete-icon {
  position:absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  color: hotpink;
  cursor: pointer;
  font-size: 1.8em;
}
</style>
