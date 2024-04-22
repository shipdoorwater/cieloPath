<template>
  <div class="about">
    <h1>This is an about page</h1>

    <button @click="btn_userInfo">사용자 정보 가져오기</button>
    <button @click="btn_off">연결 끊기</button>
    <button @click="message2">메세지</button>
  </div>
</template>

<script>
import axios from "axios";
import { getKakaoToken } from "@/kakaoLogin.js";
import vueCookies from "vue-cookies"; // npm install vue-cookies

export default {
  name: "Login_getToken",
  data() {
    return {
      code: null,
      token: null,
    };
  },
  created() {
    if (this.$route.query.code) {
      this.setKakaoToken();
    }
  },
  methods: {
    async setKakaoToken() {
      console.log("카카오 인증 코드", this.$route.query.code);
      this.code = this.$route.query.code;
      const { data } = await getKakaoToken(this.$route.query.code);
      if (data.error) {
        alert("카카오톡 로그인 오류입니다.");
        this.$router.go();
        return;
      }
      window.Kakao.Auth.setAccessToken(data.access_token);
      console.log("token: ", data.access_token);
      this.token = data.access_token;
      vueCookies.set("access-token", data.access_token, "1d");
      vueCookies.set("refresh-token", data.refresh_token, "1d");
    },

    //사용자 정보 가져오기
    btn_userInfo() {
      console.log("btn_userInfo");
      axios
        .get("https://kapi.kakao.com/v2/user/me", {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then((res) => {
          console.log(res);
        });
    },

    //연결 끊기
    btn_off() {
      axios.post("https://kapi.kakao.com/v1/user/unlink", null, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + this.token,
        },
      });
    },
    message2() {
      window.Kakao.API.request({
        url: "/v2/api/talk/memo/default/send",
        data: {
          template_object: {
            object_type: "text",
            text: "text 영역 입니다", //메세지 내용
            link: {
              web_url: "https://www.naver.com", //?
              mobile_web_url: "https://m.naver.com/", //?
            },
            button_title: "클릭 해보기",
          },
        },
      });
    },
  },
};
</script>
