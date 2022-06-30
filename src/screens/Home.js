import React, { useEffect, useState } from "react";
import { HomeAPI, GetAdminsAPI, GetGroupLeadersAPI, GetMembersAPI } from "../services/APIRoutes";
import { useNavigate } from "react-router-dom";
import { Member } from "../components/main/Member";
import { FaUserPlus, FaUserTie, FaUserFriends, FaUsers } from "react-icons/fa";
import checkBoxValidation from '../components/validation/useCheckBoxValidation'

export const Home = () => {

  const [admins, setAdmins] = useState([])
  const [groupleaders, setGroupleaders] = useState([])
  const [members, setMembers] = useState([])
  const { selectedadmin, selectedgroupleader, handleChange } = checkBoxValidation()

  let navigate = useNavigate();
  const token = localStorage.getItem("userToken");
  
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


  async function getAdmins(){

      const response = await fetch(GetAdminsAPI, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
  
      const a = await response.json()
      setAdmins(a.list)

  }



  async function getGroupLeaders(){

    let filter = selectedadmin.length===0 ? {} : { "mentor" : selectedadmin}

    const response = await fetch(GetGroupLeadersAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(filter)
    });

    const g = await response.json()
    setGroupleaders(g.list)
    
  }



  async function getMembers(){

    let filter = {}

    if(selectedadmin.length!==0){
      filter = {"mentor" : selectedadmin}
      if(selectedgroupleader.length!==0){
        filter = {"mentor" : selectedadmin, "groupleader": selectedgroupleader}
      }
    }

    const response = await fetch(GetMembersAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(filter)
    });

    const m = await response.json()
    setMembers(m.list)
    
  }

  return (
    <div style={{ marginTop: "70px", marginLeft: "30px" }}>

      <div>
        <button className="btn adduser-btn" onClick={()=>{navigate("/adduser")}}>
            <FaUserPlus className="faUserPlus" />
            Add User
        </button>
      </div>

      {
        admins.length!==0 &&
        <div className="list-container">
          <div className="list-header">
            <FaUserTie className="faUserTie" /> Admins
          </div>
          <div className="list-member-container d-flex align-content-start flex-wrap">
            {admins &&
              admins.map((admin)=>
                <Member handleChange={handleChange} key={admin._id} data={admin} />
              )
            }
          </div>
        </div>
      }  
        

      {
        groupleaders.length!==0 &&
        <div className="list-container">
          <div className="list-header">
            <FaUserFriends className="faUserFriends" /> Group Leaders
          </div>
          <div className="list-member-container d-flex align-content-start flex-wrap">
            {
              groupleaders.map((groupleader)=>
                <Member handleChange={handleChange} key={groupleader._id} data={groupleader} />
              )
            }
          </div>
        </div>
      }

      {
        members.length!==0 &&
        <div className="list-container">
          <div className="list-header">
            <FaUsers className="faUsers" /> Members
          </div>
          <div className="list-member-container d-flex align-content-start flex-wrap">
            {
              members.map((member)=>
                <Member handleChange={handleChange} key={member._id} data={member} />
              )
            }
          </div>
        </div>
      }

    </div>
  );
};
