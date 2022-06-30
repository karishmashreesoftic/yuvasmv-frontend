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
            const result = await fetch(ChangePasswordAPI, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization: token,
                                    },
                                    body: JSON.stringify(values),
                                  });
            const status = result.status
            const data = await result.json()
            if(data.error){
              throw new Error(data.error)
            }
            if(status===200){
              navigate("/",{replace:true});
            }
          }catch(error){
            alert(error.message)
          }

            setValues({
              oldpassword: "",  
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

export default useChangePasswordValidation