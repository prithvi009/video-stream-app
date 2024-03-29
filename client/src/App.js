import Register from "./scenes/register/Register";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Login from "./scenes/login/Login";
import Home from "./scenes/home/Home";
import Video from "./scenes/home/Video";
import {useSelector} from "react-redux";
import styled from "styled-components";

import Upload from "./scenes/upload/Upload";


const Container = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  background-color: aliceblue;
`;

function App() {
  
  const isAuth = Boolean(useSelector(state => state.user.token));
  return (
    <Container>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/home" element={isAuth ? <Home/> : <Navigate to='/'/> }/>
          <Route path="/upload-video" element={isAuth ?  <Upload/> : <Navigate to='/'/> }/>
          <Route path="video">
            <Route path=":id" element={isAuth ? <Video />: <Navigate to='/'/>} />
          </Route>

        </Routes>
      </Router>
    </Container>
  );
}

export default App;
