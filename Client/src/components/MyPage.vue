<template>
  <div class="schedule-container">
      <h1>Schedule Review</h1>
      <button @click="fetchSchedule">Load Schedule</button>
      <h2>Schedules</h2>
      <table class="schedule-table">
          <thead>
              <tr>
                  <th>여행ID</th>
                  <th>UserID</th>
                  <th>지역</th>
                  <th>출발일</th>
                  <th>도착일</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="schedule in schedules" :key="schedule.SCHEDULEID" 
                  class="schedule-item" @dblclick="sendScheduleId(schedule.SCHEDULEID)">
                  <td>{{ schedule.SCHEDULEID }}</td>
                  <td>{{ schedule.USEREID }}</td>
                  <td>{{ schedule.REGIONID }}</td>
                  <td>{{ formatDate(schedule.STARTDAY) }}</td>
                  <td>{{ formatDate(schedule.ENDDAY) }}</td>
              </tr>
          </tbody>
      </table>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'ScheduleReview',
  data() {
    return {
      schedules: [],
      lastScheduleId: null,
    };
  },
  methods: {
    fetchSchedule() {
      axios.post('http://192.168.0.78:3000/api/plan-review', { userID: 9999999 })
        .then(results => {
          if (results.data && Array.isArray(results.data.data)) {
            this.schedules = results.data.data;

          } else {
            console.error('Invalid data format:', results.data);
            alert('Failed to load schedules due to data format issues.');
          }
        })
        .catch(error => {
          console.error('Error fetching schedules:', error);
          alert('An error occurred while fetching schedules.');
        });
    },

    sendScheduleId(scheduleId) {
    console.log('Sending Schedule ID:', scheduleId);
    localStorage.setItem('lastScheduleId', scheduleId);
    console.log('lastScheduleId', scheduleId);
    this.$router.push({ name: 'SelfPlan3' });
},

    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString('ko-KR');  // 한국어 형식 (년/월/일)
    }
  },// 메서드 종료



}

  
  </script>

<style scoped>
.schedule-container {
  width: 90%; /* 너비 조정 */
  margin: 20px auto; /* 상하 여백 추가 및 중앙 정렬 */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.schedule-table {
  width: 100%; /* 테이블 너비 전체 사용 */
  border-collapse: separate; /* 셀 간격을 조정하기 위해 병합 해제 */
  border-spacing: 12px 8px; /* 열과 행의 간격 조정 */
}

.modal {
  z-index: -1;
}
.modal-backdrop {
position: fixed;
top: 0;
left: 0;
width: 100vw;
height: 100vh;
background-color: rgba(0,0,0,0.5);
}

.schedule-table th, .schedule-table td {
  border: 1px solid #ccc; /* 경계선 스타일 */
  padding: 12px 20px; /* 셀 내부 패딩 조정 */
  text-align: left; /* 텍스트 왼쪽 정렬 */
}

.schedule-item:hover {
  background-color: #f5f5f5; /* 호버 효과 */
}

thead {
  background-color: #eee; /* 헤드 배경색 */
}
</style>