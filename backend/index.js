import express, { request, response } from "express";
import cors from 'cors';
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { UserModel } from './models/userInfoModel.js'
import { PostModel } from './models/postModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
import multer from "multer";
import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();
const PORT = process.env.PORT
const MONGODBURL = process.env.MONGODBURL
const secret = process.env.secret
const app = express();
app.use(cors({credentials :true, origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(join(__dirname, 'uploads')));
//Register Route
app.post('/register', async (request, response) => {
    const { userName, password } = request.body;
    try {
        const userDoc = await UserModel.create({ userName, password: await bcrypt.hash(password, 10) })
        response.status(200).send(userDoc);
    } catch (e) {
        response.status(400).send(e);
    }
});

//Login Route
app.post('/login', async (request, response) => {
    const { userName, password } = request.body;
    const userDoc = await UserModel.findOne({ userName });
    if (userDoc) {
        const passwordMatch = await bcrypt.compare(password, userDoc.password);
        if (passwordMatch) {
            jwt.sign({ userName, id: userDoc._id }, secret, {}, (err, token) => {
                if (err)
                    throw err
                else
                    response.cookie('token', token).json({
                        id:userDoc._id,
                        userName,
                    });
            })
            // response.status(200).send("Success");
        } else {
            response.status(400).send("Invalid Credentials");
        }
    } else {
        response.status(400).send("Invalid Credentials");
    }
})

//Profile Route
app.get('/profile',(request,response)=>{
    const {token}=request.cookies;
    jwt.verify(token,secret,{},(err,info)=>{
        if(err)
            response.json(err);
        else
            response.json(info)
    })
})


//Logout Route
app.post('/logout', (request,response)=>{
    response.cookie('token','').send("ok");
})

//Upload Middleware

const uploadMiddleware=multer({dest:'uploads/'})

//Create Post route
app.post('/post',uploadMiddleware.single('file'),(request,response)=>{
    const {originalname,path}=request.file;
    const parts=originalname.split('.');
    const ext=parts[parts.length-1];
    const newPath=path+'.'+ext;
    fs.renameSync(path,newPath)
    // response.json({files:request.file});
    const {token}=request.cookies;
    jwt.verify(token,secret,{},async(err,info)=>{
        if(err) throw err
        const {title,summary,content}=request.body;
        const postDoc=await PostModel.create({
            title,
            summary,
            content,
            cover:newPath,
            author:info.id,
        });
        response.json(postDoc);
    });
})


//get post route

app.get('/post', async (request, response) => {
    response.json(
        await PostModel.find()
        .populate('author',['userName'])
        .sort({createdAt: -1})
        .limit(20)
    );
});


//MongoDB Connection
mongoose.connect(MONGODBURL).then(() => {
    console.log("Successfully connected to database");
    app.listen(PORT, () => {
        console.log(`App is listening to port ${PORT}`)
    })
}).catch((error) => {
    console.log(`Error:${error}`);
})