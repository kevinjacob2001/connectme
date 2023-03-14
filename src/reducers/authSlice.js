import { createSlice } from '@reduxjs/toolkit'
export const authSlice = createSlice({
  name: 'authStatus',
  initialState: {
    value: false,
  },
  reducers: {
    isAuthTrue: (state) => {
      state.value = true
    },
    isAuthFalse: (state) => {
      state.value = false
    },
  },
})
export const { isAuthTrue,isAuthFalse } = authSlice.actions
export default authSlice.reducer