import * as types from '../mutation-types';

const state = {
  message: '',
  show: false
}

const mutations = {
  [types.TOGGLE_TWEET_DODAL] (state) {
    state.message = '';
    state.show = !state.show;
  }
}

export default {
  state,
  mutations
}
