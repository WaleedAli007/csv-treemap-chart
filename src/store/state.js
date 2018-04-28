
// Sets the key we'll use in local storage.
export const STORAGE_KEY = 'csv-treemap'

// data which needs be synced/updated after some time interval
let syncedData = {
  auth: {
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null
  },
  user: {
    name: null,
    _id: null,
    role: null,
    loggedInAt: null
  }
}

let notSyncedData = {
  chartData: [],
  tableData: []
}

// Sync with local storage.
if (localStorage.getItem(STORAGE_KEY)) {
  syncedData = JSON.parse(localStorage.getItem(STORAGE_KEY))
}

// Merge data and export it.
export const state = Object.assign(syncedData, notSyncedData)
