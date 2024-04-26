<template>
  <div class="travel-planner container-fluid mt-5">
    <h1 class="text-center mb-4">SelfPlan2</h1>

    <div class="map-container">
 
        <button class="btn btn-primary" @click="savePlan()">일정 저장하기</button>
        <button class="btn btn-secondary" @click="goToSelfPlan">여행일정 다시 생성</button>
        <button class="btn btn-primary" @click="$router.push({ name: 'main' })">홈으로 돌아가기</button>
      </div>

    <div class="content-layout d-flex flex-row">
      <div class="itinerary-container flex-grow-1">
        <div class="d-flex justify-content-around mb-3">
          <div v-for="(day, index) in itineraries" :key="index" class="day-container">
            <h2>{{ index + 1 }}일차</h2>
            <div class="attractions-list">
              <div v-for="attraction in day" :key="attraction.contentid" class="attraction-card mb-2">
                <h5 class="card-title">{{ attraction.title }}</h5>
                <img :src="attraction.firstimage || 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1 1\'/%3E'" alt="Image of {{ attraction.title }}" class="img-fluid">
                <p class="card-text">{{ attraction.addr1 }}</p>
                <!-- <button type="button" class="btn btn-outline-primary">상세보기</button>
                <button type="button" class="btn btn-outline-danger">좋아요</button> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      

    </div>
  </div>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
  
        days: 0,
        companions: '',
        style: '',
        location: '',
        startDate: '', // startDate 추가
        endDate: '', // endDate 추가
        currentUser: "",
        lastScheduleId: 0,
  
        selectedItinerary: [],
        itineraries: [], // itineraries를 배열로 초기화
  
      };
    },
  
    mounted() {

   
    // 컴포넌트가 마운트되었을 때 로컬 스토리지에서 lastScheduleId를 읽어옵니다.
    this.lastScheduleId = localStorage.getItem('lastScheduleId');
    console.log('SelfPlan3 from localStorage:', this.lastScheduleId);
  
    //   const storedData = localStorage.getItem('selectedItinerary');
    //   if (storedData) {
    //     this.selectedItinerary = JSON.parse(storedData);
    //   }
    //   console.log("받은 일정 데이터:", this.selectedItinerary);
    //   this.fetchItineraries();
      this.sendContentIds();
  
  
    },
  
    methods: {
      sendContentIds() {

        const apiUrl = 'http://192.168.0.78:3000/api/plan-recall';

        // const dataToSend = {
        //   days: localStorage.getItem('days'),
        //   companions: localStorage.getItem('companions'),
        //   style: localStorage.getItem('style'),
        //   location: localStorage.getItem('location'),
        //   startDate: localStorage.getItem('startDate'),
        //   endDate: localStorage.getItem('endDate'),
        //   selectedItinerary: JSON.parse(localStorage.getItem('selectedItinerary')) || []
        // };
  
        
  
        axios.post(apiUrl, this.lastScheduleId)
  
          .then(response => {
            this.itineraries = response.data.data; // 서버 응답에서 itineraries 배열 직접 할당
            console.log('SelfPlan3 Updated itineraries:', this.itineraries);
          })
          .catch(error => {
            console.error('Server transmission failure:', error);
          });
      },
  
    //   fetchItineraries() {
    //     axios.get('/api/plan-recall').then(response => {
    //       this.itineraries = response.data.itineraries; // 서버에서 받은 itineraries 배열 할당
    //       console.log('SelfPlan3 Fetched itineraries:', this.itineraries);
    //     }).catch(error => {
    //       console.error('Error fetching itineraries:', error);
    //     });
    //   },
  
   
  
      goToSelfPlan() {
  
      // 로컬 스토리지에 정보 저장
      localStorage.setItem('days', localStorage.getItem('days'));
      localStorage.setItem('companions', localStorage.getItem('companions'));
      localStorage.setItem('style', localStorage.getItem('style'));
      localStorage.setItem('location', localStorage.getItem('location'));
      
  
      this.$router.push({
      name: 'SelfPlan',
  
      query: {
      days: this.days,
      companions: this.companions,
      style: this.style,
      location: this.location
      }
      },
      console.log("SelfPlan", this.days,this.companions,this.style,location),
  
      );
      },
      
      savePlan() {
      const apiUrl = "http://192.168.0.78:3000/api/save-plan"; // API URL 설정
      const planData = {
        companions: localStorage.getItem('companions'),
        currentUser: this.currentUser,
        days: localStorage.getItem('days'),
        endDate: localStorage.getItem('endDate'),
        itineraries: this.itineraries,
        location: localStorage.getItem('location'),
        startDate: localStorage.getItem('startDate'),
        style: localStorage.getItem('style'),
      };
  
      console.log("Sending plan to server:", planData); // 로그 출력
  
      axios
        .post(apiUrl, planData)
        .then(response => {
          console.log("Plan saved successfully:", response.data); // 성공 로그
          alert("여행 일정이 성공적으로 저장되었습니다!"); // 사용자 알림
        })
        .catch(error => {
          console.error("Failed to save plan:", error); // 실패 로그
          alert("일정 저장에 실패하였습니다."); // 에러 알림
        });
    }
  
  
    } // 메서드 종료
  }
  </script>
  
  
  <style scoped>
.travel-planner {
  max-width: 1200px;
  margin: auto;
}

.content-layout {
  display: flex; /* Flexbox 활성화 */
  flex-direction: row; /* 자식 요소를 행으로 배치 */
}

.itinerary-container {
  flex: 1 1 60%; /* 유연한 너비 할당, 남는 공간의 60% 사용 */
  overflow-x: auto;
  padding: 10px;
}

.map-container {
  flex: 1 1 40%; /* 유연한 너비 할당, 남는 공간의 40% 사용 */
  padding-left: 20px; /* 왼쪽 여백 추가 */
  margin-bottom: 0; /* 하단 마진 제거 */
}

.attractions-list {
  display: flex;
  flex-direction: column;
}

.attraction-card {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.img-fluid {
  height: 150px;
  width: 100%;
  background-color: #fff;
  object-fit: cover;
}
</style>