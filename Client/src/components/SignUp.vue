<template>
  <!------ Include the above in your HEAD tag ---------->
  <div class="container register">
                  <div class="row">
                      <div class="col-md-3 register-left">
                          <img src="@/assets/logo.png" alt=""/><br><br>
                          <h3>WELCOME</h3><br>
                          <p>CIELO PATH에서 간편하고 빠르게 여행 일정을 만들어보세요!</p>
                      </div>
                      <div class="col-md-9 register-right">

                                  <h3 class="register-heading">회원가입</h3><br><br>
                                  <div class="row register-form">
                                      <div class="col-md-6">
                                          <div class="form-group">
                                            <div class="form-group">
                                              <input type="email" class="form-control" placeholder="이메일" value="" /><br>
                                          </div>
                                          <div class="form-group">
                                              <input type="text" class="form-control" placeholder="이름" value="" /><br>
                                          </div>
                                          <div class="form-group">
                                              <input type="text" class="form-control" placeholder="닉네임" value="" /><br>
                                          </div>
                                          <div class="form-group">
                                              <input type="password" class="form-control"  placeholder="비밀번호" value="" /><br>
                                          </div>
                                          <div class="form-group">
                                              <input type="password" class="form-control"  placeholder="비밀번호 확인" value="" /><br>
                                          </div>
                                         
                                          <div class="form-group">
                                              <input type="text" minlength="10" maxlength="10" name="txtEmpPhone" class="form-control" placeholder="휴대폰번호" value="" /><br>
                                          </div>
                                          <input type="submit" class="btnRegister"  value="가입완료"/>
                                      </div>
                                  </div>
                              </div>
                             </div>
                                         </div>
                                  </div>
                            
                      
    </template>
    <script>
    export default {
      name: 'SignUp'
    }
    </script>
    <style>
    .form-group{
        width: 500px;

    }
    .register{
      background: -webkit-linear-gradient(left, #3931AF, #00C6FF);
      margin-top: 3%;
      padding: 3%;
  }
  .register-left{
      text-align: center;
      color: #fff;
      margin-top: 4%;
  }
  .register-left input{
      border: none;
      border-radius: 1.5rem;
      padding: 2%;
      width: 60%;
      background: #F8F9FA;
      font-weight: bold;
      color: #383D41;
      margin-top: 30%;
      margin-bottom: 3%;
      cursor: pointer;
  }
  .register-right{
      background: #F8F9FA;
      border-top-left-radius: 10% 50%;
      border-bottom-left-radius: 10% 50%;
  }
  .register-left img{
      margin-top: 15%;
      margin-bottom: 5%;
      width: 25%;
      -webkit-animation: mover 2s infinite  alternate;
      animation: mover 1s infinite  alternate;
  }
  @-webkit-keyframes mover {
      0% { transform: translateY(0); }
      100% { transform: translateY(-20px); }
  }
  @keyframes mover {
      0% { transform: translateY(0); }
      100% { transform: translateY(-20px); }
  }
  .register-left p{
      font-weight: lighter;
      padding: 12%;
      margin-top: -9%;
  }
  .register .register-form{
      padding: 10%;
      margin-top: 10%;
  }
  .btnRegister{
      float: right;
      margin-top: 10%;
      border: none;
      border-radius: 1.5rem;
      padding: 2%;
      background: #0062CC;
      color: #fff;
      font-weight: 600;
      width: 50%;
      cursor: pointer;
  }
  .register .nav-tabs{
      margin-top: 3%;
      border: none;
      background: #0062CC;
      border-radius: 1.5rem;
      width: 28%;
      float: right;
  }
  .register .nav-tabs .nav-link{
      padding: 2%;
      height: 34px;
      font-weight: 600;
      color: #fff;
      border-top-right-radius: 1.5rem;
      border-bottom-right-radius: 1.5rem;
  }
  .register .nav-tabs .nav-link:hover{
      border: none;
  }
  .register .nav-tabs .nav-link.active{
      width: 100px;
      color: #0062CC;
      border: 2px solid #0062CC;
      border-top-left-radius: 1.5rem;
      border-bottom-left-radius: 1.5rem;
  }
  .register-heading{
      text-align: center;
      margin-top: 8%;
      margin-bottom: -15%;
      color: #495057;
  }
    </style>