import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { omit } from "lodash";
import data from "../../data/country.json"
import {CreateMemberAPI, EditMemberAPI} from "../../services/APIRoutes"
const validator = require('validator');
const token = localStorage.getItem("userToken")

const useNewUserValidation = () => {


    const [values, setValues] = useState({
        fullname: "",
        memberid: "",
        email: "",
        mobile: "",
        birthdate: "",
        groupleader: "",
        mentor: "",
        address: "",
        address2: "",
        city: "",
        zipcode: "",
        country: "",
        state: "",
        membertype: ""
    }); 
    const [errors, setErrors] = useState({});
    let navigate = useNavigate();

    const setInitials = (member) => {
        setValues({
                fullname: member.fullname,
                memberid: member.memberid,
                email: member.email,
                mobile: member.mobile,
                birthdate: member.birthdate,
                groupleader: member.groupleader,
                mentor: member.mentor,
                address: member.address,
                address2: member.address2,
                city: member.city,
                zipcode: member.zipcode,
                country: member.country,
                state: member.state,
                membertype: member.membertype
            });
    }

    const validate = (name, value) => {
        switch(name){

            case "fullname":
                if(!validator.isLength(value, {min: 3})){
                    setErrors({
                        ...errors,
                        fullname: "Name should have atleast 3 characters"
                    })
                }else{
                    let newObj = omit(errors, "fullname");
                    setErrors(newObj)
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

            case "zipcode":
                var country_data = data.filter((item)=>item.name===values.country)
                var re = new RegExp(country_data.exp);
                if(!re.test(value)){
                    setErrors({
                        ...errors,
                        zipcode: "Enter a valid zipcode"
                    });
                }else{
                    let newObj = omit(errors, "zipcode");
                    setErrors(newObj);
                }
                break;

            case "mobile":
                if(!validator.isLength(value, {min: 10})){
                    setErrors({
                        ...errors,
                        mobile: "Mobile number should have atleast 10 characters"
                    })
                }else{
                    let newObj = omit(errors, "mobile");
                    setErrors(newObj)
                }
                break;

            default:
                break;
        }
    }

    const handleChange = (name,val) => {
        validate(name, val);
        setValues({
            ...values,
            [name]: val,
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        
        if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {

            const response = await fetch(CreateMemberAPI, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: token,
                },
                body: JSON.stringify(values)
              });
          
              const user = await response.json()
              if(user){
                navigate("/home")
              }
      
            setValues({
                fullname: "",
                memberid: "",
                email: "",
                mobile: "",
                birthdate: "",
                groupleader: "",
                mentor: "",
                address: "",
                address2: "",
                city: "",
                zipcode: "",
                country: "",
                state: "",
                membertype: ""
            });

      
          } else {
            var t = "";
            var val = Object.values(errors);
            val.forEach((error) => {
              t += error + `\n`;
            })
            alert(t);
        }        
    }

    const handleUpdate = async (event) => {

        event.preventDefault();

        const id = localStorage.getItem("memberId")
        
        if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {

            const response = await fetch(EditMemberAPI+"/"+id, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: token,
                },
                body: JSON.stringify(values)
              });
          
              const user = await response.json()
              if(user){
                navigate("/home")
              }
              localStorage.removeItem("memberId")
      
            setValues({
                fullname: "",
                memberid: "",
                email: "",
                mobile: "",
                birthdate: "",
                groupleader: "",
                mentor: "",
                address: "",
                address2: "",
                city: "",
                zipcode: "",
                country: "",
                state: "",
                membertype: ""
            });
      
          } else {
            var t = "";
            var val = Object.values(errors);
            val.forEach((error) => {
              t += error + `\n`;
            })
            alert(t);
        }        
    }

    const handleCancel = () => {

        setValues({
            fullname: "",
            memberid: "",
            email: "",
            mobile: "",
            birthdate: new Date(),
            groupleader: "",
            mentor: "",
            address: "",
            address2: "",
            city: "",
            zipcode: "",
            country: "",
            state: "",
            membertype: ""
        });

    }

    return {values, errors, handleSubmit, handleChange, handleCancel, setInitials, handleUpdate }
}

export default useNewUserValidation