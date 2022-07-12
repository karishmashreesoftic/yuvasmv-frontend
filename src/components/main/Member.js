import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiPhoneLine, RiWhatsappLine, RiMessage2Line } from "react-icons/ri";
import { DeleteMemberAPI } from "../../services/APIRoutes";


export const Member = ({ data, handleChange }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");

  const deleteUser = async () => {

  const a = window.confirm(`Are you sure about deleting ${data.membertype} ${data.fullname}`)

  if(a===true){
    
    const response = await fetch(DeleteMemberAPI + `/${data._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const deleteddata = await response.json();
    if (deleteddata) {
      alert(deleteddata.fullname + " Deleted");
      window.location.reload();
    }
  }

  };

  const goToCarddetails = (e) => {
    if (e.target.nodeName === "DIV"){
      navigate(`/memberdetail/${data._id}`);
    } 

  };

  return (
    <div className="member-container card" onClick={goToCarddetails}>
      <div style={{ float: "left" }}>
        {data.membertype==="member"? null : <input
          type="checkbox"
          className="btn-check"
          id="membercheck"
          autoComplete="off"
          onChange={(e) => handleChange(e, data)}
        />}
      </div>
      <div className="member-image-container">
        <img src={data.profile.purl} alt="member-profile" />
      </div>
      <div className="member-name">{data.fullname}</div>
      <div className="member-icon-list d-flex">
        <div>
          <a href={"tel:+91" + data.mobile}>
            <RiPhoneLine className="RiPhoneLine" />
          </a>
        </div>
        <div>
          <a href={"https://wa.me:/91" + data.mobile}>
            <RiWhatsappLine className="RiWhatsappLine" />
          </a>
        </div>
        <div>
          <a href={"sms:+91" + data.mobile}>
            <RiMessage2Line className="RiMessage2Line" />
          </a>
        </div>
      </div>

      <div className="button-container">
        <Link
          to={`/memberdetail/${data._id}`}
          className="btn btn-edit"
          id="edit"
        >
          Edit
        </Link>
        <button className="btn-delete" onClick={deleteUser} id="delete">
          Delete
        </button>
      </div>

    </div>
  );
};
