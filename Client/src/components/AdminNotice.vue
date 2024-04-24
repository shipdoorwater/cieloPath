<template>
    <div class="container-fluid mt-5">
      <div class="row">
        <h1 class="mb-4">공지사항 관리</h1>
        <!-- Side Navigation -->
        <div class="col-md-3">
          <div class="nav flex-column text-center">
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
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">NO</th>
                  <th scope="col">제목</th>
                  <th scope="col">내용</th>
                  <th scope="col">작성일시</th>
                  <th scope="col">삭제여부</th>
                 
                </tr>
              </thead>
              <tbody>
  <!-- 공지사항 행에 클래스를 동적으로 적용 -->
<tr v-for="item in notice" :key="item.postId" :class="{ 'disabled-notice': item.valid === 0 }">
  <th scope="row">{{ item.postId }}</th>
  <td>{{ item.title }}</td>
  <td>{{ item.content }}</td>
  <td>{{ formatDate(item.writeDate) }}</td>
  <td> <button @click="deleteNotice(item.postId)" :disabled="item.valid === 0">삭제</button></td>
</tr>

</tbody>
            </table>
          </div>
          <div class="text-center mt-4">
            <!-- Trigger button for modal -->

           
            <button class="btn btn-success" @click="showModal = true">공지사항 입력</button>
          </div>
        </div>
      </div>
      <!-- Modal -->
      <div v-if="showModal" class="modal fade show" style="display: block;" tabindex="-1" aria-labelledby="noticeModalLabel" aria-modal="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="noticeModalLabel">공지사항 입력</h5>
             
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="noticeTitle">제목</label>
                  <input type="text" class="form-control" id="noticeTitle" v-model="newNotice.title">
                </div>
                <div class="form-group">
                  <label for="noticeContent">내용</label>
                  <textarea class="form-control" id="noticeContent" rows="3" v-model="newNotice.content"></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="showModal = false">닫기</button>
              <button type="button" class="btn btn-primary" @click="saveNotice">저장</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';

  export default {
  name: 'AdminNotice',

  data() {
    return {
        notice: [],
        showModal: false,
      newNotice: {
        title: '',
        content: ''
      },
       adminItems: [
         { imgSrc: require('@/assets/logo.png'), hoverColor: 'orange', isHovered: false, url: 'http://localhost:8080/'},
         { icon: 'fas fa-user-minus', title: '회원 관리', description: '회원정보 조회 및 탈퇴', hoverColor: 'lightblue', isHovered: false },
         { icon: 'fas fa-map-marked-alt', title: '여행지 관리', description: '여행지 등록 및 삭제', hoverColor: 'beige', isHovered: false },
         { icon: 'fas fa-bullhorn', title: '공지 관리', description: '공지사항 작성', hoverColor: 'lightpink', isHovered: false },
         { icon: 'fas fa-chart-line', title: '통계 확인', description: '회원 및 여행지 현황 확인', hoverColor: 'lightgray', isHovered: false }
    ],
  };
},
  mounted() {
    this.fetchNotices();
  },
   methods: {
    saveNotice() {
      axios.post('http://192.168.0.78:3000/api/notice/write', this.newNotice)
        .then(response => {
          this.notice.push(response.data);
          this.showModal = false;
          this.newNotice = { title: '', content: '' };
          this.fetchNotices();
        })
        .catch(error => {
          console.error("Error saving the notice:", error);
        });
    },
    deleteNotice(postId) {
      if (confirm('삭제하시겠습니까?')){
  axios.put(`http://192.168.0.78:3000/api/notice/${postId}/disable`)
    .then(() => {
      const index = this.notice.findIndex(item => item.postId === postId);
      if (index !== -1) {
        this.notice[index].valid = 0;
        this.fetchNotices();
      }
    })
    .catch(error => {
      console.error("Error disabling the notice:", error);
    });
}},
    formatDate(value) {
      if (!value) return '';
      const date = new Date(value);
  
      return date.toLocaleString().replace('T', ' '); // ISO 문자열을 년-월-일 시:분:초 형식으로 변환
    },
    
    fetchNotices() {
    axios.get('http://192.168.0.78:3000/api/notice') // 포트 번호를 포함한 올바른 API 주소
    .then(response => {

        this.notice = response.data.sort((a, b) => new Date(b.writeDate) - new Date(a.writeDate)); 
      console.log(response.data);
      console.log("Received data:", response.data);
    })
    .catch(error => {
      console.error("There was an error fetching the notices:", error);
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
 .disabled-notice {
  color: #383838; /* 회색 텍스트 */
  background-color: #e9ecef; /* 연한 회색 배경 */
  text-decoration: double line-through; 
}
  .table-responsive {
  max-width: 90%;
  margin: 0 auto; /* 가운데 정렬 */
}

.container {
  max-width: 1200px;
  margin: auto;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1040;
}
.modal-dialog {
  width: auto;
}
.modal-content {
  position: relative;
  padding: 20px;
  animation: fadeIn 0.5s;
}
.close {
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
  border: none;
  background: none;
  color: black;
  font-size: 1.5rem;
}

  </style>
  