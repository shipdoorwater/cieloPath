<template><br><br><br><br>
  <div class="container my-page">
  <h1>My Profile</h1>
  <div class="profile-section">
    <img :src="profileImageUrl" alt="Profile Image" class="profile-image"/>
    <button style="width: 250px;" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editInfoModal">Edit My Info</button>
  </div>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a class="nav-link active" data-bs-toggle="tab" href="#schedules">My CIELO</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" data-bs-toggle="tab" href="#reviews">DIARY</a>
    </li>
  </ul>
  <div class="tab-content">
    <div id="schedules" class="tab-pane fade show active"></div>
    <div id="reviews" class="tab-pane fade"></div>
  </div>

  <!-- Edit Info Modal -->
  <div class="modal fade" id="editInfoModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">내 정보 수정</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="nickname" class="col-form-label">닉네임:</label>
              <input type="text" class="form-control" id="nickname">
            </div>
            <div class="mb-3">
              <label for="mobile" class="col-form-label">휴대폰번호:</label>
              <input type="tel" class="form-control" id="mobile">
            </div>
            <div class="mb-3">
              <label for="email" class="col-form-label">이메일:</label>
              <input type="email" class="form-control" id="email">
            </div>
            <div class="mb-3">
              <label for="password" class="col-form-label">비밀번호:</label>
              <input type="password" class="form-control" id="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
          <button type="button" class="btn btn-danger">탈퇴</button>
          <button type="button" class="btn btn-primary">저장</button>
        </div>
      </div>
    </div>
  </div>

        <button type="button" style="background-color: beige; color: black; border:none" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">CIELO 만들기</button>
        <!-- CIELO 만들기 Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">CIELO 만들기</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="saveCielo">
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">지역</label>
                    <input type="text" class="form-control" id="recipient-name" v-model="tempCieloText">
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="saveCielo">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="reviews" class="tab-pane fade">
      </div>
    
</template>


<script>
export default {
name: 'MyPage',
data() {
  return {
    showWriteModal: false,
    profileImageUrl: 'path_to_default_profile_image.jpg',
    showModal: false, // Controls visibility of the modal
    tempCieloText:""
  };
},
methods: {
  
}
}
</script>


<style scoped>
.container.my-page {
max-width: 800px;
margin: auto;
display: flex;
flex-direction: column; 
align-items: center;
}

.profile-section {
display: flex;
flex-direction: column; 
align-items: center; 
gap: 10px; 
}

.profile-image {
width: 150px;
height: 150px; 
border-radius: 50%;
object-fit: cover;
}


.nav-tabs {
width: 100%; 
justify-content: flex-start; 
margin-bottom: 20px; 
}
#schedules {
display: flex; 
flex-direction: column; 
align-items: flex-end; 
}

.btn-info {
background-color: beige; 
border: none; 
text-align: right; 
height:40px;
}
.tab-content {
width: 100%; 
align-items: flex-start; 
}

.modal-backdrop {
position: fixed;
top: 0;
left: 0;
width: 100vw;
height: 100vh;
background-color: rgba(0,0,0,0.5);
}

.btn-secondary{
height: 40px;
font-size: 16px; 
}

.btn-primary {
  height: 40px;
 font-size: 16px; 
}


</style>