import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  data: null,
};
const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setLoading: state => {
      state.loading = true;
      state.error = null;
      state.data = null;
    },
    setData: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { setLoading, setData, setError } = apiSlice.actions;
export default apiSlice.reducer;