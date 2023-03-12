import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import styled from "styled-components";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import app from '../../firebase';
import { useSelector } from 'react-redux';
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const Label = styled.label`
  font-size: 14px;
`;

const Upload = () => {
    const [img, setImg] = useState(undefined);
    const [video, setVideo] = useState(undefined);
    const [imgPerc, setImgPerc] = useState(0);
    const [videoPerc, setVideoPerc] = useState(0);
    const [inputs, setInputs] = useState({});
    const token = useSelector((state)=> state.authReducer.token);
    const [initial, setInitial] = useState({
        title: "",
        desc: "",
        videoUrl: "",
        thumbnailUrl: "",
    });

    const uploadFile = (file, urlType)=>{
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
                default:
                  break;
              }
            },
            (error) => {},
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  setInputs((prev) => {
                    return { ...prev, [urlType]: downloadURL };
                  });
                });

            }
        );
    }
    useEffect(()=>{video && uploadFile(video, "video")}, [video]);
    useEffect(()=>{img && uploadFile(img , "img")}, [img]);


    const onSubmit = async(e) => {
        e.preventDefault();
        setInitial({...initial, ...inputs});
        
        ;
        const res = await fetch("http://localhost:5001/api/v1/video/", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          contebtType: "application/json",
          body: JSON.stringify(initial),
        });
        console.log(token);
        const data = await res.json();
        console.log(data);
      }


  return (
    <>
        <Container>
      <Wrapper>
        <Close >X</Close>
        <Title>Upload a New Video</Title>
        <Label>Video:</Label>
        {videoPerc > 0 ? (
          "Uploading:" + videoPerc
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
          )}

        <Input
          type="text"
          placeholder="Title"
          name="title"
          value={initial.title}
          onChange={(e)=>setInitial({...initial, title: e.target.value})}
        />
        <Desc
          placeholder="Description"
          name="desc"
          rows={8}
          value={initial.desc}
          onChange={(e)=>setInitial({...initial, desc: e.target.value})}
        />
        
        <Label>Image:</Label>
        {imgPerc > 0 ? (
          "Uploading:" + imgPerc + "%"
        ) : (
        
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />

        )}
        
        <Button onClick={onSubmit}>Upload</Button>
      </Wrapper>
    </Container>
    </>
  )
}

export default Upload;