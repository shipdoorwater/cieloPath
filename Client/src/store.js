import { createStore } from 'vuex'

const store = createStore ({
    state() {
        return {
            count: 0
        }
    },
    mutations: {
        increments (state) {
            state.count++;
        }
    }
})
export default store;

