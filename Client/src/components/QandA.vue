<template>
  <div style="background-color: white;" class="container">
    <h1>CIELO PATH에 대해<br> 궁금한 점이 있다면 무엇이든 말씀해주세요.</h1><br><br><br>
    <button type="button" class="btn btn-primary" style="width:120px; background-color: beige; color: black; border: none" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">글&nbsp;쓰&nbsp;기</button>
    <br><br><br>
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
          <tr v-for="item in items" :key="item.id" @dblclick="goToDetail(item.id)">
            <th scope="row">{{ item.id }}</th>
            <td>{{ item.title }}</td>
            <td>{{ item.writer }}</td>
            <td>{{ item.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <br>
    <!-- Writing Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">1:1문의 남기기</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label class="col-form-label">제목</label>
            <input type="text" class="form-control" id="title">
          </div>
          <div class="mb-3">
            <label class="col-form-label">내용</label>
            <textarea class="form-control" id="contents"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
        <button type="button" class="btn btn-primary">확인</button>
      </div>
    </div>
  </div>
</div>
    <div class="btn-group me-2" role="group" aria-label="First group">
      <button type="button" class="btn btn-outline-secondary">1</button>
      <button type="button" class="btn btn-outline-secondary">2</button>
      <button type="button" class="btn btn-outline-secondary">3</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'QandA',
  data() {
    return {
        showWriteModal: false,
      newPost: { title: '', content: '' },
      items: [
        { id: 1, title: '연습제목', writer: '연습이름', date: '작성일' },
        { id: 2, title: '연습제목', writer: '연습이름', date: '작성일' },
        { id: 3, title: '연습제목', writer: '연습이름', date: '작성일' }
      ]
    };
  },
  methods: {
    goToDetail(id) {
      this.$router.push({ name: 'DetailPage', params: { id } });
    },
    submitPost() {
      if (this.newPost.title && this.newPost.content) {
        this.items.push({...this.newPost, id: this.items.length + 1, writer: 'Default Author', date: new Date().toLocaleDateString()});
        this.newPost = { title: '', content: '' }; // Reset form
        this.showWriteModal = false; // Close modal
      } else {
        alert("제목과 내용을 모두 입력해주세요.");
      }
    }
  }
}
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
  z-index: 1040;
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
.table-responsive {
  padding: 0 15px;
}
</style>