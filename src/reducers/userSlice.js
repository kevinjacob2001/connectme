import { createSlice } from '@reduxjs/toolkit'
export const userSlice = createSlice({
  name: 'userData',
  initialState: {
    value: false,
  },
  reducers: {
    storeUserData: (state,action) => {
      state.value = action.payload
    }
  },
})
export const { storeUserData } = userSlice.actions
export default userSlice.reducer