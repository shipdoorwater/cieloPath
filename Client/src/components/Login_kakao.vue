<template>
  <div>
    <a id="custom-login-btn" @click="loginWithKakao()">
      <img
        src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
        width="222"
        alt="카카오 로그인 버튼"
      />
    </a>
    >
  </div>
</template>

<script>
export default {
  name: "Login_kakao",
  data() {
    return {

    };
  },

  methods: {
    loginWithKakao() {
      window.Kakao.Auth.authorize({
        redirectUri: "http://localhost:8080/login",
      });
    }
}
}
</script>
