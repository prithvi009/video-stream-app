import express from 'express';
import Video from '../models/Video.js';

export const addVideo = async (req, res) => {
    try{
        const { title, description, videoUrl, thumbnailUrl } = req.body;
        const video = new Video({ title, description, videoUrl, thumbnailUrl, createdBy: req.user.id , views: 0});
        await video.save();
        res.status(201).send();
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }

};

export const deleteVideo = async(req, res)=>{
    try{
        const video = await Video.findById(req.params.id);
        if(!video) return res.status(404);
        if(req.user.id === video.createdBy){
            await Video.findByIdAndDelete(req.params.id);
            res.status(200).json("video has been deleted");
        }
        else{
            return res.status(404);
        }

    }
    catch(err){
        res.status(500);
    }
}

export const getVideos = async(req, res)=>{
    try{
        const videos = await Video.find();
        res.status(200).json(videos);
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
}

export const getVideo = async(req, res)=>{
    try{
        const videoId = req.params.id;
        const video = await Video.findById(videoId);

        res.status(200).json(video);

    }
    catch(err){
        res.status(404).json(err.message);
    }
}

export const likeVideo = async(req, res)=>{
    try{

        const videoId = req.body;
        const video = await Video.findById(videoId);
        const isLiked = video.likes.get(req.user.id);

        if(isLiked){
            video.likes.delete(userId);
        }
        else{
            video.likes.set(userId, true);
        }

        const updateVideo = await Video.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true}
        );
        res.status(200).json(updateVideo);

    }
    catch(error){
        res.status(500).json({message : error.message});
    }
}