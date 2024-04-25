<template>
  <div class="container-fluid mt-5 adminbackground">
    <div class="row">
      <h1 class="mb-4">현황 조회</h1> <br><br><br><br><br>
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
      <div class="col-md-9" style="margin-left: 200px;">
        <div class="row">
          <div class="col-md-6">
            <h3 style="text-decoration: underline; text-decoration-color: goldenrod; text-decoration-thickness: 5px;">회원 현황</h3>
            <div class="dashboard"><br>
              <p style="font-size: 20px">Total Members: {{ totalMembers }}<br><br>
              Today's New Members: {{ dailyNewMembers }}</p>
            </div>
          </div>
          <div class="col-md-6">
            <h3 style="text-decoration: underline; text-decoration-color: goldenrod; text-decoration-thickness: 5px;">인기명소</h3><br>
            <!-- <div class="table-responsive"> -->
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th style=" width:200px; background-color:beige">관광지 ID</th>
                    <th style=" width:200px; background-color:beige">관광지명</th>
                    <th style=" width:400px; background-color:beige">주소</th>
                    <th style=" width:200px; background-color:beige">좋아요 수</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="likesSpot && likesSpot.length > 0">
                    <tr v-for="item in likesSpot.slice(0, 10)" :key="item.contentid">
                      <td>{{ item.contentid }}</td>
                      <td>{{ item.title }}</td>
                      <td>{{ item.addr1 }}</td>
                      <td>{{ item.likes }}</td>
                    </tr>
                  </template>
                  <tr v-else>
                    <td colspan="4">데이터가 없습니다.</td>
                  </tr>
                </tbody>
              </table>
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import axios from 'axios';

export default {
name: 'AdminPage',
created() {
  this.fetchMembers();  // 컴포넌트 로드 시 회원 데이터 가져오기
  this.fetchDailyNewMembers();
  this.fetchlikeSpot();
},
data() {
  return {
    totalMembers: 0,
    dailyNewMembers: 0,
    likesSpot: [],
     adminItems: [
     { imgSrc: require('@/assets/logo.png'), title: '', hoverColor: 'orange', isHovered: false},
          { icon: 'fas fa-user-admin', title: '현황 조회', description: '고객 및 여행지 현황', hoverColor: 'gray', isHovered: false },
          { icon: 'fas fa-user-minus', title: '회원 관리', description: '회원정보 조회 및 탈퇴', hoverColor: 'lightblue', isHovered: false },
          { icon: 'fas fa-map-marked-alt', title: '여행지 관리', description: '여행지 등록 및 삭제', hoverColor: 'beige', isHovered: false },
          { icon: 'fas fa-bullhorn', title: '공지 관리', description: '공지사항 작성', hoverColor: 'lightpink', isHovered: false },
        ],
};
},

 methods: {
  

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
        this.totalMembers = response.data.length;  // 응답받은 데이터의 길이로 총 회원 수 설정
        console.log("Total members updated:", this.totalMembers);
      })
      .catch(error => {
        console.error("There was an error fetching the members:", error);
      });
      },
   


      fetchDailyNewMembers() {
    axios.get('http://192.168.0.78:3000/api/member')
      .then(response => {
        this.dailyNewMembers = response.data.filter(member => member.today === 1).length;
        console.log("Today's new members updated:", this.dailyNewMembers);
      })
      .catch(error => {
        console.error("There was an error fetching today's new members:", error);
      });
  },

  fetchlikeSpot() {
  axios.get('http://192.168.0.78:3000/api/localtourplaces') // Changed to the correct GET endpoint
    .then(response => {
      if (response.data && Array.isArray(response.data)) {
        this.likesSpot = response.data
          .map(spot => ({
            ...spot,
            likes: parseInt(spot.likes, 10) // 'likes' 필드를 정수형으로 변환
          }))
          .sort((a, b) => b.likes - a.likes) // 'likes'를 기준으로 내림차순 정렬
          .slice(0, 10); // 상위 10개 데이터만 유지
      } else {
        console.error("Invalid data format received:", response.data);
        this.likesSpot = []; // 데이터 포맷 문제 시 비우기
      }
    })
    .catch(error => {
      console.error("There was an error", error);
      this.likesSpot = []; // 에러 발생 시 배열을 비워서 에러 상황 처리
    });
},



handleAdminAction(action) {
       console.log('Action:', action);
       if (action === '공지 관리') {
      this.$router.push('/notice');
    } else if(action === '회원 관리') {
    this.$router.push('/member');
     }else if(action === '여행지 관리') {
    this.$router.push('/route');
    }else if(action === '현황 조회') {
    this.$router.push('/admin');
  }else if(action === '') {
    this.$router.push('/');
    }

 }}
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
  border: 1px solid #fdf8ec;
  width: 100%; /* 자동으로 부모 컨테이너 너비에 맞춤 */
  margin:15px;
}

.card-body {
  text-align: left;
  padding: 10px;
  border: 1px solid #ddd;
}
.adminbackground{
  background-image: url("@/assets/adminbg.jpg") !important; /* Ensure the path is correct */
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
}
</style>
