import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({path: './.env'});

import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

const app = express();
// dotenv.config({path:'./.env'})
const CONNECTION_URL = process.env.REACT_APP_CONNECTION_URL       // process.env.REACT_APP_CONNECTION_URL
// console.log(process.env.REACT_APP_CONNECTION_URL)

app.use(bodyParser.json({limit:"30mb", extended: true} ));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true} ));
app.use(cors());

app.options('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Endpoint, Token');
    res.sendStatus(200);
});
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello to Memories API');
})

const PORT = process.env.PORT || 7000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log( `Server running on port: ${PORT}` )))
.catch((error) => console.log(error.message));

mongoose.set( 'useFindAndModify', false)
