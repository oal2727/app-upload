import React from "react"
import GoogleLogin from 'react-google-login';
const ButtonGoogle = ({responseGoogle}) =>{
    return(
        <GoogleLogin
        style={{display:"flex",margin:"auto"}}
        clientId={process.env.REACT_APP_KEY}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    )
}
export default ButtonGoogle;