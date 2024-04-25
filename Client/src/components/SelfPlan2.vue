<template>
  <div class="travel-planner container-fluid mt-5">
    <h1 class="text-center mb-4">SelfPlan2</h1>
<!-- 
    <div>
      <h1>선택된 일정 개수</h1>
      <p>전달받은 일정의 개수: {{ selectedItinerary.length }}</p>
      <div v-if="selectedItinerary.length > 0">
        <h2>일정 세부 사항</h2>
        <ul>
          <li v-for="(item, index) in selectedItinerary" :key="index">
            <h3>{{ item.title }}</h3>
            <p>주소: {{ item.addr1 }}</p>
            <p>contentid: {{ item.contentid }}</p>
          </li>
        </ul>
        <button @click="sendContentIds">일정 contentid 서버로 보내기</button>
      </div>
      <div v-else>
        <p>선택된 일정이 없습니다.</p>
      </div>
    </div> -->

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
                <button type="button" class="btn btn-outline-primary">상세보기</button>
                <button type="button" class="btn btn-outline-danger">좋아요</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="map-container">
        <!-- Map placeholder or integration -->
        <div style="background-color: #eee; width: 100%; height: 100%;">
          Map Goes Here
        </div>
        <button class="btn btn-primary">일정 저장하기</button>
        <button class="btn btn-secondary" @click="goToSelfPlan">여행일정 다시 생성</button>
        <button class="btn btn-primary">홈으로 돌아가기</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedItinerary: [],
      itineraries: [], // itineraries를 배열로 초기화

    };
  },

  mounted() {
    const storedData = localStorage.getItem('selectedItinerary');
    if (storedData) {
      this.selectedItinerary = JSON.parse(storedData);
    }
    console.log("받은 일정 데이터:", this.selectedItinerary);
    this.fetchItineraries();
    this.sendContentIds();


  },

  methods: {
    sendContentIds() {

      const apiUrl = 'http://localhost:3000/api/self-plan2';
      const dataToSend = {
        days: localStorage.getItem('days'),
        companions: localStorage.getItem('companions'),
        style: localStorage.getItem('style'),
        location: localStorage.getItem('location'),
        startDate: localStorage.getItem('startDate'),
        endDate: localStorage.getItem('endDate'),
        selectedItinerary: JSON.parse(localStorage.getItem('selectedItinerary')) || []
      };

      

      axios.post(apiUrl, dataToSend)

        .then(response => {
          this.itineraries = response.data.itineraries; // 서버 응답에서 itineraries 배열 직접 할당
          console.log('Updated itineraries:', this.itineraries);
        })
        .catch(error => {
          console.error('Server transmission failure:', error);
        });
    },

    fetchItineraries() {
      axios.get('/api/self-plan2').then(response => {
        this.itineraries = response.data.itineraries; // 서버에서 받은 itineraries 배열 할당
        console.log('Fetched itineraries:', this.itineraries);
      }).catch(error => {
        console.error('Error fetching itineraries:', error);
      });
    },

 

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
    
  }
}
</script>


<style scoped>
.travel-planner {
  max-width: 1200px;
  margin: auto;
}

.content-layout {
  display: flex; /* Flexbox를 활성화 */
  flex-direction: row; /* 자식 요소를 행으로 배치 */
}

.itinerary-container {
  flex: 1 1 60%; /* 유연한 너비 할당, 남는 공간의 60% 사용 */
  overflow-x: auto;
  padding: 10px;
}

.map-container {
  flex: 1 1 40%; /* 유연한 너비 할당, 남는 공간의 40% 사용 */
  height: 500px; /* 높이 설정 */
  padding-left: 20px; /* 왼쪽 여백 추가 */
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