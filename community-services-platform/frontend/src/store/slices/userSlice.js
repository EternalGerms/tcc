import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  providers: [],
  selectedProvider: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setProviders: (state, action) => {
      state.providers = action.payload;
    },
    setSelectedProvider: (state, action) => {
      state.selectedProvider = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
  },
});

export const {
  setProfile,
  setProviders,
  setSelectedProvider,
  setLoading,
  setError,
  updateProfile,
} = userSlice.actions;

export default userSlice.reducer; 