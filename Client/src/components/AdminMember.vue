<template>
    <div class="container-fluid mt-5 adminbackground">
      <div class="row">
        <h1 class="mb-4">회원 관리</h1>
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
        <div class="col-md-9"><br><br><br><br>
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th style="background-color: beige; width:300px;" scope="col">이메일</th>
                  <th style="background-color: beige; width:150px;" scope="col">이름</th>
                  <th style="background-color: beige; width:150px;" scope="col">닉네임</th>
                  <th style="background-color: beige; width:200px;" scope="col">휴대폰번호</th>
                  <th style="background-color: beige; width:500px;" scope="col">가입일시</th>
                  <th style="background-color: beige; width:400px;" scope="col">정상여부</th>
                  <th style="background-color: beige; width:300px;" scope="col">탈퇴</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in members" :key="item.email_id">
                  <th scope="row">{{ item.EMAIL_ID }}</th>
                  <td>{{ item.NAME }}</td>
                  <td>{{ item.NICKNAME }}</td>
                  <td>{{ item.PHONENUMBER }}</td>
                  <td>{{ formatDate(item.SIGNUPDATE) }}</td>
                  <td>{{ item.VALID }}</td>
                  <td><button @click="deleteMember(item.EMAIL_ID)" :disabled="item.VALID === 0">탈퇴</button></td>
                </tr>
              </tbody>
            </table>
           <br><br> <div class="btn-group me-2" role="group" aria-label="First group">
      <button type="button" class="btn btn-outline-secondary">1</button>
    </div>
          </div>
          
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'AdminMember',
    data() {
      return {
        members: [],
        showModal: false,
        adminItems: [
        { imgSrc: require('@/assets/logo.png'), title: '', hoverColor: 'orange', isHovered: false},
          { icon: 'fas fa-user-admin', title: '현황 조회', description: '고객 및 여행지 현황', hoverColor: 'gray', isHovered: false },
          { icon: 'fas fa-user-minus', title: '회원 관리', description: '회원정보 조회 및 탈퇴', hoverColor: 'lightblue', isHovered: false },
          { icon: 'fas fa-map-marked-alt', title: '여행지 관리', description: '여행지 등록 및 삭제', hoverColor: 'beige', isHovered: false },
          { icon: 'fas fa-bullhorn', title: '공지 관리', description: '공지사항 작성', hoverColor: 'lightpink', isHovered: false },
             ],
      };
    },
    mounted() {
      this.fetchMembers();
    },
    methods: {
      deleteMember(EMAIL_ID) {
        if (confirm('탈퇴 하시겠습니까?')){
        axios.put(`http://192.168.0.78:3000/api/member/${EMAIL_ID}/disable`)
          .then(() => {
            const index = this.members.findIndex(item => item.EMAIL_ID === EMAIL_ID);
            if (index !== -1) {
              this.members[index].valid = 0;
              this.fetchMembers();  // Re-fetch members to update the list
            }
          })
          .catch(error => {
            console.error("Error disabling the member:", error);
          });
      }},
      formatDate(value) {
        if (!value) return '';
        return new Date(value).toLocaleString();
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
  .disabled-member {
    color: #383838;
    background-color: #e9ecef;
    text-decoration: line-through;
  }
  .table-responsive {
    max-width: 100%;
    margin: 0 auto;
  }
  .container {
    max-width: 1200px;
    margin: auto;
  }
  
  .adminbackground{
  background-image: url("@/assets/adminbg.webp") !important; /* Ensure the path is correct */
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
}
  </style>
  