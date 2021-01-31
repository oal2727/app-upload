import React from "react"
import Navbar from "./Components/Navbar/Navbar"
import UserContextProvider from "./context/UserContext"
function App() {
  return (
    
    <div className="App">
      <UserContextProvider>
          <Navbar/>
        </UserContextProvider>
    </div>
  );
}

export default App;
