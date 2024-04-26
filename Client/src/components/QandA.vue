<template>
  <NavBar class="fixed-top"></NavBar>
  <div style="background-color: white;" class="container">
    <br><br><br><br><br>
    <h1 >
      CIELO PATH에 대해<br />
      궁금한 점이 있다면 무엇이든 말씀해주세요.
    </h1>
    <br />
    <button @click="changeShowmodal()">
      글&nbsp;쓰&nbsp;기
    </button>
    <br /><br /><br />
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col" style="background-color: beige; width: 100px;">NO</th>
            <th scope="col" style="background-color: beige; width: 300px;">제목</th>
            <th scope="col" style="background-color: beige; width: 300px;">글쓴이</th>
            <th scope="col" style="background-color: beige; width: 300px;">작성일시</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in items"
            :key="item.postId"
            @dblclick="goToDetail(item.postId)"
          >
            <th scope="row">{{ item.postId }}</th>
            <td>{{ item.title }}</td>
            <td>{{ item.writerId }}</td>
            <td>{{ formatDate(item.writeDate) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <br />
    
    <div class="btn-group me-2" role="group" aria-label="First group">
      <button type="button" class="btn btn-outline-secondary">1</button>
      <button type="button" class="btn btn-outline-secondary">2</button>
      <button type="button" class="btn btn-outline-secondary">3</button>
    </div>
  </div>
  <!-- Writing Modal -->
  <div v-if="showModal">
    <QandAModal></QandAModal>
  </div>
      

</template>
<script>
// import axios from "axios";
import QandAModal from '@/components/QandAModal.vue';
import NavBar from "@/components/NavBar.vue";

export default {
  name: "QandA",
  data() {
    
    return {
      showModal: false,
      inquiry: {
        title: "",
        contents: "",
      }
    };
  },
  components: {
    QandAModal,
    NavBar
  },
  mounted() {
    this.$store.dispatch('fetchItems');  // 스토어의 fetchItems 액션 호출
  },

  computed: {
    items() {
      return this.$store.state.qandaPosts;  // 스토어의 qandaPosts 상태 접근
    }
  },
  methods: {
    formatDate(value) {
        if (!value) return '';
        return new Date(value).toLocaleString();
      },

    changeShowmodal() {
      this.showModal = !this.showModal; // 모달 창 여닫기
      console.log(this.showModal);
    },
    goToDetail(postId) {
      this.$router.push({ name: "QandADetailPage", params: { postId } });

    }
  },
};
</script>
<style>
.container {
  max-width: 1200px;
  margin-top: 200px;
  align-items: center;
  text-align: center;
}
.modal {
  display: none;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50; 
}
.modal-dialog {
  width: auto;
}
.modal-content {
  position: relative;
  padding: 20px;
  animation: fadeIn 0.5s;
  /* background-color: rgba(0, 0, 0, 0.5);  */
}
.close {
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
  border: none;
  background: none;
  color: black;
  font-size: 1.5rem;
}
div.table-responsive {
  padding-left: 0px;
  padding-right: 0px;
  display: inline-block; /* 인라인 블록 요소로 설정하여 중앙 정렬 적용 */
}
.fixed-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
</style>
