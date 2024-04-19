<template>
    <div>
      <h1>detailCommon1</h1>
      <span>contentid 입력: </span>
      <input type="text" v-model="contentid"><br>
      <button @click="fetchData">데이터 가져오기</button>
  
      <ul>
        <li v-for="item in items" :key="item.contentid">
          <h2>title: {{ item.title }}</h2>
          <p>add: {{ item.addr1 }} {{ item.addr2 }}</p>
          <img :src="item.firstimage" alt="이미지">
          <img :src="item.firstimage2" alt="이미지2">
          <p>contentid: {{ item.contentid }}</p>
          <p>contenttypeid: {{ item.contenttypeid }}</p>
          <p>createdtime: {{ item.createdtime }}</p>
          <p>homepage: {{ item.homepage }}</p>
          <p>modifiedtime: {{ item.modifiedtime }}</p>
          <p>overview: {{ item.overview }}</p>
          <p>tel: {{ item.tel }}</p>
          <p>telname: {{ item.telname }}</p>
          <p>zipcode: {{ item.zipcode }}</p>
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
        contentid: '297989', // contentId 입력을 위한 데이터 속성 추가
        items: [], // API에서 가져온 데이터를 저장할 배열
      }
    },
    created() {
      this.fetchData(); // 컴포넌트가 생성되자마자 fetchData 메서드를 호출
    },
    methods: {
      fetchData() {
        const apiUrl = 'http://apis.data.go.kr/B551011/KorService1/detailCommon1';
        const params = {
          serviceKey: 'SCiS2QeHSZaBzcfs5i8o7BsdxWGp6WTXKdMeOwlZuTwcQzL2bm0BR57M5AxQwIei0Of96djoM3KobZh5Gq1uLA==', // API 키
          MobileOS: 'ETC', // 필요한 파라미터
          MobileApp: 'WebTest', // 필요한 파라미터
          contentId: this.contentid, // v-model에 바인딩된 contentid 사용
          defaultYN: 'Y',
          addrinfoYN: 'Y',
          overviewYN: 'Y',
          _type: 'json'
        };
  
        axios.get(apiUrl, { params: params })
          .then(response => {
            this.items = response.data.response.body.items.item; // 응답에서 데이터를 추출하여 items 배열에 저장
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
  