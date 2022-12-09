import { Input, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUserLoginMutation } from "../store/authApi";
import { userLogIn } from "../store/reducer/authSlice";
import { GeneralButton } from "../styles/styledcomponents";

const LoginPage = () => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [loginFn, { error: loginError }] = useUserLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const log = useSelector((state) => state.auth);
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginFn({ username: userName, password });
      dispatch(userLogIn({ userId: data._id, token: data.accessToken }));
      navigate("/home");
    } catch (err) {
      alert("帳號或密碼輸入錯誤");
    }
  };

  useEffect(() => {
    if (log.isLogged === true) {
      navigate("/home");
    }
  }, [log]);
  return (
    <div
      style={{
        height: "calc(100vh - 4rem)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#273156",
      }}
    >
      <div style={{ backgroundColor: "#3F4F8B", padding: "4rem" }}>
        <Typography variant="h4" textAlign="center" color="white">
          Login
        </Typography>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "3rem",
          }}
        >
          <Input
            style={{ color: "white" }}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            placeholder="帳號(admin)"
          />
          <Input
            style={{
              marginTop: "2rem",
              color: "white",
            }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="密碼(123)"
          />
          <GeneralButton
            style={{ marginTop: "2rem" }}
            onClick={(e) => {
              loginHandler(e);
            }}
          >
            登入
          </GeneralButton>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
