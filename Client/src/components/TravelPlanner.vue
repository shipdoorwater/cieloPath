<template>
  <div class="travel-planner container-fluid mt-5">
    <h1 class="text-center mb-4">TravelPlanner</h1>
    
    <div class="d-flex">
      <div class="itinerary-container flex-grow-1">
        <div class="d-flex justify-content-around mb-3">
          <div
            v-for="(day, index) in itineraries"
            :key="index"
            class="day-container"
          >
            <h2>{{ index + 1 }}일차</h2>
            <div class="attractions-list">
              <div
                v-for="attraction in day"
                :key="attraction.contentid"
                class="attraction-card mb-2"
              >
                <h5 class="card-title">{{ attraction.title }}</h5>
                <img
                  :src="
                    attraction.firstimage ||
                    'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1 1\'/%3E'
                  "
                  alt="Image of {{ attraction.title }}"
                  class="img-fluid"
                />
                <p class="card-text">{{ attraction.addr1 }}</p>
                <!-- 버튼 추가 -->
                <button type="button" class="btn btn-outline-primary">
                  상세보기
                </button>
                <button type="button" class="btn btn-outline-danger">
                  좋아요
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="map-container flex-grow-1" style="height: 500px">
        <!-- Map placeholder or integration -->
        <div style="background-color: #eee; width: 100%; height: 100%">
          Map Goes Here
        </div>
        <button class="btn btn-primary">일정 저장하기</button>
        <button class="btn btn-secondary" @click="goToSelfPlan">여행일정 직접 만들기</button>
      
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "TravelPlanner",
  data() {
    return {
      days: 0,
      companions: '',
      style: '',
      location: '',
      startDate: '', // startDate 추가
      endDate: '', // endDate 추가
      itineraries: [],
      travelInfo: {},
      currentUser: "",
    };
  },
  computed: {
    ...mapState(["user", "token"]), // `user`와 `token` 상태를 매핑
    getUser() {
      return this.user; // 토큰 존재 여부로 인증 상태 결정
    },
  },
  methods: {
    submitPlan() {
      const apiUrl = "http://localhost:3000/api/send-plan";
      const params = {
        days: this.days,
        companions: this.companions,
        style: this.style,
        location: this.location,
        currentUser: this.currentUser
      };

      // 요청이 서버로 전송되기 전에 로그를 찍습니다.
      console.log("Sending request to server with params:", params);

      axios
        .post(apiUrl, params)
        .then((response) => {
          // 서버에서 응답을 받으면 데이터와 함께 로그를 찍습니다.
          this.itineraries = response.data.data;
          console.log("Received response from server:", response.data);
        })
        .catch((error) => {
          // 에러 발생 시, 에러 로그를 찍습니다.
          console.error("Error sending data to server:", error);
        });
    },
    goToSelfPlan() {
      // 로컬 스토리지에 정보 저장
      localStorage.setItem("days", this.days);
      localStorage.setItem("companions", this.companions);
      localStorage.setItem("style", this.style);
      localStorage.setItem("location", this.location);
      console.log(
        "Navigating to SelfPlan with",
        this.days,
        this.companions,
        this.style,
        this.location
      );

          // 로컬 스토리지에 정보 저장
    localStorage.setItem('days', this.days);
    localStorage.setItem('companions', this.companions);
    localStorage.setItem('style', this.style);
    localStorage.setItem('location', this.location);
    localStorage.setItem('startDate', this.startDate);
    localStorage.setItem('endDate', this.endDate);
    
    console.log("Navigating to SelfPlan 1", this.days, this.companions, this.style, this.location,this.startDate, this.endDate);


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

    calculateDays(startDate, endDate) {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      console.error("Invalid date format");
      return 0;
    }
    // 밀리초 차이를 일수로 변환
    const diffTime = Math.abs(end - start);
    console.error("diffTime: ", diffTime);
    // 보정을 추가: UTC 시간을 기준으로 계산하여 시간대 영향을 최소화합니다.
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    this.startDate = startDate;
    this.endDate= endDate;


    return diffDays;
  }
  },
  created() {
    
    if (this.$route.query) {
      this.travelInfo = this.$route.query;
      this.companions = this.travelInfo.companion || "정보 없음";
      this.style = this.travelInfo.travelStyle || "정보 없음";
      this.location = this.travelInfo.whereToGo || "정보 없음";

      if (this.travelInfo.startDate && this.travelInfo.endDate) {
        this.days =
          this.calculateDays(
            this.travelInfo.startDate,
            this.travelInfo.endDate
          ) + 1;
        console.error("this.days: ", this.days);
      }
      console.log("Received travelInfo:", this.travelInfo);
      console.log("submit횟수");
      this.submitPlan();
    } else {
      console.error("No travel info received");
    }
  },
};
</script>

<style scoped>
.travel-planner {
  max-width: 1200px;
  margin: auto;
}

.itinerary-container {
  overflow-x: auto;
  padding: 10px;
}

.day-container {
  width: 300px;
  margin-right: 20px;
  background-color: #f8f9fa; /* 통일된 배경색 */
  border: 1px solid #dee2e6; /* 경계선 추가 */
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
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
  width: 100%; /* 이미지 너비 조정 */
  background-color: #fff;
  object-fit: cover;
}

.map-container {
  width: 50%;
}
</style>
