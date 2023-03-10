import express from 'express'
import Comment from '../models/Comment.js';
import User from '../models/User.js';
import Video from '../models/Video.js';

export const addComment = async(req, res)=>{

    try{

        const {text, post_id, replies } = req.body;
        const {user_id } = req.user.id;
        
        const video = await Video.findById(post_id);
        const user = await User.findById(user_id);
        
        const comment = new Comment({
            text: text,
            videoId: video,
            createdBy: user,
            replies: replies
        });
        comment.save((err, comment)=>{
            if(err){
                return res.status(404).json({success: false, err});
            }
            Comment.find({_id: comment._id}).populate('createdBy').exec((exe, comments)=>{
                if (err) {
                    return res.json({success: false, err});
                }
                return res.json({success: true, result})
            })
        })
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
        
}