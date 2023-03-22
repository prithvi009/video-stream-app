import React from 'react'
import { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStart, fetchSuccess, fetchFailure } from '../../state/videoSlice';

import {AiOutlineLike, AiOutlineDislike} from "react-icons/ai";
import './video.css'


const Container = styled.div`
  display: flex;
  gap: 24px;
`;
const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div``;

const VideoFrame = styled.video`
  max-height: 85vh;
  width: 100%;
  object-fit: cover;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  
  margin: 15px 20px;
   
`;


const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 20px
`;

const Info = styled.span`

`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;

`;





const Video = () => {
    const dispatch = useDispatch();
    const token = useSelector((state)=> state.user.token);
    const video = useSelector((state)=> state.video.currentVideo);
    const path = useLocation().pathname.split("/")[2];

    const fetchData = async () => {
        try{

            const videoRes = await fetch(`http://localhost:5001/api/v1/video/${path}`,{
                method: 'GET',
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            const videoData = await videoRes.json();
            dispatch(
                fetchSuccess(videoData)
            );


        }
        catch(error){
            fetchFailure();
            console.log(error)
        }
    }


    useEffect(()=>{
        fetchStart();
        fetchData();
    }, [path]);



  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={video.videoUrl} controls />
        </VideoWrapper>
        <Title>{video.title}</Title>
        <Details>
            <Info>
                views • 
            </Info>
            <Buttons>
              <AiOutlineLike className='like'/>
              <AiOutlineDislike className='dislike'/>
            </Buttons>
        </Details>
        </Content>
    </Container>
  )
}

export default Video