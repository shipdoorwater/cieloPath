<template>
  <NavBar class="fixed-top"></NavBar><br><br><br><br><br>
    <h1 class="text-center mb-4">Plan My Journey</h1>
    <div class="selected-itinerary"><br><br><br><br>
        <br><br><br>
        <div v-for="(item, index) in selectedItinerary" :key="`selected-${index}`">
          <img :src="item.firstimage || 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1 1\'/%3E'" alt="Image of {{ item.title }}" style="width: 200px; border-radius: 5px; height: 150px;" class="img-fluid">
          <!-- <i class="bi bi-bookmark-dash-fill" @click="removeFromSchedule(index)" style="position: absolute; top: 0; right: 0; font-size: 2.0rem; color: rgb(204, 222, 255);"></i> -->
          <i class="bi bi-caret-right-fill" style="font-size: 2.0rem; color: gray; margin-left: 30px; margin-right: 30px;"></i>

          <div>{{ item.title }} &nbsp;
            <button style="border:none; text-decoration: underline; background-color: rgb(207, 228, 255);" @click="removeFromSchedule(index)">삭제</button></div>
        </div>
     
      </div><br>
      <button style="font-size: 20px; width: 200px; height:50px; border-radius: 30px; border:none; background-color:  rgb(204, 222, 255);" @click="createCieloPlan">일정생성</button>
    <br><br><div class="main-container">

      <div class="grid-container">
        <div style="font-size: 20px;" class="grid-item" v-for="(group, index) in groupedItineraries" :key="index"><br>
          <div class="grid-title">{{ group.title }}</div>
          <div class="grid-content">
            
  <ul v-for="(item, subIndex) in group.items" :key="subIndex"><br>
    <div style="position: relative; display: inline-block;">
      <img :src="item.firstimage || 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1 1\'/%3E'" alt="Image of {{ item.title }}" style="width: 200px; border-radius: 5px; height: 150px;" class="img-fluid">
      <i class="bi bi-bookmark-plus-fill" @click="addToSchedule(item)" style="position: absolute; top: 0; right: 0; font-size: 2.0em; color: rgb(204, 222, 255);"></i>
    </div>
    <br>
    <span style="font-size: 18px;">{{ item.title }}&nbsp;<i style=" font-size: 1.3rem; color: red;" class="bi bi-heart-fill" @click="likesSpot(item)"></i></span><br>
    <span style="font-size: 13px;">{{ item.addr1 }}</span><br>
    <!-- <button @click="viewDetails(item)">상세 정보</button> -->
  
</ul>

          </div>
        </div>
      </div>
      
     
    </div>
  </template>  
  
  <script>
  import NavBar from './NavBar.vue';
  import axios from 'axios';  
  
  export default {
    components: {
      NavBar
    },
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
        const apiUrl = 'http://192.168.0.78:3000/api/self-plan';
        const data = {
          days: localStorage.getItem('days'),
          companions: localStorage.getItem('companions'),
          style: localStorage.getItem('style'),
          location: localStorage.getItem('location'),
          startDate: localStorage.getItem('startDate'),
          endDate: localStorage.getItem('endDate'),
          
          
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

      likesSpot(item) {
    axios.post('http://192.168.0.78:3000/api/localtourplaces/like', { title: item.title })
      .then(response => {
        console.log(item);
        console.log(item.title);
        console.log('Like updated!', response);
        alert('좋아요 ♥ ')
        // 필요하다면 클라이언트 측 상태를 업데이트
      })
      .catch(error => {
        console.error('Error updating like:', error);
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
  justify-content: center;  /* 중앙 정렬 */
  align-items: center;      /* 세로 방향 중앙 정렬 */
  height: 150vh;            /* 뷰포트 높이에 맞춤, 필요에 따라 조정 가능 */
  
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
  border: none;
  background-color: rgb(238, 238, 238);
}

.grid-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.grid-content {
  margin-bottom: 10px;
}


.selected-itinerary {
  display: flex;            /* 플렉스박스 레이아웃 적용 */
  flex-wrap: wrap;          /* 내용이 넘치면 다음 줄로 넘김 */
  justify-content: center;  /* 가로 방향 중앙 정렬 */
  align-items: center;      /* 세로 방향 중앙 정렬 */
  width: 100%;              /* 너비를 100%로 설정하여 부모 요소의 전체 너비 사용 */
  border: none;
  background-color: rgb(207, 228, 255);
  padding: 10px;
 
}

.item-container {
  display: flex;            /* 플렉스박스 레이아웃 적용 */
  flex-direction: column;   /* 아이템을 세로로 나열 */
  align-items: center;      /* 세로 방향 중앙 정렬 */
  width: 200px;             /* 각 아이템 컨테이너의 너비 */
  margin: 10px;              /* 주변 간격 추가 */
}
.fixed-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
</style>