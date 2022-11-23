import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import usersRoutes from './routes/users.js';
import dotenv from 'dotenv'

var app = express();
dotenv.config();

app.use(bodyParser.json({ limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit:"30mb", extended: true}));
app.use(cors());

// every post route will start with /posts
app.use('/posts', postRoutes)
app.use('/user', usersRoutes)

//const URI = process.env.ATLAS_URI;
const PORT = process.env.PORT || 5000;

// add extra parameters to avoid errors in terminal
mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));
