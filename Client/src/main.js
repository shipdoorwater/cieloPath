import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import router from './router'
import store from "./store.js";

document.addEventListener('DOMContentLoaded', function () {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init('c875ede1bee7c0255072cedc1a16fced'); // Kakao Javascript Key
      console.log("Kakao SDK initialized");
    }
  });

createApp(App).use(router).use(store).mount('#app')
// window.KaKao.init("c875ede1bee7c0255072cedc1a16fced");