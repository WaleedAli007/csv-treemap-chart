import Vue from 'vue'
export const CLEAR_ALL_DATA = (state) => {
  // Auth
  state.auth.isLoggedIn = false
  state.auth.accessToken = null
  state.auth.refreshToken = null

  // User
  state.user.name = ''
}

export const UPDATE_USER = (state, user) => {
  state.user.username = user.username
  state.user.email = user.email
}

export const ADD_NEW_CSV_DATA = (state, csvData) => {
  state.chartData.push(csvData.data)
  state.tableData.push(csvData)
  state.chartData.reverse()
  state.tableData.reverse()
}

export const UPDATE_SELECTED_CHART = (state, index) => {
  // state.currentChart = state.tableData[index].data
  for (let i = 0; i < state.tableData[index].data.length; i++) {
    const element = state.tableData[index].data[i];
    if (element.Keyword) {
      let obj = {...element}
      obj.name = element.Keyword
      obj.value = 'element.CPC'
      console.log(obj)
      state.currentChart.children[0].children.push(obj)
    }
  }
  // Vue.set(state, 'currentChart', state.tableData[index].data)
}
