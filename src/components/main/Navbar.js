import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { LogoutAPI, LogoutAllAPI } from "../../services/APIRoutes";
import { FaBars, FaArrowCircleUp } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";

export const Navbar = () => {
  let navigate = useNavigate();

  const logout = async (type) => {
    const token = localStorage.getItem("userToken");
    const response = await fetch(type === "all" ? LogoutAllAPI : LogoutAPI, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const status = response.status;
    if (status === 200) {
      localStorage.removeItem("userToken");
      navigate("/");
    }
  };

  return (
    <div id="top">
      <div id="arrow">
        <a href="#top">
          <FaArrowCircleUp />
        </a>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="navbarlogo">
          <Link to="/home">
            <img src="/image/navbarlogo.png" alt="logo" />
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaBars />
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarToggler"
          style={{ justifyContent: "space-between" }}
        >
          <div>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/home">
                  Home
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="headerend">
            <div className="dropdown">
              <div
                className="dropdown-toggle iconstyle"
                id="logoutoptions"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {/* <FaUserAlt className="faSignOutAlt" /> */}
                <FaSignOutAlt className="faSignOutAlt" />
              </div>
              <div className="dropdown-menu" aria-labelledby="logoutoptions">
                <div className="dropdown-item">
                  <Link to="/changepassword">Change Password</Link>
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    logout("one");
                  }}
                >
                  <Link to="/">Logout</Link>
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    logout("all");
                  }}
                >
                  <Link to="/">Logout All</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
