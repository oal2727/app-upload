import React,{useState} from "react"
import ButtonComponent from "../Components/Button/ButtonComponent"
import FormInput from "../Components/Forms/FormInput"
import CardSocial from "../Components/CardSocial/CardSocial"
import { useForm } from "react-hook-form";
import LoginUser from "../Api/Login"
import {  toast } from 'react-toastify';
import {useHistory} from "react-router-dom"
const Login = ()=>{
    const {register,handleSubmit,errors,reset } = useForm();
    const history = useHistory();
    const onSubmit  = (data)=>{
        LoginUser.Register(data).then(response=>{
            toast.success("Register Sucessfull")
            history.push("/Login")
            reset()
        }).catch(err=> {
            toast.error(err.response.data.error)
        })
    }
    
    return(
        <CardSocial>
            <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput label={"First Name"} 
            name={"firstName"} 
            placeholder="Input First Name" 
            register={register}
            type="text"
            required />
             <p className="text-danger"> {errors.firstName && "*firstName  is required"}</p>
            <FormInput 
            label={"Last Name"} 
            register={register}
            name={"lastName"}  
            placeholder="Input Last Name" 
            type="text" 
            required/>
               <p className="text-danger"> {errors.lastName && "*lastName  is required"}</p>
             <FormInput 
             label={"Email"}  
             register={register}
             name={"email"}  
             placeholder="Input Email" 
             type="email" 
             required/>
                <p className="text-danger"> {errors.email && "*Email  is required"}</p>
             <FormInput 
             label={"Password"}
             register={register}  
             name={"password"}  
             placeholder="Input Password" 
             type="password" 
             required/>
              <p className="text-danger"> {errors.password && "*Password  is required"}</p>
            <ButtonComponent type="submit" variant="success">Register</ButtonComponent>
            </form>
        </CardSocial>
    )
}
export default Login;