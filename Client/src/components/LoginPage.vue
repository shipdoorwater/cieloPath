<template>
  <div class="background">
    <title>Login Page</title>
    <br /><br /><br /><br /><br /><br />
    <h2>CIELO PATH와 여행을 시작해봐요</h2>
    <br /><br /><br /><br /><br /><br />
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
      integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
      crossorigin="anonymous"
    />
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
      integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
      crossorigin="anonymous"
    />

    <div class="login-card" style="">
      <div class="login-card-header"><br>
        <h3>LOGIN</h3>
      </div>
      <div class="login-card-body">
        <form><br>
          <div class="input-group form-group">
            <span class="input-group-text"><i class="fas fa-user"></i></span>

            <input type="text" class="form-control" placeholder="e-mail" />
          </div>
          <div class="input-group form-group">
            <span class="input-group-text"><i class="fas fa-key"></i></span>

            <input
              type="password"
              class="form-control"
              placeholder="password"
            />
          </div>
          <button style="font-size:12px" class="btn btn-link" @click="showModal = true">비밀번호를 잊으셨나요?</button>

         
<br><br>
          <div class="form-group">
            <br /><br />
            <input type="submit" value="Login" class="login_btn" />
        </div> 
          <div style="text-align: center;">
          또는<br />
        <loginKakao></loginKakao>
    <br><br>
    <span>아직 회원이 아니신가요? 
  <router-link to="/signup" class="signup-link">가입하기</router-link>
</span></div>
        </form>
        
      </div>
     
      <div>
       
      </div>
       
    
      <!-- <div class="card-footer">SNS간편로그인<br>
                        <a id="custom-login-btn" @click="loginWithKakao()">
                                    <img src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg" width="150" alt="카카오 로그인 버튼"/>
                                </a>
                               
                    </div> -->
    </div>
    </div>
 
</template>

<script>
import loginKakao from "./Login_kakao.vue";

export default {
  name: "LoginPage",
  data() {
    return {
      tokenResult: "",
      
    };
  },
  components: {
    loginKakao,
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
    mounted() {
      this.displayToken();
    },
  },
};
</script>

<style>


.background {
  background-image: url("@/assets/loginbackground.png") !important; /* Ensure the path is correct */
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
}
.link-container {
  text-align: right; /* Aligns the text to the right */
}

.link-container span {
  font-size: 10px; /* This can remain inline or be moved here for cleanliness */
}

.link-container a {
  color: white; /* Set link color to white */
  text-decoration: none; /* Optional: removes underline from links */
}

.link-container a:hover {
  color: blue; /* Changes color to blue on hover */
}
.login-container {
  position: fixed;
  height: 150vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-card {
  position: fixed;
  height: 550px !important;
  margin-top: auto;
  margin-bottom: auto;
  width: 500px !important;
  background-color: rgba(0, 0, 0, 0.5) !important;
  top: 30%;
  left: 40%;
  /* transform: translate(-50%, -50%); */
  
}

.login-card-header h3 {
  color: white;
  height: 50px;
  
}

.input-group-prepend span {
  width: 50px;
  background-color: transparent; /* Beige background removed */
  color: black;
  border: 0 !important;
}

input:focus {
  outline: 0 0 0 0 !important;
  box-shadow: 0 0 0 0 !important;
}

.login_btn {
  color: black;
  border: none;
  border-radius: 7px;
  padding: 5px;
  background-color: lightblue;
  width: 400px;
  height: 40px;
  /* transform: translate(0%, -50%); */
}


.links {
  color: white;
}

.links a {
  margin-left: 4px;
}
</style>
