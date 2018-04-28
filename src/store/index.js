import Vue from 'vue'
import Vuex from 'vuex'
import { state } from './state'
const actions = require('./actions.js').default
import { getters } from './getters'
import * as mutations from './mutations'
import plugins from './plugins'

Vue.use(Vuex)

const store = new Vuex.Store({
  actions,
  state,
  getters,
  mutations,
  plugins
})

export default store
