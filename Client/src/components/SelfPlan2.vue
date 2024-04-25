<template>
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
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedItinerary: []
    };
  },// data 종료


  mounted() {
    // 로컬 스토리지에서 데이터 불러오기
    const storedData = localStorage.getItem('selectedItinerary');
    if (storedData) {
      this.selectedItinerary = JSON.parse(storedData);
    }
    console.log("받은 일정 데이터:", this.selectedItinerary);
  },// mounted 종료

  
  methods: {
    // sendContentIds() {
    //   // 모든 contentid를 배열로 추출
    //   const contentIds = this.selectedItinerary.map(item => item.contentid);
    //   console.log('contentIds:', contentIds);
    //   // 서버로 POST 요청 보내기
    //   axios.post('http://localhost:3000/api/api/self-plan2', { contentIds })
    //     .then(response => {
    //       console.log('서버 응답:', response.data);
    //     })
    //     .catch(error => {
    //       console.error('서버 전송 실패:', error);
    //     });
    // }

    sendContentIds() {
        // 서버에 보내는거야.
        const apiUrl = 'http://192.168.0.78:3000/api/self-plan2';
            // 로컬 스토리지에서 데이터 읽기
    const days = localStorage.getItem('days');
    const companions = localStorage.getItem('companions');
    const style = localStorage.getItem('style');
    const location = localStorage.getItem('location');
    const selectedItinerary = JSON.parse(localStorage.getItem('selectedItinerary')) || [];

    // 서버에 전송할 데이터 객체 생성
    const dataToSend = {
      days,
      companions,
      style,
      location,
      selectedItinerary
    };
    console.log('dataToSend:', dataToSend);
    console.log("Sending all data to server:", dataToSend);
  
        axios.post(apiUrl, dataToSend)
        .then(response => {
        console.log('서버 응답:', response.data);
      })
      .catch(error => {
        console.error('서버 전송 실패:', error);
      });
      },


  },


 


}



// axios.post(apiUrl, data)
//           .then(response => {
//             this.itineraries = response.data.data;
//             console.log('서버 응답:', response.data);
//             console.log('서버 응답:', this.itineraries);
//             // alert('데이터 전송 성공');
//           })
//           .catch(error => {
//             console.error('전송 실패:', error);
//             alert('데이터 전송에 실패했습니다');
//           });

</script>


