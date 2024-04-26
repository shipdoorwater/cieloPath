<template>
  <NavBar></NavBar>
  <div class="post-details">
    <div>글번호 : {{ postId }}</div>
  <div>제목 : {{ postDetails.title }}</div>
  <div>글쓴이: {{ postDetails.writerId }}</div>
  <div>작성일시: {{ formatDate(postDetails.writeDate) }}</div>
  <div>내용 : {{ postDetails.content }}</div>
  <div>댓글 : {{ postDetails.REPLCONTENT }}</div>
  <div v-if="isAdmin">
    <input type="text" v-model="repl" placeholder="댓글 입력">
    <button @click="submitReply">댓글작성</button>
  </div>
  </div>
  
</template>

<script>
import axios from "axios";
import NavBar from "./NavBar.vue";
import { mapGetters } from "vuex";

export default {
  name: "QandADetailPage",
  data() {
    return {
      postId: "",
      postDetails: {},
      repl: ""
    };
  },
  components: {
    NavBar
  },
  computed: {
    ...mapGetters(['currentUser','isAdmin']),
    userId() {
      return this.currentUser ? this.currentUser.email : null;  // currentUser가 있을 경우 email을 사용합니다.
    }
  },

  mounted() {
    this.fetchPost(); // 컴포넌트가 마운트될 때 해당 게시글의 정보를 서버로부터 받아옴
  },
  methods: {
    fetchPost() {
      const postId = this.$route.params.postId;
      this.postId = postId;
      axios
        .get(`http://192.168.0.78:3000/api/qandadetailpage/${postId}`)
        .then((response) => {
          this.postDetails = response.data[0]; // 서버로부터 받은 게시글 데이터를 postDetails에 할당
          console.log("Post details fetched:", this.postDetails);
        })
        .catch((error) => {
          console.error("Error fetching post details:", error);
        });
    },
    formatDate(value) {
      if (!value) return "";
      return new Date(value).toLocaleString();
    },
    submitReply() {
      const replData = {
        replid: this.userId,
        replcontent: this.repl,
        postId: this.postId
      };
      axios.post(`http://192.168.0.78:3000/api/qandadetailpage/${this.postId}/repl`, replData)
        .then(response => {
          console.log("Reply submitted:", response);
          alert('댓글이 성공적으로 등록되었습니다.');
          // this.replContent = ''; // 댓글 입력 필드 초기화
          this.$router.push('/qanda');

        })
        .catch(error => {
          console.error("Error submitting reply:", error);
          alert('댓글 등록에 실패했습니다.');
        });
    }
  },
};
</script>

<style>

.post-details {
  
  max-width: 800px;
  margin: 0 auto;
  margin-top: 100px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  text-align: left;
}

.post-details div {
  margin-bottom: 10px;
}

.post-details input[type="text"] {
  width: calc(100% - 80px);
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.post-details button {
  padding: 8px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.post-details button:hover {
  background-color: #0056b3;
}
</style>

