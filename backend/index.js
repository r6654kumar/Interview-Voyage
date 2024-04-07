import express, { request, response } from "express";
import cors from 'cors';
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { UserModel } from './models/userInfoModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
dotenv.config();
const PORT = process.env.PORT
const MONGODBURL = process.env.MONGODBURL
const secret = process.env.secret
const app = express();
app.use(cors({credentials :true, origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
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
            throw err
        else
            response.json(info)
    })
})


//Logout Route
app.post('/logout', (request,response)=>{
    response.cookie('token','').send("ok");
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