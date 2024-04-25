<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <!-- Logo -->
      <a class="navbar-brand me-auto" href="http://192.168.0.71:8080/">
        <img
          src="@/assets/logo.png"
          alt="logo"
          height="80px"
          class="logo-image"
        />
      </a>
      <!-- Toggler for mobile -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="bi bi-list"></i>
      </button>

      <!-- Navbar links -->
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <!-- <a class="nav-link active" aria-current="page" href="#">여행지</a> -->
            <a
              class="nav-link active"
              href="#trip-search"
              @click="scrollToComponent($event, 'trip-search')"
              >여행지</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link active"
              href="#Notice-Area" style="width: 80px;"
              @click="scrollToComponent($event, 'Notice-Area')"
              >공지사항</a
            >
          </li>
        </ul>

        <!-- User Icon -->
        <ul class="navbar-nav">
          <li class="nav-item" v-if="isAuthenticated">
            <!-- 로그인 되었을 때의 드롭다운 메뉴 -->
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-person-circle" style="font-size: 1.5rem"></i>
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><router-link class="dropdown-item" to="/qanda">1대1 문의</router-link> </li>
              <li><a class="dropdown-item" href="http://localhost:8080/mypage">프로필</a></li>
              <li><a class="dropdown-item"
              
                 @click="goToQandA()"
                 >1대1 문의</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#" @click="logout">로그아웃</a></li>
            </ul>
          </li>
          <li class="nav-item" v-else>
            <!-- 로그인 되어 있지 않을 때의 로그인 링크 -->
            <a class="nav-link" href="/loginPage">로그인</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "NavBar",
  components: {},
  computed: {
    ...mapState(["user", "token"]), // `user`와 `token` 상태를 매핑
    isAuthenticated() {
      return !!this.token; // 토큰 존재 여부로 인증 상태 결정
    },
  },
  methods: {
    scrollToComponent(event, id) {
      event.preventDefault(); // Prevent the default anchor click behavior
      console.log("Trying to scroll to:", id); // Debug log
      const element = document.getElementById(id);
      if (element) {
        console.log("Element found:", element); // Debug log
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        console.log("Element not found"); // Debug log
      }
    },
    goToQandA() {
      this.$router.replace("/qanda");
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/"); // 로그인 페이지로 리다이렉트
    },
  },
};
</script>

<style>
@media (max-width: 575.98px) {
  /* 모바일 화면에서만 적용될 스타일 */
  #navbarNav .navbar-nav {
    text-align: right;
  }
}
.logo-image {
  margin-left: 30px; /* Add 10px margin to the left of the image */
}
.bi-list {
  border: 0px;
}

.navbar {
  background-color: #fdf8ec;
}

.navbar .navbar-nav .dropdown-menu {
  left: auto; /* 드롭다운 메뉴를 왼쪽으로 정렬 */
  right: 0; /* 오른쪽 정렬을 무시 */

}
</style>
