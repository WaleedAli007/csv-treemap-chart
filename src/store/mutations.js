import Vue from 'vue'
export const CLEAR_ALL_DATA = (state) => {
  // Auth
  state.auth.isLoggedIn = false
  state.auth.accessToken = null
  state.auth.refreshToken = null

  // User
  state.user.name = ''
}

export const ADD_NEW_CSV_DATA = (state, csvData) => {
  state.chartData.push(csvData.data)
  state.tableData.push(csvData)
}
