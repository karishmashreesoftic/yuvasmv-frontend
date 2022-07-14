import React, { useEffect, useState, useRef } from "react";
import {
  HomeAPI,
  GetAdminsAPI,
  GetGroupLeadersAPI,
  GetMembersAPI,
  UploadMembersAPI,
} from "../services/APIRoutes";
import { useNavigate } from "react-router-dom";
import { Member } from "../components/main/Member";
import { FaUserPlus, FaUserTie, FaUserFriends, FaUsers } from "react-icons/fa";
import { RiNotificationBadgeFill } from "react-icons/ri";
import checkBoxValidation from "../components/validation/useCheckBoxValidation";
import { MdGroupAdd } from "react-icons/md";
import Popup from "../screens/Popup";
import eventValidation from "../components/validation/useEventValidation";
// import filterData from "../components/validation/useFilterData"

export const Home = () => {
  const [admins, setAdmins] = useState([]);
  const [groupleaders, setGroupleaders] = useState([]);
  const [members, setMembers] = useState([]);
  const [fileError, setFileError] = useState("");
  const [memberFault, setMemberFault] = useState("");
  const [memberKey, setMemberKey] = useState("");
  const [headerFault, setHeaderFault] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [filteredGroupleaders, setFilteredGroupleaders] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  // const {
  //   admins, groupleaders, members,
  //   getAdmins, getGroupLeaders, getMembers,
  //   filteredAdmins, filteredGroupleaders, filteredMembers,
  //   filterAdminData, filterGroupleaderData, filteredMembersData
  // } = filterData();
  const {
    selectedadmin,
    selectedgroupleader,
    handlebarChange,
  } = checkBoxValidation();
  const [isOpen, setIsOpen] = useState(false);
  const [flag, setFlag] = useState(false);
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleCancel,
  } = eventValidation();
  const inputRef = useRef(null);

  let navigate = useNavigate();
  const token = localStorage.getItem("userToken");
  let formData = new FormData();

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleEventSubmit = async (e) => {
    let flag = await handleSubmit(e);
    if (flag === true) {
      togglePopup();
    }
  };

  const fileChangedHandler = async (event) => {
    event.preventDefault();

    const file = event.target.files[0];
    if (!file) {
      setFileError("");
      setMemberFault("");
      setHeaderFault("");
      return;
    }

    const fileExtention = file.name.split(".").pop();
    if (fileExtention === "xlsx") {
      formData.append("members", file);

      const response = await fetch(UploadMembersAPI, {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      const result = await response.json();
      setMemberFault(result.members);
      setHeaderFault(result.header);
      setMemberKey(Object.keys(result.members));

      if (response.status === 201 && Object.keys(result.members).length !== 0) {
        setFileError(
          `There is error in below given fields with respective members. Please check and try again...`
        );
        setFlag(false);
      } else if (
        response.status === 201 &&
        Object.keys(result.header).length !== 0
      ) {
        setFileError(
          `The below given columns are either not present or have different name. Please check and try again...`
        );
        setFlag(false);
      } else {
        setFileError("Members created successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        setFlag(true);
      }
    } else {
      setFileError("File does not support. You must upload .xlsx file.");
      setFlag(true);
    }
  };
  const handleClick = () => {
    inputRef.current.click();
  };

  const handleChangeSearch = (value) => {
    if (value === " ") return;
    setSearchText(value);
    filterAdminData(value);
    filterGroupleaderData(value);
    filteredMembersData(value);
  };

  const filterAdminData = (value) => {
    const lowercasedValue = value.toLowerCase().trim();

    if (lowercasedValue === "") setFilteredAdmins(admins);
    else {
      const filteredData = admins.filter((item) => {
        const { fullname, searchTerm = fullname.toLowerCase() } = item;

        if (searchTerm.includes(lowercasedValue)) return true;
        else {
          const splittedValue = searchTerm.split(" ");
          for (let i = 0; i < splittedValue.length; i++) {
            const element = splittedValue[i];
            if (element.trim()) {
              if (element.includes(lowercasedValue)) return true;
            }
          }
        }
        return false;
      });

      setFilteredAdmins(filteredData);
    }
  };

  const filterGroupleaderData = (value) => {
    const lowercasedValue = value.toLowerCase().trim();

    if (lowercasedValue === "") setFilteredGroupleaders(groupleaders);
    else {
      const filteredData = groupleaders.filter((item) => {
        const { fullname, searchTerm = fullname.toLowerCase() } = item;

        if (searchTerm.includes(lowercasedValue)) return true;
        else {
          const splittedValue = searchTerm.split(" ");
          for (let i = 0; i < splittedValue.length; i++) {
            const element = splittedValue[i];
            if (element.trim()) {
              if (element.includes(lowercasedValue)) return true;
            }
          }
        }
        return false;
      });

      setFilteredGroupleaders(filteredData);
    }
  };

  const filteredMembersData = (value) => {
    const lowercasedValue = value.toLowerCase().trim();

    if (lowercasedValue === "") setFilteredMembers(members);
    else {
      const filteredData = members.filter((item) => {
        const { fullname, searchTerm = fullname.toLowerCase() } = item;

        if (searchTerm.includes(lowercasedValue)) return true;
        else {
          const splittedValue = searchTerm.split(" ");
          for (let i = 0; i < splittedValue.length; i++) {
            const element = splittedValue[i];
            if (element.trim()) {
              if (element.includes(lowercasedValue)) return true;
            }
          }
        }
        return false;
      });

      setFilteredMembers(filteredData);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(HomeAPI, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const status = response.status;

      if (status === 401) {
        navigate("/", { replace: true });
      }

      getMembers();
      getGroupLeaders();
      getAdmins();
    }

    fetchData();
  }, [selectedadmin, selectedgroupleader]);

  useEffect(() => {
    filterAdminData("");
    filterGroupleaderData("");
    filteredMembersData("");
  }, [admins, groupleaders, members]);

  async function getAdmins() {
    const response = await fetch(GetAdminsAPI, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const a = await response.json();
    setAdmins(a);
  }

  async function getGroupLeaders() {
    let filter = selectedadmin.length === 0 ? {} : { mentor: selectedadmin };

    const response = await fetch(GetGroupLeadersAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(filter),
    });

    const g = await response.json();
    setGroupleaders(g);
  }

  async function getMembers() {
    let filter = {};

    if (selectedadmin.length !== 0) {
      filter = { mentor: selectedadmin };
      if (selectedgroupleader.length !== 0) {
        filter = { mentor: selectedadmin, groupleader: selectedgroupleader };
      }
    }

    const response = await fetch(GetMembersAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(filter),
    });

    const m = await response.json();
    setMembers(m);
  }

  return (
    <>
      <div className="sidebar">
        <div className="search-bar">
          <div className="search-container">
            <input
              type="text"
              className="search"
              onChange={(e) => handleChangeSearch(e.target.value)}
              value={searchText}
              name="search"
              placeholder="Search here..."
              autoComplete="off"
            />
          </div>
        </div>
        <button
          style={{ width: "200px", fontSize: "15px", textAlign: "left", border: "none", boxShadow: "none" }}
          className="btn adduser-btn"
          onClick={() => {
            navigate("/adduser");
          }}
        >
          {" "}
          <FaUserPlus className="faUserPlus" />
          Add User
        </button>
        <button
          style={{ width: "200px", fontSize: "15px", textAlign: "left", border: "none", boxShadow: "none" }}
          className="btn adduser-btn"
          onClick={handleClick}
        >
          <MdGroupAdd className="faUserPlus" />
          Add Users From File
          <input
            className="btn btn-secondary"
            id="fileInput"
            type="file"
            onChange={fileChangedHandler}
            style={{ display: "none" }}
            ref={inputRef}
          />
        </button>
        <button
          className="btn adduser-btn"
          style={{ width: "200px", fontSize: "15px", textAlign: "left", border: "none", boxShadow: "none" }}
          onClick={togglePopup}
        >
          <RiNotificationBadgeFill /> Event
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
                      {errors.startdate && (
                        <small className="form-text text-danger">
                          {errors.startdate}
                        </small>
                      )}
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
                      {errors.enddate && (
                        <small className="form-text text-danger">
                          {errors.enddate}
                        </small>
                      )}
                    </div>
                  </div>
                  <br />
                  <div>
                    <label htmlFor="title">Title:</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => handleChange("title", e.target.value)}
                      value={values.title}
                      name="title"
                      placeholder="Title"
                      required
                    />
                    {errors.title && (
                      <small className="form-text text-danger">
                        {errors.title}
                      </small>
                    )}
                  </div>
                  <br />
                  <div>
                    <label htmlFor="message">Message:</label>
                    <textarea
                      className="form-control"
                      onChange={(e) => handleChange("message", e.target.value)}
                      value={values.message}
                      name="message"
                      placeholder="Type here....."
                      required
                    />
                    {errors.message && (
                      <small className="form-text text-danger">
                        {errors.message}
                      </small>
                    )}
                  </div>
                  <br />
                  <label htmlFor="Photos">Photos:</label>{" "}
                  <input
                    type="file"
                    name="photos"
                    onChange={(e) => handleChange("photos", e.target.files)}
                    multiple
                  />
                  <br />
                  <button
                    onClick={handleCancel}
                    className="btn btn-style"
                    style={{ width: "100px", backgroundColor: "#495057" }}
                  >
                    Reset
                  </button>
                  <button
                    onClick={(e) => handleEventSubmit(e)}
                    className="btn btn-style"
                    style={{ width: "100px", marginLeft: "20px" }}
                  >
                    Add
                  </button>
                </>
              }
              handleClose={togglePopup}
            />
          )}
        </button>
      </div>
      <div className="main-container">


        {fileError && (
          <div className="file-error">
            {fileError}
            {headerFault && !flag && (
              <ul className="file-error-list">
                {headerFault &&
                  !flag &&
                  headerFault.map((h) => <li key={h}>{h}</li>)}
              </ul>
            )}
            {memberKey && !flag && (
              <ul className="file-error-list">
                {memberKey &&
                  !flag &&
                  memberKey.map((m) => (
                    <li key={m}>{`${m} : ${memberFault[m]}`}</li>
                  ))}
              </ul>
            )}
          </div>
        )}

        {filteredAdmins.length !== 0 && (
          <div className="list-container">
            <div className="list-header">
              <FaUserTie className="faUserTie" /> Admins
            </div>
            <div className="list-member-container d-flex align-content-start flex-wrap">
              {filteredAdmins.map((admin) => (
                <Member
                  handleChange={handlebarChange}
                  key={admin._id}
                  data={admin}
                />
              ))}
            </div>
          </div>
        )}

        {filteredGroupleaders.length !== 0 && (
          <div className="list-container">
            <div className="list-header">
              <FaUserFriends className="faUserFriends" /> Group Leaders
            </div>
            <div className="list-member-container d-flex align-content-start flex-wrap">
              {filteredGroupleaders.map((groupleader) => (
                <Member
                  handleChange={handlebarChange}
                  key={groupleader._id}
                  data={groupleader}
                />
              ))}
            </div>
          </div>
        )}

        {filteredMembers.length !== 0 && (
          <div className="list-container">
            <div className="list-header">
              <FaUsers className="faUsers" /> Members
            </div>
            <div className="list-member-container d-flex align-content-start flex-wrap">
              {filteredMembers.map((member) => (
                <Member
                  handleChange={handlebarChange}
                  key={member._id}
                  data={member}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
