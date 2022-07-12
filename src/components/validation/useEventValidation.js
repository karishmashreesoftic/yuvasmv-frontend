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
      if(val===""){
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

    let blank_fields = {}
    let flag= true

    for(let i in Object.keys(values)){
      if(values[Object.keys(values)[i]]===""){
        blank_fields = {
          ...blank_fields,
          [Object.keys(values)[i]]: "Please fill the field"   
        }
        flag=false
      }
    }

    if(flag===false){
      setErrors(blank_fields)
      return false
    }

    formData.append("startdate", values.startdate);
    formData.append("enddate", values.enddate);
    formData.append("title", values.title);
    formData.append("message", values.message);
    for (var i = 0; i < photos.length; i++) {
        formData.append("photos", photos[i]);
    }

    if (Object.keys(values).length !== 0 || Object.keys(errors).length === 0) {

    const response = await fetch(CreateEventAPI, {
        method: "POST",
        headers: {
            Authorization: token,
        },
        body: formData,
    });

    const result = response.status;

    if(result===200){
      setValues({
        startdate: "",
        enddate: "",
        title: "",
        message: "",
      });

    }
      return true;
    }
  };

  const handleCancel = () => {
    setValues({
      startdate: "",
      enddate: "",
      title: "",
      message: "",
    });
    setErrors({})
  };

  return { values, errors, handleSubmit, handleChange, handleCancel };
};

export default useEventValidation;
