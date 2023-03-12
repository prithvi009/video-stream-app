import Register from "./scenes/register/Register";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Navbar from "./components/navbar";
import Login from "./scenes/login/Login";
import Home from "./scenes/home/Home";
import {useSelector} from "react-redux";

import Upload from "./scenes/upload/Upload";


function App() {
  const isAuth = Boolean(useSelector((state)=>state.authReducer.token));
  console.log(isAuth);
  return (
    <div className="app">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/home" element={isAuth ? <Home/> : <Navigate to='/'/> }/>
          <Route path="/upload-video" element={ <Upload/> }/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
