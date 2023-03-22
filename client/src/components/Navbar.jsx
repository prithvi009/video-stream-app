import React from 'react'

import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom';
import { setLogout } from '../state/authSlice';

const Nav = styled.nav`
  width: 100%;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  background-color: #7098ed;
`;
const Navs= styled.div`
  width: 80%;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 10px;
`

const Button = styled.button`
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: rgba(555, 255, 255, 0.15);
  color: black;
  cursor: pointer;
  margin: 0 30px;
`


const Navbar = () => {
  const isAuth = Boolean(useSelector(state => state.user.token));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Nav className='navbar'>
    {
      isAuth ? (
        <Navs>
            <Link to='/home' style={{ textDecoration: 'none' , color: 'black'} }>
            <h1>Logo</h1>
            </Link>
            <div>
              <Button onClick={()=> navigate('/upload-video') }>upload video</Button>
              <Button onClick={()=> {
                dispatch(setLogout())
              } }>logOut</Button>
            </div>
        </Navs>
        ) : (
        <>
        <div className='navbar__logo'>
            <h1>Logo</h1>
        </div>
      </>
      )
    }

    </Nav>
    
  )
}

export default Navbar