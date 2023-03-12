import mongoose from "mongoose";


const videoIds = [
    new mongoose.Types.ObjectId(),
];

const userIds=[
    new mongoose.Types.ObjectId('6409d82dbca3610dc3de1684'),
]


export const video=[
    {
        _id: videoIds[0],
        title: "prithviraj",
        description: "alksdfkahdf",
        videoUrl: "./public/assets/prithvi.mp4",
        thumbnailUrl: "./public/thumbnail/p.jpg",
        createdBy:{
            _id: userIds[0],
            firstName: "prithviraj",
            lastName:"Awatade",
            email:"awatadeprithviraj@gmail.com",
            password:"$2b$10$VuwE7eAQnR2WYgr/j67ghe/nvlS51qEWtXhqQAB5ydkH7tEzpWIRe"
        }
    }
]