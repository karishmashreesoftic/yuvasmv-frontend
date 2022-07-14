import { useState } from "react";

const useCheckBoxValidation = () => {
  const [selectedadmin, setSelectedAdmin] = useState([]);
  const [selectedgroupleader, setSelectedGroupleader] = useState([]);

  const addName = (checked, type, name) => {
    console.log("addName")
    switch (type) {
      case "admin":
        setSelectedAdmin(checked ? [...selectedadmin, name] : selectedadmin.filter((_) => _ !== name));
        break;

      case "groupleader":
        setSelectedGroupleader(
          checked
            ? [...selectedgroupleader, name]
            : selectedgroupleader.filter((_) => _ !== name)
        );
        break;

      default:
        break;
    }
  };

  const handlebarChange = (e, data) => {
    addName(e.target.checked, data.membertype, data.fullname);
  };

  return { handlebarChange, selectedadmin, selectedgroupleader };
};

export default useCheckBoxValidation;
