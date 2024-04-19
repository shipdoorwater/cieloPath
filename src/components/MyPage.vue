<template><br><br><br><br>
    <div class="container my-page">
      <h1>My Profile</h1><br><br><br><br><br><br>
      <div class="profile-section">
        <img :src="profileImageUrl" alt="Profile Image" class="profile-image"/><br>
        <button @click="editProfile" class="btn btn-primary">내 정보 수정</button>
      </div>
      <br><br><br><br><br>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link active" data-bs-toggle="tab" href="#schedules">My CIELO</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#reviews">DIARY</a>
        </li>
      </ul>
      <div class="tab-content">
        <div id="schedules" class="tab-pane fade show active">

          <button type="button" style="background-color: beige; color: black; border:none" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">CIELO 만들기</button>
          <!-- Modal -->
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
      </div>
    </div>
  </template>
  
  
  <script>
export default {
  name: 'MyPage',
  data() {
    return {
      profileImageUrl: 'path_to_default_profile_image.jpg',
      showModal: false // Controls visibility of the modal
    };
  },
  methods: {
    editProfile() {
      // Logic to handle profile editing
    }
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
