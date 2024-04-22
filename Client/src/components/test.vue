<template>
    <h1>Hello World</h1>
</template>
    

<script>
export default {
  name: "LoginPageComponent",
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
