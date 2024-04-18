<template>
    <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <!-- Logo -->
      <a class="navbar-brand me-auto" href="#">
        <img src="@/assets/logo.png" alt="logo" height="80px">
      </a>
      
      <!-- Toggler for mobile -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <i class="bi bi-list"></i>
      </button>
      
      <!-- Navbar links -->
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">여행지</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">공지사항</a>
          </li>
        </ul>
        
        <!-- User Icon -->
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-person-circle" style="font-size: 1.5rem;"></i>
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">프로필</a></li>
              <li><a class="dropdown-item" href="#">설정</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">로그아웃</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    
  </template>
  
  <script>
  
  export default {
    name: 'NavBar',
    components: {
    }
  }
  </script>
  
  <style>
  
  @media (max-width: 575.98px) { 
      /* 모바일 화면에서만 적용될 스타일 */
      #navbarNav .navbar-nav {
        text-align: right;
      }
    }  
  
  .bi-list {
    border: 0px;
  }
  
  .navbar {
    background-color: #FDF8EC;
  }
  
  .navbar .navbar-nav .dropdown-menu {
      left: auto; /* 드롭다운 메뉴를 왼쪽으로 정렬 */
      right: 0; /* 오른쪽 정렬을 무시 */
  
    }
  </style>
  