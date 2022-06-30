import { useState } from "react";
import { omit } from "lodash";
import { useNavigate } from 'react-router-dom';
import {LoginAPI} from '../../services/APIRoutes'
const validator = require('validator')

const useSignupValidation = () => {

    const [values, setValues] = useState({
        userid: "",
        password: ""
    })
    const [errors, setErrors] = useState({});
    let navigate = useNavigate();

    const validate = (name, value) => {

      switch (name) {
  
        case "userid":
          if(validator.isInt(value)){
            if(!validator.isLength(value, { min: 10 })){
              setErrors({
                ...errors,
                userid: "Enter a valid number",
              });
            }else {
              let newObj = omit(errors, "userid");
              setErrors(newObj);
            }          
          }else{
            if (!validator.isEmail(value)) {
              setErrors({
                ...errors,
                userid: "Enter a valid email address",
              });
            }else {
              let newObj = omit(errors, "userid");
              setErrors(newObj);
            }
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
            const result = await fetch(LoginAPI, {
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
              ...values,
              password: ""
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