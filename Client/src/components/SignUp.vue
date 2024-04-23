<template>
  <!------ Include the above in your HEAD tag ---------->
  <div class="container register">
    <div class="row">
      <div class="col-md-3 register-left">
        <img src="@/assets/logo.png" alt="" /><br /><br />
        <h3>WELCOME</h3>
        <br />
        <p>CIELO PATH에서 간편하고 빠르게 여행 일정을 만들어보세요!</p>
      </div>
      <div class="col-md-9 register-right">
        <h3 class="register-heading">회원가입</h3>
        <form @submit.prevent="submitForm">
          <br /><br />
          <div class="row register-form">
            <div class="col-md-6">
              <div class="form-group">
                <div class="form-group">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="이메일"
                    v-model="userInfo.email"
                    @blur="checkEmailAvailability"
                  /><br />
                  {{ emailSuccess }} {{ emailError }} <br />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="이름"
                    v-model="userInfo.userName"
                  /><br />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="닉네임"
                    v-model="userInfo.nickName"
                  /><br />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="비밀번호"
                    v-model="userInfo.password"
                  /><br />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="비밀번호 확인"
                    v-model="userInfo.passwordConfirm"
                  /><br />
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    minlength="10"
                    maxlength="11"
                    name="txtEmpPhone"
                    class="form-control"
                    placeholder="휴대폰번호"
                    v-model="userInfo.phoneNumber"
                  /><br />
                </div>
                <input
                  type="submit"
                  class="btnRegister"
                  :disabled="isFormInvalid"
                  value="가입완료"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "SignUp",
  data() {
    return {
      userInfo: {
        email: "",
        userName: "",
        nickName: "",
        password: "",
        passwordConfirm: "",
        phoneNumber: "",
      },
      emailError: "",
      emailSuccess: "",
    };
  },
  methods: {
    checkEmailAvailability() {
      if (!this.userInfo.email) {
        this.emailError = "이메일을 입력해주세요.";
        return;
      }
      axios
        .get(
          `http://localhost:3000/api/check-email?email=${encodeURIComponent(
            this.userInfo.email
          )}`
        )
        .then((response) => {
          if (response.data.isAvailable) {
            this.emailError = null;
            this.emailSuccess = "사용 가능한 이메일입니다";
          } else {
            this.emailError = "이미 사용중인 이메일입니다.";
          }
        })
        .catch((error) => {
          console.error("이메일 중복 검사 실패:", error);
          this.emailError = "이메일 중복 검사 중 오류가 발생했습니다.";
        });
    },

    submitForm() {
      console.log(this.isFormInvalid);
      axios
        .post("http://localhost:3000/api/registerbyemail", this.userInfo)
        .then((response) => {
          alert("회원가입이 완료되었습니다.");
          console.log(response);
          // 회원가입 후 추가 작업 (예: 로그인 페이지로 리다이렉션)
        })
        .catch((error) => {
          console.error("회원가입 실패:", error);
          // 에러 처리
        });
    },
  },
  computed: {
    isFormInvalid() {
      // 모든 필드가 채워져 있고 비밀번호가 일치해야 true를 반환
      return !(
        this.userInfo.email &&
        !this.emailError && // 이메일 중복 검사에서 오류가 없어야 함
        this.userInfo.userName &&
        this.userInfo.nickName &&
        this.userInfo.password &&
        this.userInfo.password === this.userInfo.passwordConfirm &&
        this.userInfo.phoneNumber
      );
    },
  },
};
</script>
<style>
.form-group {
  width: 500px;
}
.register {
  background: -webkit-linear-gradient(left, #3931af, #00c6ff);
  margin-top: 3%;
  padding: 3%;
}
.register-left {
  text-align: center;
  color: #fff;
  margin-top: 4%;
}
.register-left input {
  border: none;
  border-radius: 1.5rem;
  padding: 2%;
  width: 60%;
  background: #f8f9fa;
  font-weight: bold;
  color: #383d41;
  margin-top: 30%;
  margin-bottom: 3%;
  cursor: pointer;
}
.register-right {
  background: #f8f9fa;
  border-top-left-radius: 10% 50%;
  border-bottom-left-radius: 10% 50%;
}
.register-left img {
  margin-top: 15%;
  margin-bottom: 5%;
  width: 25%;
  -webkit-animation: mover 2s infinite alternate;
  animation: mover 1s infinite alternate;
}
@-webkit-keyframes mover {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}
@keyframes mover {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}
.register-left p {
  font-weight: lighter;
  padding: 12%;
  margin-top: -9%;
}
.register .register-form {
  padding: 10%;
  margin-top: 10%;
}
.btnRegister {
  float: right;
  margin-top: 10%;
  border: none;
  border-radius: 1.5rem;
  padding: 2%;
  background: #0062cc;
  color: #fff;
  font-weight: 600;
  width: 50%;
  cursor: pointer;
}
.register .nav-tabs {
  margin-top: 3%;
  border: none;
  background: #0062cc;
  border-radius: 1.5rem;
  width: 28%;
  float: right;
}
.register .nav-tabs .nav-link {
  padding: 2%;
  height: 34px;
  font-weight: 600;
  color: #fff;
  border-top-right-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
}
.register .nav-tabs .nav-link:hover {
  border: none;
}
.register .nav-tabs .nav-link.active {
  width: 100px;
  color: #0062cc;
  border: 2px solid #0062cc;
  border-top-left-radius: 1.5rem;
  border-bottom-left-radius: 1.5rem;
}
.register-heading {
  text-align: center;
  margin-top: 8%;
  margin-bottom: -15%;
  color: #495057;
}
</style>
