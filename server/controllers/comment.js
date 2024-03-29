import Video from '../models/Video.js';
import Comment from '../models/Comment.js';


export const addComment = async(req, res)=>{

    try{
        console.log(req);
        const video = await Video.findById(req.body.videoId);
        if(!video) return res.status(404).json("video not found");

        
        const comment = new Comment({
            text: req.body.text,
            videoId: req.body.videoId,
            createdBy: req.user.id,
            replies: req.body.replies
        });
        await comment.save();
        res.status(200).json("comment added");
        
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
        
}



export const deleteComment = async(req, res)=>{

    try{
        const comment = await Comment.findById(req.body.commentId);
        if(!comment) return res.status(404).json("comment not found");

        if(req.user.id === comment.createdBy ){
            await Comment.findByIdAndDelete(req.body.commentId);
            res.status(200).json("comment deleted");
        }

    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}


export const getComments = async(req, res)=>{

    try{
        const comments = await Comment.find({videId: req.params.commentId});
        if(!comments) return res.status(404).json("comment not found");

        if(req.user.id === comment.createdBy ){
            await Comment.findByIdAndDelete(req.body.commentId);
            res.status(200).json("comment deleted");
        }
        res.status(200).json(comments);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}