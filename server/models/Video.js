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
        type: Number,
        default: 0 
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
  comments: [
    {
      text: { type: String, required: true },
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      createdAt: { type: Date, default: Date.now },
      replies: [
        {
          text: { type: String, required: true },
          createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
          createdAt: { type: Date, default: Date.now },
        }
      ]
    }
  ]
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
