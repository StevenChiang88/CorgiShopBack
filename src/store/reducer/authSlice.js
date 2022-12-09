import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: () => {
    //這邊把user當redux的state，userId是網頁獲取的命名
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!token) {
      return {
        isLogged: false,
        token: null,
        userId: null,
      };
    }
    return {
      isLogged: true,
      token: token,
      userId: userId,
    };
  },
  reducers: {
    userLogIn: (state, action) => {
      state.isLogged = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      //將資料存入localStorage
      localStorage.setItem("token", state.token);
      localStorage.setItem("userId", state.userId);
    },
    userLogOut: (state, action) => {
      state.isLogged = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
  },
});
export const { userLogIn, userLogOut } = authSlice.actions;
