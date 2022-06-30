import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { omit } from "lodash";
import {SignUpAPI} from '../../services/APIRoutes'
const validator = require('validator')

const useSignupValidation = () => {

const [values, setValues] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
});
const [errors, setErrors] = useState({});
let navigate = useNavigate();
 
  const validate = (name, value) => {
    switch (name) {
      case "fname":
        if (!validator.isLength(value, { min: 3 })) {
          setErrors({
            ...errors,
            fname: "First name atleast have 3 letters",
          });
        } else {
          let newObj = omit(errors, "fname");
          setErrors(newObj);
        }
        break;

      case "email":
        if (!validator.isEmail(value)) {
          setErrors({
            ...errors,
            email: "Enter a valid email address",
          });
        } else {
          let newObj = omit(errors, "email");
          setErrors(newObj);
        }
        break;

      case "cpassword":
        if (values.password!==value) {
          setErrors({
            ...errors,
            cpassword: "Password does not match",
          });
        } else {
          let newObj = omit(errors, "cpassword");
          setErrors(newObj);
        }
        break;

      default:
        break;
    }
  };

  const handleChange = (event) => {
    event.persist();
    let name = event.target.name;
    let val = event.target.value;
    validate(name, val);
    setValues({
      ...values,
      [name]: val,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {

      try{
        const result = await fetch(SignUpAPI, {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify(values),
                              });
        const status = result.status
        const data = await result.json()
        if(data.error){
          throw new Error(data.error)
        }else if(status===201){
          localStorage.setItem('userToken', data.token)
          navigate("/home",{replace:true});
        }
      }catch(error){
        alert(error.message)
      }

      setValues({
        fname: "",
        lname: "",
        email: "",
        password: "",
        cpassword: "",
      });

    } else {
      var t = "";
      var val = Object.values(errors);
      val.forEach((error) => {
        t += error + `\n`;
      })
      alert(t);
    }
  };


  return {values, errors, handleSubmit, handleChange}

}

export default useSignupValidation