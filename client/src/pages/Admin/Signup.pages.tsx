import React, { useState, useRef, RefObject, CSSProperties } from "react";
import { Alert } from "react-bootstrap";

import LoginPageBack from "../../assets/img/loginPageBack.png";
import vectorBack from "../../assets/img/vector-back.png";
import "../../styles/App.scss";

const Signup: React.FC = () => {
  const AlertStlyes = {
    position: "absolute",
    top: "50px",
    left: "30%",
    margin: "0",
    minWidth: "300px",
  } as CSSProperties;

  const [success, setSuccess] = useState<string | null>();
  const [error, setError] = useState<string | null>();

  const firstNameRef: RefObject<HTMLInputElement> = useRef(null);
  const lastNameRef: RefObject<HTMLInputElement> = useRef(null);
  const collegeIdRef: RefObject<HTMLInputElement> = useRef(null);
  const userNameRef: RefObject<HTMLInputElement> = useRef(null);
  const passwordRef: RefObject<HTMLInputElement> = useRef(null);
  const confirmPasswordRef: RefObject<HTMLInputElement> = useRef(null);
  const PhoneNumberRef: RefObject<HTMLInputElement> = useRef(null);

  async function handleSignUp() {
    const data = {
      firstName: firstNameRef.current?.value,
      lastName: lastNameRef.current?.value,
      userName: userNameRef.current?.value,
      collegeIdRef: collegeIdRef.current?.value,
      password: passwordRef.current?.value,
      phone: PhoneNumberRef.current?.value,
    };

    if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
      console.log("Passwords do not match");
      return false;
    }

    await fetch("/api/admin/signup", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log(res);
        setSuccess("Account created successfully!! Please LogIn");
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
        return res.json();
      })
      .then((data) => console.log(data.message))
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
        <div className="registerPage__input">
          <div className="header">Admin Register</div>
          <div className="register-info">
            <div className="register-form">
              <div className="register-form-group">
                <label htmlFor="firstname">First Name</label>
                <input
                  ref={firstNameRef}
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                />
              </div>
              <div className="register-form-group">
                <label htmlFor="lastname">Last Name</label>
                <input
                  ref={lastNameRef}
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                />
              </div>
              <div className="register-form-group">
                <label htmlFor="collegeId">College ID</label>
                <input
                  ref={collegeIdRef}
                  type="text"
                  name="collegeId"
                  placeholder="College ID"
                />
              </div>
              <div className="register-form-group">
                <label htmlFor="mobno">Mobile Number</label>
                <input
                  ref={PhoneNumberRef}
                  type="number"
                  name="mobno"
                  placeholder="Eg. 7891205465"
                />
              </div>
              <div className="register-form-group">
                <label htmlFor="username">Username</label>
                <input
                  ref={userNameRef}
                  type="text"
                  name="username"
                  placeholder="Username"
                />
              </div>
              <div className="register-form-group">
                <label htmlFor="password">Password</label>
                <input
                  ref={passwordRef}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <div className="register-form-group">
                <label htmlFor="passwordconf">Re-enter Password</label>
                <input
                  ref={confirmPasswordRef}
                  type="password"
                  name="passwordconf"
                  placeholder="Password"
                />
              </div>
            </div>
          </div>
          <div className="register-footer">
            <button
              onClick={() => handleSignUp()}
              type="submit"
              className="btn"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
