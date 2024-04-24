import { createStore } from "vuex";
// import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  // plugins: [createPersistedState({
  //   paths: ['user', 'token'] // 유지하고 싶은 상태
  // })],
  state: {
    user: null,
    token: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    login({ commit }, { user, token }) {
      commit("setUser", user);
      commit("setToken", token);
      // 토큰을 localStorage에 저장
      // localStorage.setItem("token", token);
    },
    logout({ commit }) {
      commit("setUser", null);
      commit("setToken", null);
      // localStorage에서 토큰 제거
      // localStorage.removeItem("token");
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
    currentUser(state) {
      return state.user;
    },
  },
});

export default store;
