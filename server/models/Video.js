import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    title: { 
        type: String,
         required: true 
    },
    description: { 
        type: String,
         required: true 
    },
    videoUrl: { 
        type: String,
         required: true 
    },
    thumbnailUrl: { 
        type: String,
         required: true 
    },
    views: { 
        type: Number,
        default: 0 
    },
    likes: { 
      type: Map,
      of: Boolean,
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

const Video = mongoose.model('Video', videoSchema);

export default Video;
