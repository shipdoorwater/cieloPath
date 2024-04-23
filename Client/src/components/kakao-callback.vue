<template>
  <div>로그인중입니다</div>
</template>

<script>
import axios from "axios";
import vueCookies from "vue-cookies";
import { getKakaoToken } from "@/kakaoLogin.js";

export default {
  name: "KakaoCallback",
  data() {
    return {
      token: null,
      userInfo: null,
    };
  },
  created() {
    this.initializeLogin();
  },
  methods: {
    async initializeLogin() {
      if (this.$route.query.code) {
        try {
          const tokenResponse = await getKakaoToken(this.$route.query.code);
          if (!tokenResponse || !tokenResponse.data) {
            console.error("토큰 요청 실패: 응답 데이터가 없습니다.");
            alert("로그인 처리 중 오류가 발생했습니다.");
            this.$router.push("/");
            return;
          }
          if (tokenResponse.data.error) {
            console.error("토큰 요청 오류:", tokenResponse.data.error);
            alert("로그인 처리 중 오류가 발생했습니다.");
            this.$router.push("/");
            return;
          }
          this.token = tokenResponse.data.access_token;
          vueCookies.set("access-token", this.token, "1d"); // 액세스 토큰을 쿠키에 저장
          vueCookies.set(
            "refresh-token",
            tokenResponse.data.refresh_token,
            "1d"
          ); // 리프레시 토큰을 쿠키에 저장
          await this.fetchUserInfo(); // 토큰을 사용하여 사용자 정보를 가져옵니다.
        } catch (error) {
          console.error("토큰 처리 중 예외 발생:", error);
          alert("로그인 처리 중 오류가 발생했습니다.");
          this.$router.push("/");
        }
      } else {
        alert("인증 코드가 존재하지 않습니다.");
        this.$router.push("/");
      }
    },

    fetchUserInfo() {
      axios
        .get("https://kapi.kakao.com/v2/user/me", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          const userInfo = {
            email: data.kakao_account.email, // 이메일 정보
            nickname: data.properties.nickname, // 닉네임 정보
            profileImage: data.kakao_account.profile.profile_image_url, // 프로필 이미지 URL
          };

          // 사용자 정보를 서버에 전송
          this.sendUserInfoToServer(userInfo);
          this.$store.dispatch("login", { user: userInfo, token: this.token });
          this.$router.push("/"); // 사용자를 대시보드로 리다이렉트
        })
        .catch((error) => {
          console.error("사용자 정보를 가져오는데 실패했습니다.", error);
          this.$router.push("/");
        });
    },

    sendUserInfoToServer(userInfo) {
      axios
        .post("http://localhost:3000/api/kakao", userInfo)
        .then((response) => {
          console.log(
            "서버에 사용자 정보가 성공적으로 전송되었습니다.",
            response.data
          );
        })
        .catch((error) => {
          console.error("서버로의 사용자 정보 전송에 실패했습니다.", error);
        });
    },
  },
};
</script>
