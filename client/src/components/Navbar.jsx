import React from 'react'

import styled from 'styled-components'

const Nav = styled.nav`
  width: 100%;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: green;
`;


const Navbar = () => {
  return (
    <Nav className='navbar'>
        <div className='navbar__logo'>
            <h1>Logo</h1>
        </div>
    </Nav>
  )
}

export default Navbar