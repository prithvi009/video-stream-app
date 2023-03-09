import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import multer from 'multer';
import mongoose from 'mongoose';


const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('common'));


