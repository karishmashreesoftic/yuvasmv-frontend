import { useState } from "react";
import { omit } from "lodash";
import { CreateEventAPI } from "../../services/APIRoutes";

const useEventValidation = () => {
  const [values, setValues] = useState({
    startdate: "",
    enddate: "",
    title: "",
    message: "",
  });
  const [errors, setErrors] = useState({})
  const [photos, setPhotos] = useState({});
  const token = localStorage.getItem("userToken");
  let formData = new FormData();

  const handleChange = (name, val) => {
    if (name === "photos") {
      setPhotos(val);
    } else {
      if(val.length===0){
        setErrors({
          ...errors,
          [name]: "Please fill the field",
        });
      }else {
        let newObj = omit(errors, name);
        setErrors(newObj);
      } 
      setValues({
        ...values,
        [name]: val,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    formData.append("startdate", values.startdate);
    formData.append("enddate", values.enddate);
    formData.append("title", values.title);
    formData.append("message", values.message);
    for (var i = 0; i < photos.length; i++) {
        formData.append("photos", photos[i]);
    }

    if (Object.keys(values).length !== 0) {

    const response = await fetch(CreateEventAPI, {
        method: "POST",
        headers: {
            Authorization: token,
        },
        body: formData,
    });

    const result = response.status;

    console.log("status...",result)

      setValues({
        startdate: "",
        enddate: "",
        title: "",
        message: "",
      });

    }
  };

  const handleCancel = () => {
    setValues({
      startdate: "",
      enddate: "",
      title: "",
      message: "",
    });
  };

  return { values, errors, handleSubmit, handleChange, handleCancel };
};

export default useEventValidation;
