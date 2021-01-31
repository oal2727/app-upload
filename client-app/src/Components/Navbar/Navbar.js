import React,{useEffect,useState} from "react"
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {BrowserRouter as Router,Link} from "react-router-dom"
import NavDropdown  from 'react-bootstrap/NavDropdown'
import NavBody from "./NavBody"
import Login from "../../Api/Login"
import {deleteToken,getToken} from "../../Api/Token"
import {UserContext} from "../../context/UserContext"
import Spinner from 'react-bootstrap/Spinner'

const Dashboard = ()=>{
  const [name,setName] = useState("")
  const {state,dispatch} = React.useContext(UserContext)
  useEffect(()=>{
    const getData = async ()=> {
      if(getToken()){
        const data = await Login.Me()
        if(data){
          setName(data.data.firstName + " "+data.data.lastName)
          dispatch({type:"TOOGLE_AUTHENTICATED",payload:true})
          dispatch({type:"USER_AUTHENTICATED",payload:data.data})
        }else{
          setName("")
        }
      }else{
      }
    }    
   
    getData()
},[])
  const logOut = ()=>{
    setName("User");
    deleteToken();
    dispatch({type:"TOOGLE_AUTHENTICATED",payload:false})
  }

    return(
          <div>
            {
              state.spinner ?
             <div style={{marginTop:50}}>
                <Spinner animation="border" style={{fontSize:35}} variant="primary" />
               </div>
              :
              <Router>
                <Navbar collapseOnSelect  expand="lg"  bg="light" variant="light">
                <Navbar.Brand as={Link} to="/">App Authentication</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {
            state.authenticated ? 
          <Nav className="ml-auto">
            <NavDropdown title={state.userAuthneticated.firstName+" "+state.userAuthneticated.lastName} id="collasible-nav-dropdown">
              <NavDropdown.Item  onClick={()=>logOut()} as={Link} to="/" >Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          :
          <Nav>
             <Nav.Link as={Link} to="/Dashboard">Dashboard</Nav.Link>
             <Nav.Link as={Link} to="/Login">Login</Nav.Link>
             <Nav.Link as={Link} to="/Register">Register</Nav.Link>
          </Nav>

          }
        </Navbar.Collapse>
              </Navbar>
              <NavBody name={name}/>
            </Router>
            }
          </div>
    )
}
export default Dashboard;