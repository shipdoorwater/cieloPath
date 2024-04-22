<template>
  <div>
    <a id="custom-login-btn" @click="loginWithKakao()">
      <img
        src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
        width="222"
        alt="카카오 로그인 버튼"
      />
    </a>
    <p>{{ tokenResult }}</p>
    <!-- <div @click="kakaoLogout()">로그아웃</div> -->
  </div>
</template>

<script>
export default {
  name: "Login_kakao",
  data() {
    return {
      tokenResult: "",
    };
  },

  methods: {
    loginWithKakao() {
      window.Kakao.Auth.authorize({
        redirectUri: "http://localhost:8080/login",
      });
    },
    displayToken() {
      const token = this.getCookie("authorize-access-token");
      if (token) {
        window.Kakao.Auth.setAccessToken(token);
        window.Kakao.Auth.getStatusInfo()
          .then((res) => {
            if (res.status === "connected") {
              this.tokenResult =
                "login success, token: " + window.Kakao.Auth.getAccessToken();
            }
          })
          .catch((err) => {
            console.error("Kakao Login Error:", err);
            window.Kakao.Auth.setAccessToken(null);
          });
      }
    },
    getCookie(name) {
      const parts = document.cookie.split(name + "=");
      if (parts.length === 2) {
        return parts[1].split(";")[0];
      }
      return "";
    },

    // kakaoLogin() {
    //   window.Kakao.Auth.login({
    //     scope: "profile_image, account_email",
    //     success: this.getKakaoAccount,
    //   });
    // },
    // getKakaoAccount() {
    //   window.Kakao.API.request({
    //     url: "/v2/user/me",
    //     success: (res) => {
    //       const kakao_account = res.kakao_account;
    //       const nickname = kakao_account.profile.nickname;
    //       const email = kakao_account.email;
    //       console.log("nickname", nickname);
    //       console.log("email", email);

    //       //로그인처리구현

    //       alert("로그인 성공!");
    //     },
    //     fail: (error) => {
    //       console.log(error);
    //     },
    //   });
    // },
    // kakaoLogout() {
    //   window.Kakao.Auth.logout((res) => {
    //     console.log(res);
    //   });
    // },
  },
  mounted() {
    this.displayToken();
  },
};
</script>

<style></style>
