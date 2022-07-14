import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiPhoneLine, RiWhatsappLine, RiMessage2Line } from "react-icons/ri";
import { DeleteMemberAPI } from "../../services/APIRoutes";
import Popup from "../../screens/Popup";
export const Member = ({ data, handleChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const deleteUser = async () => {
  
    const response = await fetch(DeleteMemberAPI + `/${data._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const deleteddata = await response.json();
    if (deleteddata) {
      window.location.reload();
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
        <div><a href={"tel:+91" + data.mobile}><RiPhoneLine className="RiPhoneLine" /></a></div>
        <div><a href={"https://wa.me:/91" + data.mobile}><RiWhatsappLine className="RiWhatsappLine" /></a></div>
        <div><a href={"sms:+91" + data.mobile}><RiMessage2Line className="RiMessage2Line" /></a></div>
      </div>
      <div className="button-container">
        <Link
          to={`/memberdetail/${data._id}`}
          className="btn btn-edit"
          id="edit"
        >
          Edit
        </Link>
        <button className="btn-delete" onClick={togglePopup} id="delete">Delete</button>
        {isOpen &&
          <Popup
            content={
              <div>
                <div>Are you sure about deleting <p style={{fontStyle:"italic"}}>{data.membertype.charAt(0).toUpperCase()+data.membertype.slice(1)}</p> <p style={{fontSize:"20px"}}>{data.fullname} ?</p></div>
                <div>
                  <button onClick={togglePopup} className="btn btn-style" style={{width:"20%",backgroundColor: "#495057", height: "auto"}}>Cancel</button>
                  <button onClick={deleteUser} className="btn btn-style" style={{width:"20%",marginLeft: "20px", backgroundColor: "red", height: "auto"}}>Delete</button>
                </div>
              </div>
            }
            handleClose={togglePopup}
          />
        }
      </div>
    </div>
  );
};