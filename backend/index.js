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
// import fs from 'fs';
// import { dirname, join } from 'path';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
dotenv.config();
const PORT = process.env.PORT
const MONGODBURL = process.env.MONGODBURL
const secret = process.env.secret
const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
// app.use('/uploads', express.static(join(__dirname, 'uploads')));
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
                        id: userDoc._id,
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
app.get('/profile', (request, response) => {
    const { token } = request.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err)
            response.json(err);
        else
            response.json(info)
    })
})


//Logout Route
app.post('/logout', (request, response) => {
    response.cookie('token', '').send("ok");
})

//Upload Middleware

const uploadMiddleware = multer()

//Create Post route
app.post('/post', uploadMiddleware.single('file'), (request, response) => {
    const { originalname, buffer } = request.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    // const newPath = path + '.' + ext;
    // fs.renameSync(path, newPath)
    // response.json({files:request.file});
    const base64Image=buffer.toString('base64');
    const { token } = request.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err
        const { title, summary, content } = request.body;
        const postDoc = await PostModel.create({
            title,
            summary,
            content,
            cover: {
                data: base64Image, 
                contentType: `image/${ext}`
            },
            author: info.id,
        });
        response.json(postDoc);
    });
})


//get post route

app.get('/post', async (request, response) => {
    response.json(
        await PostModel.find()
            .populate('author', ['userName'])
            .sort({ createdAt: -1 })
            .limit(20)
    );
});


//postInfo / post content route
app.get('/post/:id', async (request, response) => {
    const { id } = request.params;
    // console.log(id);
    const postDoc = await PostModel.findById(id).populate('author', ['userName']);
    response.json(postDoc);
})

//Update post route

app.put('/post', uploadMiddleware.single('file'), async (request, response) => {
    let updatedCoverData={}
    if (request.file) {
        const { originalname, buffer } = request.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        // newPath = path + '.' + ext;
        // fs.renameSync(path, newPath)
        const base64Image=buffer.toString('base64');
        updatedCoverData={
            data: base64Image, 
            contentType: `image/${ext}`
        }
    }
    const { token } = request.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        const { id, title, summary, content } = request.body;
        if (err) throw err
        const postDoc = await PostModel.findById(id)
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if (isAuthor) {
            await PostModel.findByIdAndUpdate(id, {
                title,
                summary,
                content,
                cover: Object.keys(updatedCoverData).length ? updatedCoverData : postDoc.cover,
            });
        }
        else {
            return response.status(400).json('You are not the author!!')

        }
        response.json(postDoc);
    });
})


//MongoDB Connection
mongoose.connect(MONGODBURL).then(() => {
    console.log("Successfully connected to database");
    app.listen(PORT, () => {
        console.log(`App is listening to port ${PORT}`)
    })
}).catch((error) => {
    console.log(`Error:${error}`);
})