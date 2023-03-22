import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import styled from 'styled-components'
import Cards from '../../components/Cards'


const Homes = styled.div`
  width: 90%;
  height: 100%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
`

const Home = () => {

  const [videos, setVideos] = useState([]);

  const token = useSelector((state)=> state.user.token);
  

  
  useEffect(()=>{
    const fetchVideos = async()=>{
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/video/getVideos`, {
        method: 'GET',
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      const data = await res.json();
      setVideos(data);
      
    }
    fetchVideos();
  }, [token, setVideos]);



  return (

    <Homes>
      {
        videos.map((video)=>(
          <Cards key={video._id} video={video}/>
        ))
      }
      
    </Homes>
  )
}
 
export default Home