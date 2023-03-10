import express from 'express';
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    text: { 
        type: String, 
        required: true 
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    
    },
    videoId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now 
    },
    replies: [
        {
          text: { type: String, required: true },
          createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
          createdAt: { type: Date, default: Date.now },
        }
    ]
},
{timestamps: true});
const Comment = mongoose.model('Comment',  commentSchema);

export default Comment;