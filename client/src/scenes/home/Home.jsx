import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Cards from '../../components/Cards'

const Button = styled.button`
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: #7098ed;
  color: pink;
`

const Home = () => {

  // const handleOnClick= async()=>{

  // }

  const navigate = useNavigate();
  return (
    <div>
      <Cards/>
      <Button onClick={()=> navigate('/upload-video') }>upload video</Button>
    </div>
  )
}
 
export default Home