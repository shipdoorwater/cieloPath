<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <!-- Logo -->
      <a class="navbar-brand me-auto" href="http://localhost:8080/">
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

      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" href="#Notice-Area" @click="scrollToComponent($event, 'Notice-Area')"
                >공지사항</a
              >
            </li>
            
            <li class="nav-item">
            <a class="nav-link active" href="#trip-search" style="width: 80px" @click="scrollToComponent($event, 'trip-search')"
              >여행지</a
            >
          </li>
          
            <!-- 로그인 되었을 때 표시할 메뉴 항목들 -->
            <li class="nav-item" v-if="isAuthenticated">
                <router-link class="nav-link active" to="/qanda">1대1 문의</router-link>
            </li>
            <li class="nav-item" v-if="isAuthenticated">
                <router-link class="nav-link active" to="/mypage">프로필</router-link>
            </li>
            <li class="nav-item" v-if="isAuthenticated">
                <a class="nav-link active"  @click="logout">로그아웃</a>
            </li>

            <!-- 로그인 되어 있지 않을 때 표시할 로그인 링크 -->
            <li class="nav-item" v-else>
              <router-link class="nav-link active" to="/login">로그인</router-link>
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
      this.$router.push("/qanda");
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/"); // 로그인 페이지로 리다이렉트
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
div.container-fluid {
  padding-right: 5%;
}
.navbar {
  background-color: rgba(253, 248, 236, 0.5);
}

li.nav-item {
  margin: 10px;
  width: auto;
  border: none;
}

.navbar .navbar-nav .dropdown-menu {
  left: auto; /* 드롭다운 메뉴를 왼쪽으로 정렬 */
  right: 0; /* 오른쪽 정렬을 무시 */
}
</style>
