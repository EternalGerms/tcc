import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import servicesReducer from './slices/servicesSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: servicesReducer,
    user: userReducer,
  },
}); 