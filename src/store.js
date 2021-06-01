import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isMenuVisible: true,
    isActiveMenuItem: 'profile',
    role: '',
    vacancy: []
  },
  mutations: {
    setVisibility(state, visibility){
      state.isMenuVisible = visibility;
    },
    set_role(state, user_role) {
      state.role = user_role;
    },
    set_vacancy(state, user_vacancy) {
      state.vacancy = user_vacancy;
    }
  }

});

export default store;
