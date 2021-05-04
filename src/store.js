import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isMenuVisible: true,
    isActiveMenuItem: 'profile',
  },
  mutations: {
    setVisibility(state, visibility){
      state.isMenuVisible = visibility;
    },
  }

});

export default store;
