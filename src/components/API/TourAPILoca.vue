<template>
    <div>
      <h1>API 데이터 가져오기</h1>
      <p>이미지 없음</p>
      <ul>
        <li v-for="item in items" :key="item.contentid">
          <h2>title:{{ item.title }}</h2>
          <p>add:{{ item.addr1 }} {{ item.addr2 }}</p>
          <img :src="item.firstimage" alt="이미지">
          <img :src="item.firstimage2" alt="이미지2">
          <p>contentid: {{ item.contentid }}</p>
          <p>contenttypeid: {{ item.contenttypeid }}</p>
          <p>cpyrhtDivCd: {{ item.cpyrhtDivCd }}</p>
          <p>createdtime: {{ item.createdtime }}</p>
          <p>mapx: {{ item.mapx }}</p>
          <p>mapy: {{ item.mapy }}</p>
          <p>mlevel: {{ item.mlevel }}</p>
          <p>modifiedtime: {{ item.modifiedtime }}</p>
          <p>sigungucode: {{ item.sigungucode }}</p>
          <p>tel: {{ item.tel }}</p>
          <p>Category: {{ item.cat1 }} > {{ item.cat2 }} > {{ item.cat3 }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ApiDataComponent',
    data() {
      return {
        items: [], // API에서 가져온 데이터를 저장할 배열
      }
    },
    created() {
      this.fetchData(); // 컴포넌트가 생성되자마자 fetchData 메서드를 호출
    },
    methods: {
      
      fetchData() {
        // API 요청 URL 준비
        const apiUrl = 'http://apis.data.go.kr/B551011/KorService1/areaBasedList1';
        const params = {
          serviceKey: 'SCiS2QeHSZaBzcfs5i8o7BsdxWGp6WTXKdMeOwlZuTwcQzL2bm0BR57M5AxQwIei0Of96djoM3KobZh5Gq1uLA==', // API 키
          numOfRows: 100,
          MobileOS: 'WIN', // 필요한 파라미터
          MobileApp: '씨엘로', // 필요한 파라미터    
          contentTypeId: 15,
          // 관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점) ID
          _type: 'json'
         
          // 추가 파라미터
        };
  
        // Axios를 사용해 API 호출
        axios.get(apiUrl, { params })
          .then(response => {
            // console.log('api response');
            console.log(response);
  
            // console.log(response);
            // console.log(response.data);
            console.log('============');
            this.items = response.data.response.body.items.item;   // 응답에서 데이터를 추출하여 items 배열에 저장
            console.log(response.data.response.body.items.item);
            console.log(this.items); // 콘솔에 로드된 데이터 로그
            console.log('end');
          })
          .catch(error => {
            console.error('API 호출 에러:', error); // 에러 로그
          });
      }
    }
  }
  </script>
  
  <style>
  /* 필요한 스타일 작성 */
  </style>