<template>
    <div class="container-fluid mt-5">
      <div class="row">
        <h1 class="mb-4">어드민</h1>
        <!-- Side Navigation -->
        <div class="col-md-3">
          <div class="nav flex-column text-center"><br><br><br><br><br><br>
            <div v-for="item in adminItems" :key="item.title" class="card mb-3">
              <div class="card-body" @click="handleAdminAction(item.title)"
                   @mouseover="hoverCard(item)" @mouseleave="unhoverCard(item)"
                   :data-hover="item.isHovered" :style="{'--hover-color': item.hoverColor}">
                <img v-if="item.imgSrc" :src="item.imgSrc" :alt="item.title" height="50px" @click="navigateToUrl(item.url)">
                <i v-else :class="item.icon"></i>
                <h5 class="card-title mt-3">{{ item.title }}</h5>
                <p class="card-text">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Main Content -->
        <div class="col-md-9">
          <!-- Content here -->
        </div>
      </div>
    </div>
  </template>
 <script>
 export default {
   name: 'AdminPage',
   
   data() {
     return {
       adminItems: [
         { imgSrc: require('@/assets/logo.png'), hoverColor: 'orange', isHovered: false, url: 'http://192.168.0.71:8080/'},
         { icon: 'fas fa-user-minus', title: '회원 관리', description: '회원정보 조회 및 탈퇴', hoverColor: 'lightblue', isHovered: false },
         { icon: 'fas fa-map-marked-alt', title: '여행지 관리', description: '여행지 등록 및 삭제', hoverColor: 'beige', isHovered: false },
         { icon: 'fas fa-bullhorn', title: '공지 관리', description: '공지사항 작성', hoverColor: 'lightpink', isHovered: false },
         { icon: 'fas fa-chart-line', title: '통계 확인', description: '회원 및 여행지 현황 확인', hoverColor: 'lightgray', isHovered: false }
       ]
     };
   },
   methods: {
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
   }
 }
 </script>
 
  
 <style>
.container-fluid {
  padding: 0; /* Remove default padding */
}

.nav {
  /* Adds a border to the right of the nav */
  display: flex;
  flex-direction: column; /* Stack cards vertically */
  width: 40%; /* Full width of the column to use available space */
  align-items: flex-start; 
}

.card {
  cursor: pointer;
  transition: transform .5s, background-color .5s;
  width: 100%; /* Full width of the column to use available space */
  height: 100px; /* Auto height for better content fit */
}

.card-body {
  color: #333;
  background-color: #f8f9fa;
  text-align: left; /* Text alignment changed to left */
  font-size: 12px;
  transition: background-color .5s;
  padding-left: 20px; /* Adds padding to align text inside card body */
}

.card-title {
  text-align: left; /* Ensures title is also left-aligned */
  font-size: 15px;
}

.card-body[data-hover="true"] {
  background-color: var(--hover-color);
}

.row {
  margin: 0 auto; /* Ensure the row is centered */
  width: 100%; /* Use full width */
}
</style>

