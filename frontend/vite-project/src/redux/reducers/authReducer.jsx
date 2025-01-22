import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      id: "",
      name: "",
      email: "",
      password: "",
      token: "",
      isAuthenticated: false,
    },
  },
  reducers: {
    registerUser: (state, action) => {
      state.user = action.payload;
      state.user.isAuthenticated = true;
    },
    login(state, action) {
      state.user = action.payload;
      state.user.isAuthenticated = true;
      const users = JSON.stringify(state.user);
      localStorage.setItem("user", users);
    },
    logout: (state) => {
      state.user = {
        id: "",
        name: "",
        email: "",
        password: "",
        token: "",
        isAuthenticated: false,
      };
      localStorage.clear();
    },
  },
});

export default authSlice.reducer;
export const { registerUser, login, logout } = authSlice.actions;
