import mongoose from 'mongoose'
const UserSchema=mongoose.Schema({
        userName: {
        type: String,
        required: true,
        min:4,
        unique:true
      },
      password: {
        type: String,
        required: true, 
      },
    });
export const UserModel=mongoose.model('User',UserSchema);