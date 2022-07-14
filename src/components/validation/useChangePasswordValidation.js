import { useState } from "react";
import { omit } from "lodash";
import { useNavigate } from 'react-router-dom';
import { ChangePasswordAPI } from '../../services/APIRoutes'

const useChangePasswordValidation = () => {

    const [values, setValues] = useState({
        oldpassword: "",
        password: "",
        cpassword: ""
    })
    const [errors, setErrors] = useState({});
    let navigate = useNavigate();
    const token = localStorage.getItem("userToken");

    const validate = (name, value) => {

      switch (name) {
        case "password":
          if (values.oldpassword===value) {
            setErrors({
            ...errors,
            password: "Old Password and New Password can't be same",
            });
          } else {
              let newObj = omit(errors, "password");
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
            const result = await fetch(ChangePasswordAPI, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization: token,
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
              oldpassword: "",  
              password: "",
              cpassword: ""
            });

        }
    };
    
    return {values, errors, handleSubmit, handleChange}

}

export default useChangePasswordValidation