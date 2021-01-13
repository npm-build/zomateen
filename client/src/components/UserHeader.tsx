import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { UserType } from "../utils/Types";
import "../styles/Header.styles.scss";

const Header: React.FC = () => {
  const accessToken = Cookies.get("accessToken");
  const [user, setUser] = useState<UserType | null>(null);

  async function getCurrentUser() {
    await axios
      .get("/api/user/getUser", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }
  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header id="header">
      <div id="logo">
        <p id="logo-head">ZOMATEEN</p>
        <div id="status">
          <i className="fas fa-circle" /> <p>Online</p>
        </div>
      </div>
      <div className="search-container">
        <form className="search-bar" action="">
          <button type="submit">
            <i className="fa fa-search" />
          </button>
          <input type="text" placeholder="Search.." name="search" />
        </form>

        <div id="profile">
          <p>Hi, {user?.userName}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
