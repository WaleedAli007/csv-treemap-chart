import routes from '../routes/routes'

const actions = {
  UPDATE_USER (context, user) {
    context.commit('UPDATE_USER', user)
  },
  VIEW_CHART ({commit}, index) {
    commit('UPDATE_SELECTED_CHART', index)
  }
}

export default actions
