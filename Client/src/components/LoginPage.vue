<template>

    <div class="background">
        <title>Login Page</title>
        <br><br><br><br><br><br>
        <h2>CIELO PATH와 여행을 시작해봐요</h2><br><br><br><br><br><br>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"/>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous"/>
    
        
          
                <div class="card">
                    <div class="card-header">
                        <h3>LOGIN</h3>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="input-group form-group">
                    
                                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                               
                                <input type="text" class="form-control" placeholder="e-mail"/>
                            </div>
                            <div class="input-group form-group">
                              
                                    <span class="input-group-text"><i class="fas fa-key"></i></span>
                               
                                <input type="password" class="form-control" placeholder="password"/>
                                
                            </div>
                            <div class="link-container">
    <span style="font-size: 10px; color: gray">
        <a href="#">회원가입 </a>&nbsp;/&nbsp;
        <a href="#">비밀번호 찾기</a>
    </span>
</div>

                            <div class="form-group">
                                <br><br>
                                <input type="submit" value="Login" class="login_btn"/>
                            </div>
                        </form>
                    </div>
                    <div>
                        SNS간편로그인<br>
                        <loginKakao></loginKakao>
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
import loginKakao from './Login_kakao.vue';

export default {
  name: "LoginPage",
  data() {
    return {
      tokenResult: "",
    };
},
components: {
     loginKakao
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
.container {
    height: 100vh; 
    /* display: flex; */
    align-items: center; 
    justify-content: center;
}
.card {
    height: 450px;
    margin-top: auto;
    margin-bottom: auto;
    width: 400px;
    background-color: rgba(0, 0, 0, 0.5) !important;
    top: 20%;          
    left: 50%;          
    transform: translate(-50%, -50%);
}

.card-header h3 {
    color: white;
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
    width: 200px;
    height: 35px;
    transform: translate(-30%, -50%);
}

.login_btn:hover {
    color: black;
    background-color: white;
}

.links {
    color: white;
}

.links a {
    margin-left: 4px;
}
</style>
