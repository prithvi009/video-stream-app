import express from 'express';
import Video from '../models/Video.js';

export const addVideo = async (req, res) => {
    try{
        const { title, description, videoUrl, thumbnailUrl } = req.body;
        console.log(req);
        const video = new Video({ title, description, videoUrl, thumbnailUrl, createdBy: req.user.id });
        await video.save();
        res.status(201).send();
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }

};

export const likeVideo = async(req, res)=>{
    try{
        const {id} = req.params;
        const {userId} = req.body;
        const video = await Video.findById(id);
        const isLiked = video.likes.get(userId);

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