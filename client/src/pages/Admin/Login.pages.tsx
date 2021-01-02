import React, { useState, useRef, RefObject, CSSProperties } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";

import LoginPageBack from "../../assets/img/loginPageBack.png";
import vectorBack from "../../assets/img/vector-back.png";
import "../../styles/App.scss";
// import { motion } from 'framer-motion';

const LoginPage: React.FC = () => {
  const AlertStlyes = {
    position: "absolute",
    top: "50px",
    left: "30%",
    margin: "0",
    minWidth: "300px",
  } as CSSProperties;

  const [success, setSuccess] = useState<string | null>();
  const [error, setError] = useState<string | null>();

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
        setSuccess("Account created successfully!! Please LogIn");
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
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
        setError(e.error);
        setTimeout(() => {
          setError(null);
        }, 3000);
        throw new Error(e);
      });
  }

  return (
    <div className="loginPage">
      {success && (
        <Alert style={AlertStlyes} variant="success">
          {success}
        </Alert>
      )}
      {error && (
        <Alert style={AlertStlyes} variant="danger">
          {error}
        </Alert>
      )}
      <div className="loginPage__picture">
        <img className="login___picture" src={LoginPageBack} alt="Img" />
      </div>
      <div
        className="loginPageContent"
        style={{ backgroundImage: `url("${vectorBack}")` }}
      >
        <div className="loginPage__input">
          <div className="header">Admin Login</div>
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
    </div>
  );
};

export default LoginPage;
