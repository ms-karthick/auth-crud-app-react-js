import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ListEmployee from './views/AdminPanel/Employee/ListEmployee';
import AddEmployee from './views/AdminPanel/Employee/AddEmployee';
import Login from './views/AdminPanel/Auth/Login';
import Register from './views/AdminPanel/Auth/Register';
import Dashboard from './views/AdminPanel/Dashboard/Dashboard';
import SideBar from './views/AdminPanel/SideBar/SideBar';
import { useState } from "react";
import { useSelector } from "react-redux";

export const BASE_URL = 'http://127.0.0.1:8000';
function App() {
   const [inactive, setInactive] = useState(false);
   const { token } = useSelector(state => state.auth);
   console.log(token);
  //  const pathName = window.location.pathname;
  //  const arr = pathName.toString().split("/");
  //  const currentPath = arr[arr.length -1];
 return (
<div className="App">
 <Router>
 {/* <Routes>
       <Route exact path ="/register" element= {!token ? <Register />: <Navigate to="/Dashboard" />} />
      <Route exact path ="/login" element= {!token ? <Login />: <Navigate to="/Dashboard" />} />
</Routes> */}

<Routes>
       <Route exact path ="/register" element= { <Register />} />
      <Route exact path ="/login" element= { <Login />} />
</Routes>
{/* {
token ?
      <SideBar 
          onCollapse={(inactive) => {
            // console.log(inactive);
            setInactive(inactive);
          }}
        />: <></>
} */}



      <SideBar 
          onCollapse={(inactive) => {
            // console.log(inactive);
            setInactive(inactive);
          }}
        />

         <div className={`container ${inactive ? "inactive" : ""}`}>     
    {/* <Routes>
      <Route exact path ="/Dashboard" element= { token ? <Dashboard />: <Navigate to="/login" />} />
      <Route exact path ="/Employee" element = {token ? <ListEmployee />:  <Navigate to="/login" />}  />
      <Route exact path ="/AddEmployee" element = {<AddEmployee />} /> 
    </Routes>  */}

<Routes>
      <Route exact path ="/Dashboard" element= {  <Dashboard /> } />
      <Route exact path ="/Employee" element = { <ListEmployee /> }  />
      <Route exact path ="/AddEmployee" element = {<AddEmployee />} /> 
    </Routes> 
    </div>
</Router> 
</div>
 );
}

export default App