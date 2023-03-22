import React from 'react'
import { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStart, fetchSuccess, fetchFailure } from '../../state/videoSlice';
import { useState } from 'react';

const Container = styled.div`
  display: flex;
  gap: 24px;
`;


const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;


const Video = () => {
    const dispatch = useDispatch();
    const token = useSelector((state)=> state.user.token);
    const video = useSelector((state)=> state.video.currentVideo);
    const [videoName, setVideoName] = useState('');
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
            setVideoName(videoData);
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
        <VideoFrame src={video.videoUrl} controls />
    </Container>
  )
}

export default Video