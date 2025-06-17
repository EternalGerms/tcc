import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  services: [],
  categories: [],
  selectedService: null,
  loading: false,
  error: null,
  filters: {
    category: '',
    minPrice: '',
    maxPrice: '',
    rating: '',
  },
};

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setServices: (state, action) => {
      state.services = action.payload;
      state.loading = false;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSelectedService: (state, action) => {
      state.selectedService = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const {
  setServices,
  setCategories,
  setSelectedService,
  setLoading,
  setError,
  setFilters,
  clearFilters,
} = servicesSlice.actions;

export default servicesSlice.reducer; 