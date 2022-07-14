import { useState } from "react";
import {
    GetAdminsAPI,
    GetGroupLeadersAPI,
    GetMembersAPI,
} from "../../services/APIRoutes";
import checkBoxValidation from "./useCheckBoxValidation";

const useFilterData = () => {

    const [admins, setAdmins] = useState([]);
    const [groupleaders, setGroupleaders] = useState([]);
    const [members, setMembers] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filteredAdmins, setFilteredAdmins] = useState([]);
    const [filteredGroupleaders, setFilteredGroupleaders] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const {
        selectedadmin,
        selectedgroupleader,
    } = checkBoxValidation();

    const token = localStorage.getItem("userToken");


    const filterAdminData = (value) => {
        console.log("in filter admin.....",value)
        console.log("admins...",admins)
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
        console.log("in filter groupleaders.....",value)
        console.log("groupleaders...",groupleaders)
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
        console.log("in filter members.....",value)
        console.log("members...",members)
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

      async function getAdmins() {
        console.log("in admins...")
        const response = await fetch(GetAdminsAPI, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
    
        const a = await response.json();
        setAdmins(a);
        console.log("admins...",a)
      }
    
      async function getGroupLeaders() {

        console.log("selectedadmin...",selectedadmin)
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

    
    return {
        admins, groupleaders, members,
        getAdmins, getGroupLeaders, getMembers,
        searchText, setSearchText,
        filteredAdmins, filteredGroupleaders, filteredMembers,
        filterAdminData, filterGroupleaderData, filteredMembersData
    
    }

}

export default useFilterData