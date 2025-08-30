import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface LoginState {
  username: string | null;
  email: string | null;
  password: string;
  error: string | null;
  token: string | null;
}

const initialState: LoginState = {
  username: localStorage.getItem('username'),
  email: localStorage.getItem('email'),
  password: '',
  error: null,
  token: localStorage.getItem('token'),
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
      localStorage.setItem('username', action.payload);
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
      localStorage.setItem('email', action.payload);
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    logout(state) {
      state.username = '';
      state.email = '';
      state.password = '';
      state.error = null;
    },
  },
});

export const { setUsername, setEmail, setPassword, setError, logout } = loginSlice.actions;

export const selectLoginState = (state: { login: LoginState }) => state.login;

export default loginSlice.reducer;
