import React,{useReducer,createContext} from "react"
import {UserReducer} from "./UserReducer"
export const UserContext = createContext();

const UserContextProvider = ({children})=>{
    const initialState={
        open:false,
        authenticated:false,
        spinner:false,
        userAuthneticated:{firstName:"",lastName:"",email:"",id:""},
        imagenes:[],
    }
    const [state,dispatch] = useReducer(UserReducer,initialState);
    const value = { state, dispatch };
    return (
      <UserContext.Provider value={value}>
        {children}
      </UserContext.Provider>
      )
}
export default UserContextProvider;