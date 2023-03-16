import React from 'react'
import { useNavigate } from 'react-router-dom'
// import Cards from '../../components/Cards'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div>
      {/* <Cards/> */}
      <button onClick={()=> navigate('/upload-video') }>upload video</button>
    </div>
  )
}
 
export default Home