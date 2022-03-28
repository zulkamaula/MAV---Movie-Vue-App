import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      count: 1,
      keywords: ""
    }
  },
  mutations: {
    increment(state){
      state.count++
    },
    findMovie(state, value){
      state.keywords = value
    }
  },
})

export default store