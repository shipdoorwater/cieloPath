<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <h1 class="mb-4">어드민</h1>
       <!-- Side Navigation -->
       <div class="col-md-3">
      <div class="nav flex-column text-center side-nav">
        <div v-for="item in adminItems" :key="item.title" class="nav mb-3">
          <div class="card-body" @click="handleAdminAction(item.title)"
                @mouseover="hoverCard(item)" @mouseleave="unhoverCard(item)"
                :style="{ backgroundColor: item.isHovered ? item.hoverColor : 'transparent' }">
            <img v-if="item.imgSrc" :src="item.imgSrc" :alt="item.title" height="50px">
            <i v-else :class="item.icon"></i>
            <h5 class="nav-title mt-3">{{ item.title }}</h5>
            <p class="nav-text">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
     <!-- Main Content -->
     
     <div class="col-md-9"><br><br><br><br>
      <h3>회원</h3>
        <div class="dashboard">
          <h3>Total Members: {{ totalMembers }}</h3>
          <h3>Today's New Members: {{ dailyNewMembers }}</h3>
          </div>
          </div>
     
          
</template>


<script>
import axios from 'axios';

export default {
name: 'AdminPage',

data() {
  return {
     adminItems: [
       { imgSrc: require('@/assets/logo.png'), hoverColor: 'orange', isHovered: false, url: 'http://localhost:8080/'},
       { icon: 'fas fa-user-minus', title: '회원 관리', description: '회원정보 조회 및 탈퇴', hoverColor: 'lightblue', isHovered: false },
       { icon: 'fas fa-map-marked-alt', title: '여행지 관리', description: '여행지 등록 및 삭제', hoverColor: 'beige', isHovered: false },
       { icon: 'fas fa-bullhorn', title: '공지 관리', description: '공지사항 작성', hoverColor: 'lightpink', isHovered: false },
       { icon: 'fas fa-chart-line', title: '통계 확인', description: '회원 및 여행지 현황 확인', hoverColor: 'lightgray', isHovered: false }
  ],
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
   },
   fetchMembers() {
        axios.get('http://192.168.0.78:3000/api/member')
          .then(response => {
            this.members = response.data;
            console.log("Received data:", this.members);
          })
          .catch(error => {
            console.error("There was an error fetching the members:", error);
          });
      },
 }
}

</script>

<style>
.side-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100px; /* 조정된 너비 */
  height: 100vh;
}

.container-fluid {
  padding-left: 100px; /* 네비게이션 너비에 맞춰 조정 */
}

.nav-item {
  text-align: left;
  padding: 10px;
  border: 1px solid #ddd;
  width: 50%; /* 자동으로 부모 컨테이너 너비에 맞춤 */
}

.card-body {
  text-align: left;
  padding: 10px;
  border: 1px solid #ddd;
}

</style>
