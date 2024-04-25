<template>
  <div class="container-fluid mt-5 adminbackground">
      <div class="row">
          <h1 class="mb-4">여행지 관리</h1>
          <!-- Side Navigation -->
      <div class="col-md-3">
        <div class="nav flex-column text-center side-nav">
  <div v-for="item in adminItems" :key="item.title" class="nav mb-3">
    <div class="card-body" @click="handleAdminAction(item.title)"
         @mouseover="hoverCard(item)" @mouseleave="unhoverCard(item)"
         :style="{ backgroundColor: item.isHovered ? item.hoverColor : 'white' }">
      <img v-if="item.imgSrc" :src="item.imgSrc" :alt="item.title" height="50px">
      <h5 class="nav-title mt-3">{{ item.title }}</h5>
      <p class="nav-text">{{ item.description }}</p>

            </div>
          </div>
        </div>
      </div>

          <!-- Main Content -->
          <div class="row"><br><br><br><br>
              <div class="col-md-4" @click="openAddLocationModal">
                  <div class="image-container position-relative text-center add-location-card">
                      <span class="align-middle;">[지역 추가]</span>
                  </div>
              </div>
              <div class="col-md-4" v-for="(image, name) in images" :key="name">
                  <div class="image-container position-relative">
                      <img :src="image.src" class="img-fluid rounded" :alt="name"/>
                      <button class="delete-icon" @click.stop="deleteImage(name)">
                          <i class="bi bi-bookmark-x-fill"></i>
                      </button>
                      <div class="text">
                          <span class="additional-text">{{ image.text }}</span><br>
                          <span>{{ name }}</span><br>
                      </div>
                  </div>
              </div>
          </div>

          <!-- Modal for Adding Locations -->
      <div ref="addLocationModal" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">여행지 추가</h5>
           
            </div>
            <div class="modal-body">
              <form @submit.prevent="addLocation">
                <div class="form-group">
                  <label for="location-name">지역 이름</label>
                  <input type="text" class="form-control" id="location-name" v-model="newLocationName" required>
                </div><br>
                <div class="form-group">
                  <label for="location-name">영문 이름</label>
                  <input type="text" class="form-control" id="location-name" v-model="newLocationEnglishName" required>
                </div><br>
                <div class="form-group">
                  <label for="location-description">지역 설명</label>
                  <textarea class="form-control" id="location-description" v-model="newLocationDescription"></textarea>
                </div><br>
                <div class="form-group">
                  <label for="location-image">이미지 업로드</label>
                  <input type="file" class="form-control-file" id="location-image" @change="handleFileChange">
                </div><br>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" @click="closeAddLocationModal">닫기</button>
                  <button type="submit" class="btn btn-primary">저장</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


  <script>
  import axios from 'axios';
  import 'bootstrap/dist/js/bootstrap.bundle.min.js';
  import { Modal } from 'bootstrap';

  export default {
    name: 'AdminRoute',
    
    data() {
      return {
        newLocationName: '',
      newLocationDescription: '',
      newLocationFile: null,
      adminItems: [
          { imgSrc: require('@/assets/logo.png'), title: '', hoverColor: 'orange', isHovered: false},
          { icon: 'fas fa-user-admin', title: '현황 조회', description: '고객 및 여행지 현황', hoverColor: 'gray', isHovered: false },
          { icon: 'fas fa-user-minus', title: '회원 관리', description: '회원정보 조회 및 탈퇴', hoverColor: 'lightblue', isHovered: false },
          { icon: 'fas fa-map-marked-alt', title: '여행지 관리', description: '여행지 등록 및 삭제', hoverColor: 'beige', isHovered: false },
          { icon: 'fas fa-bullhorn', title: '공지 관리', description: '공지사항 작성', hoverColor: 'lightpink', isHovered: false },
                  ],
        images: {
      },
      modalInstance: null,
      };
    },
    mounted() {
      this.fetchimage();
      this.modalInstance = new Modal(this.$refs.addLocationModal, {
            keyboard: false
          });
    },
 
    methods: {
      createImageUrl(imageData) {
    const blob = new Blob([imageData], { type: 'image/jpeg' }); // MIME type을 적절히 설정
    return URL.createObjectURL(blob);
  },
      fetchimage() {
    axios.get('http://192.168.0.78:3000/api/toursiteimage')
    .then(response => {
        console.log('Received data:', response.data);
        this.images = response.data.map(item => ({
          name: item.image_name,
          // src: this.createImageUrl(item.image_data),
          src: `data:image/jpeg;base64, ${item.image_data}`,
          description: item.description
        }));
      })
      .catch(error => {
        console.error('Error fetching images:', error);

      });
  },


  deleteImage(data_id) {
  if (confirm("이미지를 삭제하시겠습니까?")) {
    axios.put(`http://192.168.0.78:3000/api/toursiteimage/modify/${data_id}`)
      .then(() => {
        const index = this.toursiteimage.findIndex(item => item.data_id === data_id);
        if (index !== -1) {
          this.toursiteimage[index].valid = 0;
          this.fetchimage();  // Re-fetch images to update the list
        }
      })
      .catch(error => {
        console.error("Error disabling the toursiteimage:", error);
      });
  }
},
handleFileChange(event) {
    this.newLocationFile = event.target.files[0];
  },
  handleAdminAction(action) {
  console.log('Action clicked:', action); // 액션이 정확하게 찍히는지 확인
  if (action === '공지 관리') {
    this.$router.push('/notice');
  } else if (action === '회원 관리') {
    this.$router.push('/member');
  } else if (action === '여행지 관리') {
    this.$router.push('/route');
  } else if (action === '현황 조회') {
    this.$router.push('/admin');
  } else if (action === '') {
    this.$router.push('/');
  }
},

     hoverCard(item) {
       item.isHovered = true;
     },
     unhoverCard(item) {
       item.isHovered = false;
     },
     navigateToUrl(url) {
       window.location.href = url;
     },
     openAddLocationModal() {
            this.modalInstance.show();
        },
        closeAddLocationModal() {
            this.modalInstance.hide();
        },
     
    addLocation() {
      let formData = new FormData();
      formData.append("image_name", this.newLocationName);
      formData.append("image_english_name", this.newLocationEnglishName);
      formData.append("content", this.newLocationDescription);
      formData.append("image_data", this.newLocationFile);

      axios.post('http://192.168.0.78:3000/api/toursiteimage/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(() => {
        this.fetchimage();
        this.closeAddLocationModal();
      }).catch(error => {
        console.error("Error adding location:", error);
      });
    }
  }
}
</script>
  
  <style>

.image-container {
  position: relative;
  width: 300px;
  height: 400px;
  object-fit: cover;
  border: 1px solid #fdf8ec; /* Add border for clarity */
  justify-content: center;
  align-items: center;
  margin-bottom: 100px; 
  margin-left:100px;
  
}


.side-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100px; /* 너비 조정 */
  height: 100vh; /* 배경색 */
  z-index: 1100;
}

.container-fluid {
  padding-right:10%; /* 사이드 네비게이션 너비만큼 패딩 추가 */
}

.nav {
  display: flex;
  flex-direction: column; /* Ensures items are arranged vertically */
  width: 200px;

}
.card-body {
  text-align: left; /* Aligns text to the left */
  padding: 10px; /* Padding inside card body */
  border: 1px solid #ddd;
  width: 200px;
}

.hover-active {
  background-color: var(--hover-color); 
}


.card {
  width: 100%; /* Card takes full width of the sidebar */
  margin-bottom: 5px; /* Space between cards */
}



.form-control{
  width: 400px;
}
.modal-body .form-group label {
  text-align: left; /* Align text to the left */
  display: block; /* Make sure the label is a block element to take up the full width */
}
.add-location-card {
  cursor: pointer;
  background-color: #f8f9fa; /* Light background color */
  color: #333; /* Text color */
  font-size: 20px; /* Larger text size for visibility */
  text-align: left;
  height: 150px; /* Standardize height for visual consistency */
  margin-left:300px;
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
.adminbackground{
  background-image: url("@/assets/adminbg.jpg") !important; /* Ensure the path is correct */
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
}
</style>
