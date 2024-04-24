<template>
  <div style="background-color: white" class="container">
    <br><br><br>
    <h1>
      CIELO PATH에 대해<br />
      궁금한 점이 있다면 무엇이든 말씀해주세요.
    </h1>
    <br /><br /><br />
    <button @click="changeShowmodal()">
      글&nbsp;쓰&nbsp;기
    </button>
    <br /><br /><br />
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">NO</th>
            <th scope="col">제목</th>
            <th scope="col">글쓴이</th>
            <th scope="col">작성일</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in items"
            :key="item.id"
            @dblclick="goToDetail(item.id)"
          >
            <th scope="row">{{ item.postId }}</th>
            <td>{{ item.title }}</td>
            <td>{{ item.writer }}</td>
            <td>{{ item.date }}</td>
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
import { mapGetters } from "vuex";
import axios from "axios";
import QandAModal from '@/components/QandAModal.vue';

export default {
  name: "QandA",
  data() {
    
    return {
      showModal: false,
      inquiry: {
        title: "",
        contents: "",
      },
      items: [],
    };
  },
  components: {
    QandAModal
  },
  mounted() {
    this.fetchItems();
  },

  computed: {
    ...mapGetters([
      "user" // 스토어에서 currentUser를 가져옴
    ])
  },
  methods: {
    fetchItems() {
      //데이터 가져오기
      axios
        .get("http://localhost:3000/api/qna")
        .then((response) => {
          this.items = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.error("Failed to fetch items:", error);
        });
    },

    changeShowmodal() {
      this.showModal = !this.showModal; // 모달 창 여닫기
      console.log(this.showModal);
    },
    goToDetail(id) {
      this.$router.push({ name: "DetailPage", params: { id } });
    }
  },
};
</script>
<style>
.container {
  max-width: 1200px;
  margin: auto;
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
  z-index: 100; 
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
.table-responsive {
  padding: 0 15px;
}
</style>
