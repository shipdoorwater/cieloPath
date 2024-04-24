<template>
    <h1 class="text-center mb-4">여행일정 만들기</h1>
    <div class="main-container">

      <div class="grid-container">
        <div class="grid-item" v-for="(group, index) in groupedItineraries" :key="index">
          <div class="grid-title">{{ group.title }}</div>
          <div class="grid-content">
            <ul>
              <li v-for="(item, subIndex) in group.items" :key="subIndex">
                <img :src="item.firstimage || 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1 1\'/%3E'" alt="Image of {{ item.title }}" class="img-fluid" style="width: 150px;">
                <p>{{ item.title }}</p>
                <p>{{ item.addr1 }}</p>
                <button @click="viewDetails(item)">상세 정보</button>
                <button @click="addToSchedule(item)">일정 추가</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="selected-itinerary">
        <h2>선택된 일정</h2>
        
        <div v-for="(item, index) in selectedItinerary" :key="`selected-${index}`">
          <p>{{ item.title }} <button @click="removeFromSchedule(index)">삭제</button></p>
        </div>
        <button @click="createCieloPlan">선택한 일정으로 Cielo만들기</button>
      </div>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  
  
  export default {
    computed: {
      days() {
        return this.$route.query.days;
      },
      companions() {
        return this.$route.query.companions;
      },
      style() {
        return this.$route.query.style;
      },
      location() {
        return this.$route.query.location;
      },
      groupedItineraries() {
        const grouped = [
          { title: '관광지', items: [] },
          { title: '문화예술', items: [] },
          { title: '레포츠', items: [] },
          { title: '식당', items: [] }
        ];
        this.itineraries.forEach(item => {
          if (item.contenttypeid === '12') {
            grouped[0].items.push(item);
          } else if (item.contenttypeid === '14') {
            grouped[1].items.push(item);
          } else if (item.contenttypeid === '28') {
            grouped[2].items.push(item);
          } else if (item.contenttypeid === '39') {
            grouped[3].items.push(item);
          }
        });
        return grouped;
      }
    },
    data() {
      return {
        itineraries: [],
        selectedItinerary: [],
        selectedItineraryText: '',


      };
    },
    methods: {
      sendPlan() {
        // 서버에 보내는거야.
        const apiUrl = 'http://localhost:3000/api/self-plan';
        const data = {
          days: this.days,
          companions: this.companions,
          style: this.style,
          location: this.location
        };
  
        axios.post(apiUrl, data)
          .then(response => {
            this.itineraries = response.data.data;
            console.log('서버 응답:', response.data);
            console.log('서버 응답:', this.itineraries);
            // alert('데이터 전송 성공');
          })
          .catch(error => {
            console.error('전송 실패:', error);
            alert('데이터 전송에 실패했습니다');
          });
      },
      viewDetails() {
        // 상세 정보를 보여주는 로직 추가
      },
      addToSchedule(item) {
        this.selectedItinerary.push(item);
        this.updateSelectedItineraryText();
        console.log(this.selectedItinerary)
      },
      removeFromSchedule(index) {
        this.selectedItinerary.splice(index, 1);
        this.updateSelectedItineraryText();
      },
      updateSelectedItineraryText() {
        this.selectedItineraryText = this.selectedItinerary.map(item => item.title).join('\n');
      },


      // 아래 로직으로 SelfPlan2에 데이터 로컬 데이터로 송부
    createCieloPlan() {
    if (this.selectedItinerary.length === 0) {
      console.warn("전송할 일정이 없습니다.");
      return;
    }
    // 로컬 스토리지에 일정 저장
    localStorage.setItem('selectedItinerary', JSON.stringify(this.selectedItinerary));
    this.$router.push({ name: 'SelfPlan2' });
  }

    },
    mounted() {
        this.sendPlan();
    },



   
}




  </script>
  

  <style>
.main-container {
  display: flex;
  justify-content: space-between;
}

.plan-details {
  width: 25%;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 70%;
}

.grid-item {
  padding: 0px;
  text-align: center;
  border: 1px solid black;
}

.grid-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.grid-content {
  margin-bottom: 10px;
}

.selected-itinerary {
  width: 30%;
  border: 1px solid black;
  padding: 10px;
}
</style>