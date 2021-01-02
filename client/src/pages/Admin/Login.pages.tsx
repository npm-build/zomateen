import React, { useRef, RefObject } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../../styles/App.scss";
// import { motion } from 'framer-motion';

const LoginPage: React.FC = () => {
  const userNameRef: RefObject<HTMLInputElement> = useRef(null);
  const passwordRef: RefObject<HTMLInputElement> = useRef(null);

  const history = useHistory();

  async function handleLogin() {
    const data = {
      userName: userNameRef.current!.value,
      password: passwordRef.current!.value,
    };

    await axios
      .post("/api/admin/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        return res.data;
      })
      .then((tokens) => {
        const at = tokens.accessToken.toString();
        const rt = tokens.refreshToken.toString();

        Cookies.set("accessToken", at, {
          path: "/",
          expires: new Date(new Date().getTime() + 40 * 60 * 1000),
          secure: true,
          sameSite: "Strict",
        });

        Cookies.set("refreshToken", rt, {
          path: "/",
          expires: new Date(new Date().getTime() + 40 * 60 * 1000),
          secure: true,
          sameSite: "Strict",
        });

        console.log("Pushing.....");
        history.push("/admin/home");
      })
      .catch((e) => {
        console.log(e);
        throw new Error(e);
      });
  }

  return (
    <div className="container">
      <div className="base-container">
        <div className="header">Login</div>
        <div className="info">
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                ref={userNameRef}
                type="text"
                name="username"
                placeholder="Username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                ref={passwordRef}
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <button onClick={handleLogin} className="btn">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
