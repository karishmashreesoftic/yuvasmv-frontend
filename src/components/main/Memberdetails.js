import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import newUserValidation from "../validation/useNewUserValidation";
import { AllAdminsAPI, GetGroupLeadersAPI, MemberAPI } from "../../services/APIRoutes";

export const Memberdetails = () => {
  const {id} = useParams();
  const {
    values,
    errors,
    handleChange,
    handleUpdate,
    handleCancel,
    setInitials
  } = newUserValidation();
  const [admins, setAdmins] = useState([])
  const [groupleaders, setGroupleaders] = useState([])


  const token = localStorage.getItem("userToken");

  useEffect(() => {

     async function fetchData(){

      const response = await fetch(MemberAPI+`/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json", 
          Authorization: token,
        },
      });

      const t = await response.json();
      setInitials(t.member)

      const aresponse = await fetch(AllAdminsAPI, {
        method: "GET",
        headers: {
          "Content-Type": "application/json", 
          Authorization: token,
        },
      });

      const a = await aresponse.json()
      setAdmins(a.list)

      const filter = {
        "mentor": values.mentor
      }

      const gresponse = await fetch(GetGroupLeadersAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
          Authorization: token,
        },
        body: JSON.stringify(filter)
      });
  
      const g = await gresponse.json()
      setGroupleaders(g.list)
      
    }

    fetchData();

  }, [])

  return (
    <div>
      <div className="addusercontainer">
        <form >
          <div className="form-row">
            <div className="form-group col-md-8">
              <label htmlFor="fullname">
                Full Name
                <span
                  style={{ display: "inline" }}
                  className="form-text text-danger"
                >
                  {" "}
                  *
                </span>
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => handleChange("fullname", e.target.value)}
                value={values.fullname}
                name="fullname"
                id="fullname"
                placeholder="Full Name"
                required
              />
              {errors.fullname && (
                <small className="form-text text-danger">{errors.fullname}</small>
              )}
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="memberid">Member Id</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => handleChange("memberid", e.target.value)}
                value={values.memberid}
                name="memberid"
                id="memberid"
                placeholder="Member Id"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="email">
                Email
                <span
                  style={{ display: "inline" }}
                  className="form-text text-danger"
                >
                  {" "}
                  *
                </span>
              </label>
              <input
                type="email"
                className="form-control"
                onChange={(e) => handleChange("email", e.target.value)}
                value={values.email}
                name="email"
                id="email"
                placeholder="Email"
                required
              />
              {errors.email && (
                <small className="form-text text-danger">{errors.email}</small>
              )}
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="mobile">
                Mobile Number
                <span
                  style={{ display: "inline" }}
                  className="form-text text-danger"
                >
                  {" "}
                  *
                </span>
              </label>
              <input
                type="tel"
                className="form-control"
                onChange={(e) => handleChange("mobile", e.target.value)}
                value={values.mobile}
                id="mobile"
                name="mobile"
                required
              />
              {errors.mobile && (
                <small className="form-text text-danger">{errors.mobile}</small>
              )}
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="membertype">
                Member Type
                <span
                  style={{ display: "inline" }}
                  className="form-text text-danger"
                >
                  {" "}
                  *
                </span>
              </label>
              <select
                className="form-control"
                onChange={(e) => handleChange("membertype", e.target.value)}
                name="membertype"
                id="membertype"
                value={values.membertype ? values.membertype : ""}
                required
              >
                <option value="" disabled>
                  Select Member Type...
                </option>
                <option value="admin">Admin</option>
                <option value="groupleader">Group Leader</option>
                <option value="member">Member</option>
              </select>
              {errors.membertype && (
                <small className="form-text text-danger">
                  {errors.membertype}
                </small>
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-2">
              <label htmlFor="birthdate">
                Birth Date
                <span
                  style={{ display: "inline" }}
                  className="form-text text-danger"
                >
                  {" "}
                  *
                </span>
              </label>
              <input
                type="date"
                className="form-control"
                onChange={(e) => handleChange("birthdate", e.target.value)}
                value={values.birthdate.substring(0,10)}
                id="birthdate"
                name="birthdate"
                required
              />
              {errors.birthdate && (
                <small className="form-text text-danger">
                  {errors.birthdate}
                </small>
              )}
            </div>
            <div className="from-group col-md-5">
              <label htmlFor="groupleader">
                Group Leader
                {values.membertype === "admin" ||
                values.membertype === "groupleader" ? null : (
                  <span
                    style={{ display: "inline" }}
                    className="form-text text-danger"
                  >
                    {" "}
                    *
                  </span>
                )}
              </label>
              <select
                className="form-control"
                value={values.groupleader ? values.groupleader : ""}
                onChange={(e) => handleChange("groupleader", e.target.value)}
                name="groupleader"
                id="groupleader"
                placeholder="Select Group Leader"
                required={
                  values.membertype === "admin" ||
                  values.membertype === "groupleader"
                    ? false
                    : true
                }
                disabled={
                  values.membertype === "admin" ||
                  values.membertype === "groupleader"
                    ? true
                    : false
                }
              >
                <option value="" disabled>
                  Select Group Leader...
                </option>
                {
                  groupleaders.map((g)=>
                    <option key={g.fullname} value={g.fullname}>{g.fullname}</option>
                  )
                }
              </select>
              {errors.groupleader && (
                <small className="form-text text-danger">
                  {errors.groupleader}
                </small>
              )}
            </div>
            <div className="from-group col-md-5">
              <label htmlFor="mentor">
                Mentor
                {values.membertype === "admin" ? null : (
                  <span
                    style={{ display: "inline" }}
                    className="form-text text-danger"
                  >
                    {" "}
                    *
                  </span>
                )}
              </label>
              <select
                className="form-control"
                value={values.mentor ? values.mentor : ""}
                onChange={(e) => handleChange("mentor", e.target.value)}
                name="mentor"
                id="mentor"
                placeholder="Select Mentor"
                required={values.membertype === "admin" ? false : true}
                disabled={values.membertype === "admin" ? true : false}
              >
                <option value="" disabled>
                  Select Mentor...
                </option>
                {
                  admins.map((a)=>
                    <option key={a.fullname} value={a.fullname}>{a.fullname}</option>
                  )
                }
              </select>
              {errors.groupleader && (
                <small className="form-text text-danger">
                  {errors.groupleader}
                </small>
              )}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="address">
              Address
              <span
                style={{ display: "inline" }}
                className="form-text text-danger"
              >
                {" "}
                *
              </span>
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => handleChange("address", e.target.value)}
              value={values.address}
              name="address"
              id="address"
              placeholder="1234 Main St"
              required
            />
            {errors.address && (
              <small className="form-text text-danger">{errors.address}</small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="address2">Address 2</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => handleChange("address2", e.target.value)}
              value={values.address2}
              name="address2"
              id="address2"
              placeholder="Apartment, studio, or floor"
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="country">
                Country
                <span
                  style={{ display: "inline" }}
                  className="form-text text-danger"
                >
                  {" "}
                  *
                </span>
              </label>
              <CountryDropdown
                className="form-drop"
                value={values.country}
                onChange={(e) => handleChange("country", e)}
              />
              {errors.country && (
                <small className="form-text text-danger">{errors.country}</small>
              )}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="state">
                State
                <span
                  style={{ display: "inline" }}
                  className="form-text text-danger"
                >
                  {" "}
                  *
                </span>
              </label>
              <RegionDropdown
                className="form-drop"
                country={values.country}
                value={values.state}
                onChange={(e) => handleChange("state", e)}
              />
              {errors.state && (
                <small className="form-text text-danger">{errors.state}</small>
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="city">
                City
                <span
                  style={{ display: "inline" }}
                  className="form-text text-danger"
                >
                  {" "}
                  *
                </span>
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => handleChange("city", e.target.value)}
                value={values.city}
                name="city"
                id="city"
                placeholder="City"
                required
              />
              {errors.city && (
                <small className="form-text text-danger">{errors.city}</small>
              )}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="zipcode">
                Zip Code
                <span
                  style={{ display: "inline" }}
                  className="form-text text-danger"
                >
                  {" "}
                  *
                </span>
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => handleChange("zipcode", e.target.value)}
                value={values.zipcode}
                name="zipcode"
                id="zipcode"
                placeholder="Zip Code"
              />
              {errors.zipcode && (
                <small className="form-text text-danger">{errors.zipcode}</small>
              )}
            </div>
          </div>

          <div className="adduserform-btn">
            <button
              onClick={handleCancel}
              style={{ width: "45%", backgroundColor: "#495057" }}
              type="button"
              className="btn btn-style"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              style={{ width: "45%" }}
              type="button"
              className="btn btn-style"
            >
              Update
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
