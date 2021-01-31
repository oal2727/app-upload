import React from "react"
import {Switch} from "react-router-dom";
import PublicRouterPage from "../../TypePage/PublicRouterPage"
import PrivateRouterPage from "../../TypePage/PrivateRouterPage"
import PageLogin from "../../pages/Login"
import PageRegister from "../../pages/Register"
import PageDashboard from "../../pages/Dashboard"
const NavBody = ()=>{
    return(
        <Switch>
            <PublicRouterPage component={PageLogin} path="/"  exact/>
            <PublicRouterPage component={PageLogin} path="/Login"/>
            <PublicRouterPage component={PageRegister} path="/Register"/>
            <PrivateRouterPage component={PageDashboard} path="/Dashboard" />
        </Switch>
    )
}
export default NavBody;