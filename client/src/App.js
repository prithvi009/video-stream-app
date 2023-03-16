import Register from "./scenes/register/Register";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Login from "./scenes/login/Login";
import Home from "./scenes/home/Home";
import {useSelector} from "react-redux";
import styled from "styled-components";

import Upload from "./scenes/upload/Upload";


const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;

function App() {
  const isAuth = Boolean(useSelector((state)=>state.authReducer.token));
  console.log(isAuth);
  return (
    <Container>
      <Router>
        {/* <Navbar/> */}
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/home" element={isAuth ? <Home/> : <Navigate to='/'/> }/>
          <Route path="/upload-video" element={ <Upload/> }/>

        </Routes>
      </Router>
    </Container>
  );
}

export default App;
