import mongoose from 'mongoose'
const { Schema } = mongoose;
const PostSchema=mongoose.Schema({
    title:String,
    summary:String,
    content:String,
    cover:{
        data: String,
        contentType: String,
    },
    author:{type:Schema.Types.ObjectId, ref:'User'},
    },
   {
    timestamps: true,
    }
);
export const PostModel=mongoose.model('Post',PostSchema);