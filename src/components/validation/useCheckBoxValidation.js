import { useState } from "react";

const useCheckBoxValidation = () => {
  const [selectedadmin, setSelectedAdmin] = useState([]);
  const [selectedgroupleader, setSelectedGroupleader] = useState([]);

  const addName = (checked, type, name) => {
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

  const handleChange = (e, data) => {
    addName(e.target.checked, data.membertype, data.fullname);
  };

  return { handleChange, selectedadmin, selectedgroupleader };
};

export default useCheckBoxValidation;
