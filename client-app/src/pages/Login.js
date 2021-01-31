import React from "react"
import ButtonComponent from "../Components/Button/ButtonComponent"
import FormInput from "../Components/Forms/FormInput"
import ButtonGoogle from "../Components/Button/ButtonGoogle"
import CardSocial from "../Components/CardSocial/CardSocial"
import { useForm } from "react-hook-form";
import Api from "../Api/Login"
import {  toast } from 'react-toastify';
import {setToken} from "../Api/Token"

const Login = ()=>{
    const {register,handleSubmit,errors } = useForm();
    const onSubmit  = (data)=>{
        Api.Login(data).then(response=>{
            sucessfullPage(response.data.token,"Login Sucessfull")
        }).catch(err=>{
            toast.error(err.response.data.error)
        })
    }
    const responseGoogle = (response)=>{
        Api.LoginSocial('google',{tokenId:response.tokenId}).then(response=>{
            sucessfullPage(response.data.token)
        }).catch(err => {
            toast.error(err.response.data.error)
        })
    }
 
    const sucessfullPage = async(token,message)=>{
        setToken(token)
        window.location.href="/Dashboard"
    }

    return(
        <CardSocial>
            <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput 
              label={"Email"}  
              register={register}
              name={"email"}  
              placeholder="Input Email" 
               type="email"
               required />
            <p className="text-danger"> {errors.email && "*email  is required"}</p>
             <FormInput 
             label={"Password"}  
            register={register}
            name={"password"}  
            placeholder="Input Password" 
             type="password"
             required />
             <p className="text-danger"> {errors.password && "*Password  is required"}</p>
            <ButtonComponent type="submit" variant="primary">Log In</ButtonComponent>
            <ButtonGoogle 
            responseGoogle={responseGoogle}/>
            </form>
        </CardSocial>
    )
}
export default Login;