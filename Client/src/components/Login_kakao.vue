<template>
  <div>
    <div style="margin-left: 30px;" class="kbg"  >
    <a id="custom-login-btn" @click="loginWithKakao()">
      <img
        src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
        width="180"
        height="45"
        alt="카카오 로그인 버튼"
      />
    </a>
  </div>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "Login_kakao",
  data() {
    return {

    };
  },

  methods: {
    loginWithKakao() {
      window.Kakao.Auth.authorize({
        redirectUri: "http://localhost:8080/kakao-callback",
        prompt: "select_account"
      });
    },

    fetchUserInfo() {
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: (response) => {
          console.log(response);
          // 서버에 이메일과 토큰 전송
          this.checkUser(
            response.kakao_account.email,
            window.Kakao.Auth.getAccessToken()
          );
        },
        fail: (error) => {
          console.error("Failed to fetch user info:", error);
        },
      });
    },

    checkUser(userEmail, token) {
      this.$store.dispatch("checkUser", { userEmail, token });
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
<style scoped>
.kbg{
  display: flex;
  justify-content: center;
  align-items: center;
  width:430px;
  border-radius: 8px;
  height: 45px;
  background-color: #FEE500
}
</style>