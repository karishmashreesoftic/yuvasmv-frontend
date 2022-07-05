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
  const [searchText, setSearchText] = useState("");
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [filteredGroupleaders, setFilteredGroupleaders] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const { selectedadmin, selectedgroupleader, handleChange } = checkBoxValidation()

  let navigate = useNavigate();
  const token = localStorage.getItem("userToken");

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
  }, [admins,groupleaders,members]);


  async function getAdmins(){

      const response = await fetch(GetAdminsAPI, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
  
      const a = await response.json()
      setAdmins(a)

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
    setGroupleaders(g)
    
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
    setMembers(m)
    
  }

  return (
    <div style={{ marginTop: "70px", marginLeft: "30px", marginRight: "30px" }}>

      <div className="search-bar">
        <button className="btn adduser-btn" onClick={()=>{navigate("/adduser")}}>
            <FaUserPlus className="faUserPlus" />
            Add User
        </button>
        <div>
          <input
            type="text"
            className="search"
            onChange={(e) => handleChangeSearch(e.target.value)}
            value={searchText}
            name="search"
            placeholder="Search..."
            autoComplete="off"
          />
        </div>
      </div>

      {
        filteredAdmins.length!==0 &&
        <div className="list-container">
          <div className="list-header">
            <FaUserTie className="faUserTie" /> Admins
          </div>
          <div className="list-member-container d-flex align-content-start flex-wrap">
            {
              filteredAdmins.map((admin)=>
                <Member handleChange={handleChange} key={admin._id} data={admin} />
              )
            }
          </div>
        </div>
      }  
        

      {
        filteredGroupleaders.length!==0 &&
        <div className="list-container">
          <div className="list-header">
            <FaUserFriends className="faUserFriends" /> Group Leaders
          </div>
          <div className="list-member-container d-flex align-content-start flex-wrap">
            {
              filteredGroupleaders.map((groupleader)=>
                <Member handleChange={handleChange} key={groupleader._id} data={groupleader} />
              )
            }
          </div>
        </div>
      }


      {
        filteredMembers.length!==0 &&
        <div className="list-container">
          <div className="list-header">
            <FaUsers className="faUsers" /> Members
          </div>
          <div className="list-member-container d-flex align-content-start flex-wrap">
            {
              filteredMembers.map((member)=>
                <Member handleChange={handleChange} key={member._id} data={member} />
              )
            }
          </div>
        </div>
      }

    </div>
  );
};
