import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userActionStart: (state) => {
      state.loading = true;
    },
    userActionSuccess: (state, action) => {
      state.currentUser = action.payload._id ? action.payload : null;
      state.error = null;
      state.loading = false;
    },
    userActionFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { userActionStart, userActionSuccess, userActionFailure } =
  userSlice.actions;
export default userSlice.reducer;
