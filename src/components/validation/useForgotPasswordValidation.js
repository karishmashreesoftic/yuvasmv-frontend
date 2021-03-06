import { useState } from "react";
import { omit } from "lodash";
import { useNavigate } from 'react-router-dom';
import {ForgotPasswordAPI} from '../../services/APIRoutes'
const validator = require('validator')

const useForgotPasswordValidation = () => {

    const [values, setValues] = useState({
        userid: "",
        password: "",
        cpassword: ""
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
          if(value===""){
            setErrors({
                ...errors,
                [name]: "Please fill field"
            }) 
          }else{
              let newObj = omit(errors, name);
              setErrors(newObj)
          }
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

        let blank_fields = {}
        for(let i in Object.keys(values)){
            if(!values[Object.keys(values)[i]]){
              blank_fields = {...blank_fields, [Object.keys(values)[i]]: "Please fill this field"}
            }
        }
        blank_fields = {...errors, ...blank_fields}
        setErrors(blank_fields)
        
        if (Object.keys(blank_fields).length === 0 && Object.keys(values).length !== 0) {

          try{
            const result = await fetch(ForgotPasswordAPI, {
                                    method: "POST",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(values),
                                  });
            const data = await result.json()
            if(data.error){
               throw new Error(data.error)
            }
            navigate("/",{replace:true});

          }catch(error){
            alert(error.message)
          }

            setValues({
              ...values,  
              password: "",
              cpassword: ""
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

export default useForgotPasswordValidation