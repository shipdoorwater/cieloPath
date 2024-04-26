import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate';
import axios from 'axios';

const store = createStore({
  plugins: [createPersistedState({
    paths: ['user', 'token','isAdmin'] // 유지하고 싶은 상태
  })],
  state: {
    user: null,
    token: null,
    qandaPosts: [],
    isAdmin: false
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },

    setQandAPosts(state, posts) {
      state.qandaPosts = posts;
    },
    setAdminStatus(state, status) {
      state.isAdmin = status;
    },
    // setIsAuthenticated(state, value) {
    //   state.isAuthenticated = value;
    // },
  },

  actions: {
    
    login({ commit, dispatch }, { user, token }) {
      commit("setUser", user);
      commit("setToken", token);
      dispatch("checkAdminStatus", user.email); 

    },
    logout({ commit }) {
      commit("setUser", null);
      commit("setToken", null);

    },
    checkAdminStatus({ commit }, userId) {
      axios.get(`http://192.168.0.78:3000/api/checkAdmin/${encodeURIComponent(userId)}`)
        .then(response => {
          commit('setAdminStatus', response.data.isAdmin);  // 응답에서 관리자 여부를 받아와 저장
          console.log("userId" + userId);
          console.log(response);
        })
        .catch(error => {
          console.error("Failed to check admin status:", error);
        });
    },

    fetchItems({ commit }) {  // context 대신 destructuring 사용하여 commit 직접 접근
      axios.get("http://192.168.0.78:3000/api/qna")
        .then(response => {
          commit('setQandAPosts', response.data);  // setItems 대신 setQandAPosts 사용
        })
        .catch(error => {
          console.error("Failed to fetch items:", error);
        });
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
    currentUser(state) {
      return state.user;
    },
    isAdmin(state) {
      return state.isAdmin;
    }
  },
});

export default store;
