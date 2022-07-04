import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { LogoutAPI, LogoutAllAPI } from "../../services/APIRoutes";
import {
  FaUserAlt,
  FaBars,
  FaArrowCircleUp,
} from "react-icons/fa";
import { RiNotificationBadgeFill } from "react-icons/ri";
import Popup from "../../screens/Popup";
import eventValidation from '../validation/useEventValidation'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {values, errors, handleChange, handleSubmit, handleCancel} = eventValidation();
  let navigate = useNavigate()

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

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
      navigate("/")
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
          className="collapse navbar-collapse sidebar"
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
            <div>
              <RiNotificationBadgeFill
                className="riNotification"
                onClick={togglePopup}
              />
              {isOpen && (
                <Popup
                  content={
                    <>
                      <div className="date-container">
                        <div className="start-date">
                          <label>Start Date:</label>
                          <input
                            type="datetime-local"
                            className="form-control"
                            onChange={(e) =>
                              handleChange("startdate", e.target.value)
                            }
                            value={values.startdate}
                            required
                          />
                        </div>
                        <div className="end-date">
                          <label>End Date:</label>
                          <input
                            type="datetime-local"
                            className="form-control"
                            onChange={(e) =>
                              handleChange("enddate", e.target.value)
                            }
                            value={values.enddate}
                            required
                          />
                        </div>
                      </div>
                      <br/>
                      <div>
                        <label htmlFor="title">
                          Title:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) =>
                            handleChange("title", e.target.value)
                          }
                          value={values.title}
                          name="title"
                          placeholder="Title"
                          required
                        />
                        {errors.title && (<small className="form-text text-danger">{errors.title}</small>)}
                      </div>
                      <br/>
                      <div>
                        <label htmlFor="message">
                          Message:
                        </label>
                        <textarea
                          className="form-control"
                          onChange={(e) =>
                            handleChange("message", e.target.value)
                          }
                          value={values.message}
                          name="message"
                          placeholder="Type here....."
                          required
                        />
                        {errors.message && (<small className="form-text text-danger">{errors.message}</small>)}
                      </div>
                      <br/>
                      <label htmlFor="Photos">Photos:</label>{" "}
                      <input type="file" name="photos" 
                              onChange={(e) =>
                                handleChange("photos", e.target.files)
                              } multiple/><br/>
                      <button onClick={handleCancel} className="btn btn-style" style={{width:"20%",backgroundColor: "#495057"}}>Reset</button>
                      <button onClick={handleSubmit} className="btn btn-style" style={{width:"20%",marginLeft: "20px"}}>Add</button>
                    </>
                  }
                  handleClose={togglePopup}
                />
              )}
            </div>
            <div className="dropdown">
              <div
                className="dropdown-toggle iconstyle"
                id="logoutoptions"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <FaUserAlt className="faSignOutAlt" />
              </div>
              <div className="dropdown-menu" aria-labelledby="logoutoptions">
                <div
                  className="dropdown-item"
                >
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
