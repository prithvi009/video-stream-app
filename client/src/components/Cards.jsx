import React from 'react'
import styled from 'styled-components'
import images from '../assets/images.jpeg';
import { Link } from 'react-router-dom';



const Container = styled.div`
    width: 300px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items; center;
    justify-content: center;
    padding: 10px;
    margin: 10px 10px;
`

const Img = styled.img`
    border: none;
    border-radius: 5px;
    aspect-ratio: 16 / 9;
    cursor: pointer;
`

const Contains = styled.div`
    width: 100%;
    display: flex;
    flex-direction : column;
    align-items: center;
    justify-content: start;
`

const H1 = styled.h3`
    font-size: 1.1rem;
    font-weight: 600;
    text-decoration-line: none;
`

const Section = styled.div`
    display: flex;
    align-items; center;
    justify-content: space-between;
    

`

const Comment = styled.p`
    width: 100%;
    margin: 5px 10px;
    color: gray;
    cursor: pointer;
    

`

const Like = styled.div`
    width: 100%;
    margin: 5px 10px;
    color: gray;
    cursor: pointer;

`


const Cards = ({video}) => {
  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: 'none' , color: 'black'} }>
        <Container> 
            <Img src={video.thumbnailUrl} alt="Video thumbnail" />
            <Contains>
                <H1>{video.title}</H1>
                <p>{video.description}</p>
                <Section>
                    <Like>10</Like>
                    <Comment>Comments</Comment>
                </Section>
            </Contains>

        </Container>
    </Link>
  )
}

export default Cards