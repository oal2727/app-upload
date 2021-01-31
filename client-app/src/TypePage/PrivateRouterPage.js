import React from "react"
import {Route,Redirect} from 'react-router-dom'
import {getToken} from '../Api/Token'

const PrivateRoute = ({component:Component,...rest})=>{
    return(
        <Route {...rest} render={(props) => (
            getToken()
                ? <Component {...props} />
                  : <Redirect path="/"/>
              )} />
    )
}
export default PrivateRoute;