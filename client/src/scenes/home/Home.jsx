import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
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

  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();
  const token = useSelector((state)=> state.user.token);
  

  

  const fetchVideos = async()=>{
    const res = await fetch("http://localhost:5001/api/v1/video/getVideos", {
      method: 'GET',
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    const data = await res.json();
    setVideos(data);
    
  }
  useEffect(()=>{
    fetchVideos();
  }, []);



  return (

    <div>
      {
        videos.map((video)=>(
          <Cards key={video._id} video={video}/>
        ))
      }
      <Button onClick={()=> navigate('/upload-video') }>upload video</Button>
    </div>
  )
}
 
export default Home