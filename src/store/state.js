
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
    username: null,
    _id: null,
    email: '',
    role: null,
    loggedInAt: null
  }
}

let notSyncedData = {
  chartData: [],
  tableData: [],
  currentChart: {
    "name": "flare",
    "children": [
        {
            "name": "seo",
            "children": []
        }
    ]
  }
}

// Sync with local storage.
if (localStorage.getItem(STORAGE_KEY)) {
  syncedData = JSON.parse(localStorage.getItem(STORAGE_KEY))
}

// Merge data and export it.
export const state = Object.assign(syncedData, notSyncedData)
