<template>
  <div id="Notice-Area" class="bg-sky-blue" style="padding-left: 100px; padding-top:70px; padding-bottom: 100px;">
    <h1 class="text-center mb-4">Notice</h1>
    <div style="padding-top: 80px; padding-right:200px">
     
      <div style="display: flex; justify-content: space-between">
        <!-- Introduction Section -->
        <div class="col-lg-5">
          <div class="info-section">
            <h5 class="fs-8-bold text-gray mb-3">
              <i class="bi bi-calendar-heart"></i> CIELO PATH는 다양한 여행 일정을 제공해요.
            </h5>
            <p class="text-white-opacity">
              We offers a variety of travel schedules.
            </p><br><br>
            <h5 class="fs-8-bold text-gray mb-3">
              <i class="bi bi-calendar-heart"></i> CIELO PATH는 지속적으로 업데이트하고 있어요.
            </h5>
            <p class="text-white-opacity">
              We are continuously being updated.
            </p>
          </div>
        </div>
        <!-- Accordion Section -->
        <div class="col-lg-6">
          <div class="accordion" id="accordionExample">
            <div class="accordion-item" v-for="item in accordionItems" :key="item.id">
              <h2 class="accordion-header" :id="`heading${item.id}`">
                <button class="accordion-button" 
                        type="button" data-bs-toggle="collapse" 
                        :data-bs-target="`#collapse${item.id}`"
                        :aria-expanded="item.open.toString()" 
                        :aria-controls="`collapse${item.id}`" 
                        @click="toggleAccordion(item.id)">
                  {{ item.title }}
                </button>
              </h2>
              <div :id="`collapse${item.id}`" 
                   class="accordion-collapse collapse" 
                   :class="{ show: item.open }" 
                   data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  {{ item.content }}
                </div>
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
  name: "NoticeArea",
  mounted() {
    this.fetchNotices();
  },
  data() {
    return {
      accordionItems: [] 
    };
  },
  methods: {
    // 서버로부터 유효한 공지사항 데이터를 가져오는 메서드
    fetchNotices() {
  axios.get('http://192.168.0.78:3000/api/notice?valid=1') 
    .then(response => {
      const validNotices = response.data.filter(item => item.valid === 1);
      const sortedData = validNotices.sort((a, b) => new Date(b.writeDate) - new Date(a.writeDate));
      this.accordionItems = sortedData.map((item, index) => ({
        id: `collapse${item.postId}`,
        title: item.title,
        content: item.content,
        open: index == 0
      }));
    })
    .catch(error => {
      console.error("Error fetching notices:", error);
    });
},

toggleAccordion(id) {
      this.accordionItems.forEach(item => {
        if (item.id === id) {
          item.open = !item.open;
        } else {
          item.open = false; // 다른 항목들은 닫기
        }
      });
    }
  }
}
</script>

<style>
.bg-sky-blue {
  background-color: rgb(188, 211, 255, 0.7); /* Light sky blue background for highlighted sections */
}

.accordion-button:not(.collapsed) {
  background-color: #c1e9fdd6; /* Lighter blue when the accordion button is active */
}

.container {
  min-height: 50vh; 
  margin-left:0px;
  margin-right:0px;
  padding-left:0px;
  padding-right:0px;
}

.text-white-opacity {
  color: rgb(53, 53, 53);
  opacity: 0.65;
  font-size: 20px; /* Adjust font size for readability */
}

.fs-8-bold {
  font-size: 25px; /* Increase font size for headings */
  font-weight: bold; /* Ensure headings are bold */
}

.info-section {
  width: 40vw;
  /* margin-right: 0px; /* Increase margin for better spacing */
  /* margin-left: 0px; Shift the text further to the left */ 
}


.accordion-button {
  border-radius: 0;
}
</style>
