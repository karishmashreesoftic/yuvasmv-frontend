import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { omit } from "lodash";
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
        state: "",
        membertype: ""
    }); 
    const [errors, setErrors] = useState({});
    const [addUserError, setAddUserError] = useState("")
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
                if(!validator.isNumeric(value)){
                    setErrors({
                        ...errors,
                        zipcode: "Please enter only numeric characters"
                    })
                }else if(!validator.isLength(value, {min: 6,max:6})){
                    setErrors({
                        ...errors,
                        zipcode: "Please enter valid zipcode of 6 numbers only"
                    })
                }else {
                    let newObj = omit(errors, "zipcode");
                    setErrors(newObj)
                }
                break;

            case "mobile":
                if(!validator.isNumeric(value)){
                    setErrors({
                        ...errors,
                        mobile: "Please enter only numeric characters"
                    })
                }else if(!validator.isLength(value, {min: 10,max:10})){
                    setErrors({
                        ...errors,
                        mobile: "Please enter valid mobile number of 10 numbers only"
                    })
                }else {
                    let newObj = omit(errors, "mobile");
                    setErrors(newObj)
                }
                break;

            case "membertype":
                if(value==="admin"){
                    let newObj = omit(errors, ["mentor","groupleader","membertype"]);
                    setErrors(newObj)
                }else if(value==="groupleader"){
                    let newObj = omit(errors, ["groupleader","membertype"]);
                    setErrors(newObj)
                }else if(value==="member"){
                    let newObj = omit(errors, ["membertype"]);
                    setErrors(newObj)
                }
                break;

            default:
                if(name!=="address2" && value===""){
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
        let blank_fields = {}

        for(let i in Object.keys(values)){
            if(Object.keys(values)[i]!=="address2" && !values[Object.keys(values)[i]]){

                if((Object.keys(values)[i]==="mentor" || Object.keys(values)[i]==="groupleader") && values.membertype==="admin"){

                }else if(Object.keys(values)[i]==="groupleader" && values.membertype==="groupleader"){

                }else{
                    blank_fields = {...blank_fields, [Object.keys(values)[i]]: "Please fill this field"}
                }
 
            }
        }
        blank_fields = {...errors, ...blank_fields}

        setErrors(blank_fields)

        if (Object.keys(blank_fields).length === 0 && Object.keys(values).length !== 0) {
            console.log("if")

            const response = await fetch(CreateMemberAPI, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: token,
                },
                body: JSON.stringify(values)
              });
          
              const user = await response.json()
              if(user.error){
                setAddUserError(user.error)
              }else{
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
                    state: "",
                    membertype: ""
                });
                navigate("/home")
                
              }


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
              if(user.error){
                setAddUserError(user.error)
              }
              if(user.member){
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
                state: "",
                membertype: ""
            });
      
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
            state: "",
            membertype: ""
        });

    }

    return {values, errors, handleSubmit, handleChange, handleCancel, setInitials, handleUpdate, addUserError }
}

export default useNewUserValidation