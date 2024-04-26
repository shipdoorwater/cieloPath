<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">1:1문의 남기기</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label class="col-form-label">제목</label>
              <input type="text" class="form-control" v-model="inquiry.title" />
            </div>
            <div class="mb-3">
              <label class="col-form-label">내용</label>
              <textarea
                class="form-control"
                v-model="inquiry.contents"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            닫기
          </button>
          <button type="button" class="btn btn-primary" @click="sendInquiry()">
            확인
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";
import { Modal } from "bootstrap";

export default {
  name: "QandAModal",
  data() {
    return {
      inquiry: {
        title: "",
        contents: "",
        nickname: ""
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      const myModalElement = document.getElementById("exampleModal");
      if (myModalElement) {
        const myModal = new Modal(myModalElement, {
          keyboard: false,
        });
        myModal.show();
      } else {
        console.error("Modal element not found");
      }
    });
  },
  computed: {
    ...mapGetters([
      "currentUser", // 스토어에서 currentUser를 가져옴
    ]),
  },
  methods: {
    closeModal() {
      const modalElement = document.getElementById("exampleModal");
      if (modalElement) {
        const modalInstance = Modal.getInstance(modalElement);
        if (modalInstance) {
          modalInstance.hide();
        } else {
          console.error("No instance found for modal");
        }
      } else {
        console.error("Modal element not found");
      }
    },
    sendInquiry() {
      // 서버로 데이터 전송
      const postData = {
        title: this.inquiry.title,
        content: this.inquiry.contents,
        writer: this.currentUser.nickname  // 사용자 이름 또는 ID 추가
      };
      axios
        .post("http://192.168.0.78:3000/api/qna/write", postData)
        .then((response) => {
          console.log("Inquiry sent successfully:", response);
          this.$store.dispatch('fetchItems');
          this.closeModal();
          console.log(postData);
        })
        .catch((error) => {
          console.error("Error sending inquiry:", error);
        });
    },
  },
};
</script>
<style>
.container {
  max-width: 1200px;
  margin: auto;
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
  /* z-index: 100; */
}
.modal-dialog {
  width: auto;
}
.modal-content {
  position: relative;
  padding: 20px;
  animation: fadeIn 0.5s;
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
</style>
