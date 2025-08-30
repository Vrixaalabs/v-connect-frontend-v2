import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../store/slices/authSlice';
import uiSlice from '../store/slices/uiSlice';
import loginSlice from './slices/loginSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    login: loginSlice,
  },
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
