import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    guitarid: 0
  },
  mutations: {
    setGuitarId (state,guitarid) {
        state.guitarid = guitarid;
    }
  }
})

export default store