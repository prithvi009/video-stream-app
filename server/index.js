import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import multer from 'multer';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';




const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('common'));




app.use("/api/v1/auth", authRoutes);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log(error.message);
}
);


